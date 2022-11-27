const imports = require('../imports');
const vars = require('../globalvars');

imports.wss.on("connection", ws => {
	//console.log(ws);
	//ws.send("1");
	
	vars.player["843501785603506246"].websocket = ws;
	
	ws.on("message", data => {
		console.log(`Client has sent us: ${data}`);
		if(data == "hearthbeat") {
			ws.send("hearthbeat");
			
		}
		
	});
});
