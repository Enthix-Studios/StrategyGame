const imports = require("./imports");
const mysql = require('mysql');
const crypto = require('crypto');

// Mysql connect to server
var con = mysql.createConnection({
	host: "localhost",
	user: "production",
	password: ""
});

// Mysql check connection
con.connect(function(err) {
	if (err) throw err;
	console.log("Connected!");
});



// websocket connection event
imports.wss.on("connection", ws => {
	console.log("client connected");


    ws.on("message", data => {
        console.log(`Client has sent us: ${data}`);
        ws.send("{ \"event\": \"test\", \"data\": \"test\" }");
    })

    ws.on("close", () => { })


    ws.onerror = function () {
        console.log("Some Error occurred");
    }
});
console.log("The WebSocket server is running");



function logintoken_generate(){
	var found = false;
	var sql, token;
	
	
	while(!found){
		token = crypto.randomBytes(16).toString('hex');
		if(logintoken_generate_check(token)) found = true;
	}
	sql = "INSERT INTO user_tokens ('token') VALUES (?)";
	sql = mysql.format(sql, [token]);
	con.query(sql, function (err, rows, fields) {
		if (err) throw err;
	});
	
}


function logintoken_generate_check(token){
	var sql;
	sql = "SELECT * FROM user_tokens WHERE token = '?' LIMIT 1";
	sql = mysql.format(sql, [token]);
	con.query(sql, function (err, rows, fields) {
		if (err) throw err;
		if(rows.length == 0) {
			return true;
		} else {
			return false;
		}
	});
}
