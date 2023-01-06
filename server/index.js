const imports = require("./imports");



imports.wss.on("connection", ws => {



    ws.on("message", data => {
        console.log(`Client has sent us: ${data}`);
    })

    ws.on("close", () => { })


    ws.onerror = function () {
        console.log("Some Error occurred");
    }
});
console.log("The WebSocket server is running");
