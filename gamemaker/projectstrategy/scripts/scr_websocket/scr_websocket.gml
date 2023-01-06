// Config
//network_set_config(network_config_use_non_blocking_socket, 1);
network_set_config(network_config_connect_timeout, 50000);

//socket
global.socket = network_create_socket(network_socket_ws);


// Send data to socket.
function fn_websocket_send(event, value){
	var Buffer = buffer_create(1, buffer_grow ,1);
	var data = ds_map_create();
	data[? "event"] = event;
	data[? "data"] = value;
	
	buffer_write(Buffer , buffer_text  , json_encode(data));
	network_send_raw(global.socket , Buffer , buffer_tell(Buffer));
	ds_map_destroy(data);
	
}