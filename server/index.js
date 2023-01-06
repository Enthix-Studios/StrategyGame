const imports = require("./imports");



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
