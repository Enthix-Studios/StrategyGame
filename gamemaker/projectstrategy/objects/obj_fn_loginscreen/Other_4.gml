
network_connect_raw(global.socket , global.serverSocket, 30001);

//TODO: Check if token exist in local storage
fn_websocket_send("LOGIN_TOKEN_REQUEST","");