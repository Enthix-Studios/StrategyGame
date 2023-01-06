/// @description Insert description here
// You can write your code in this editor

var buffer_raw = async_load[? "buffer"];
if(buffer_raw != undefined){
	var buffer_processed = buffer_read(buffer_raw , buffer_text);
	var realData = json_decode(buffer_processed);
	var event = realData[?"event"];
	var data = realData[?"data"];
	show_debug_message(event);
	show_debug_message(data);
}