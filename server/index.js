const imports = require("./imports");
const mysql = require('mysql-await');
const crypto = require('crypto');
const http = require("http");

//Webserver
const server = http.createServer(requestListener);


// Mysql connect to server
var con = mysql.createConnection({
	host: "localhost",
	user: "production",
	password: "",
	database: "strategy"
});

var open_connections = new Map();


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


server.listen(25555, "localhost", () => {
	console.log("Server is running");
});

function requestListener (req, res) {
	res.writeHead(200);
	
	let url = req.url
    	let method = req.method
    	var ws =  open_connections.get(url.replace("/", ""));
    	
    	
    	if(typeof ws === "undefined"){
    		res.end("TOKEN NOT FOUND");
    	
    	} else {
    		console.log(ws);
    		send(ws, "AUTH", "OK");
    	}
    	
    	
};



async function event_handler(ws, event, data){
	console.log("event: " + event);
	console.log("data: " + data);
	switch(event){
		case "LOGIN_TOKEN_REQUEST": {
			var token = await logintoken_generate();
			send(ws, "LOGIN_TOKEN_REFRESH", token);
			open_connections.set(token, ws);
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
setInterval(() => {
	open_connections.forEach(log_openconnections);
	console.log("Log open connections");
	

}, 5000);

function log_openconnections(value, key, map) {
	console.log(`map.get('${key}') = ${value}`);
	send(value, "test", "123")
}


console.log("The WebSocket server is running");


