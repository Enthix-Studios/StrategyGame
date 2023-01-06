// Script assets have changed for v2.3.0 see
// https://help.yoyogames.com/hc/en-us/articles/360005277377 for more information


var socket = network_create_socket(network_socket_ws);
network_connect_raw(socket , "enthix.net", 30001);

var buff = buffer_create(11, buffer_fixed, 1)
buffer_write(buff, buffer_text, "Hello world")
network_send_raw(socket, buff, buffer_tell(buff))


function scr_websocket(){

}