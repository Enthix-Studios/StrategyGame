var buffer_raw = async_load[? "buffer"];
if(buffer_raw != undefined){
	var buffer_processed = buffer_read(buffer_raw , buffer_text);
	var realData = json_decode(buffer_processed);
	var event = realData[?"event"];
	var data = realData[?"data"];
	show_debug_message(event);
	show_debug_message(data);
	
	
	
	switch(event){
			case "LOGIN_TOKEN_REFRESH": {
				global.login_token = data;	
				show_debug_message("put token global");
				break;
			}
			case "AUTH": {
					global.username = "NULL";
					
					
			}
		
	}
}