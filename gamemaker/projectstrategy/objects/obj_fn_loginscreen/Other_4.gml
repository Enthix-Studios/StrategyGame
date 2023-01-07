network_connect_raw_async(global.socket , global.serverSocketDebug, 30000);

//TODO: Check if token exist in local storage
fn_websocket_send("login_token_request","");