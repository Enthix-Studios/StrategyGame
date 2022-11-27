const imports = require('../imports');

imports.wss.on("connection", ws => {
	//console.log(ws);
	
	ws.on("message", data => {
		console.log(`Client has sent us: ${data}`);
		if(data == "hearthbeat") ws.send("hearthbeat");
		
	});
});
