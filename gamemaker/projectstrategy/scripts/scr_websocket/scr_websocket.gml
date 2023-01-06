// Config
//network_set_config(network_config_use_non_blocking_socket, 1);
network_set_config(network_config_connect_timeout, 5000);

//socket
global.socket = network_create_socket(network_socket_ws);


// Send data to socket.
function fn_websocket_send(value){
	var buffer_size = buffer_get_size(value);
	var buff = buffer_create(buffer_size, buffer_fixed, 0)
	buffer_write(buff, buffer_text, value)
	network_send_raw(global.socket, buff, buffer_tell(buff))

	
}