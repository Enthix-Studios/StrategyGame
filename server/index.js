const imports = require("./imports");
const mysql = require('mysql-await');
const crypto = require('crypto');

// Mysql connect to server
var con = mysql.createConnection({
	host: "localhost",
	user: "production",
	password: "",
	database: "strategy"
});



// websocket connection event
imports.wss.on("connection", ws => {

	console.log("client connected");


	ws.on("message", data => {
		
		//ws.send("{ \"event\": \"test\", \"data\": \"test\" }");
		
		try {
			var json = JSON.parse(data);
			if(json.hasOwnProperty('event') && json.hasOwnProperty('data')){
				event_handler(ws, json["event"], json["data"]);
			} else {
				console.log("ERROR: Json data is not formatted correctly");
			}
			
		} catch (e) {
			console.log("ERROR: Json data is not valid");
			return;
		}
	})

	ws.on("close", () => { })


	ws.onerror = function () {
		console.log("Some Error occurred");
	}
});


async function event_handler(ws, event, data){
	console.log("event: " + event);
	console.log("data: " + data);
	switch(event){
		case "LOGIN_TOKEN_REQUEST": {
			var token = await logintoken_generate();
			send(ws, "LOGIN_TOKEN_REFRESH", token);
		
		}
	
	}
}



async function logintoken_generate(){
	var found = false;
	var sql, token;
	
	token = "aaa"
	while(!found){
		var token_gen = await logintoken_generate_check(token)
		if(token_gen) found = true;
		
		token = crypto.randomBytes(16).toString('hex');
	}
	var sql = await con.awaitQuery("INSERT INTO user_token (token) VALUES (?)", [token]);
	console.log(sql);
	console.log("done");
	return token;
	
}


async function logintoken_generate_check(token){

	console.log("check token: " + token);

	var sql = await con.awaitQuery("SELECT * FROM user_token WHERE token=? LIMIT 1", [token]);

	console.log(sql);
	console.log(sql.length);
	if(sql.length == 0) {
		console.log("TOKEN GENERATED");
		return true;
		
	} else {
		console.log("DUPE TOKEN, REFRESH");
		return false;
		
	}
}


function send(ws, event, data){
	var message = "{\"event\": \"" + event + "\", \"data\": \"" + data + "\"}"
	ws.send(message);
	console.log(message);

}

console.log("The WebSocket server is running");


