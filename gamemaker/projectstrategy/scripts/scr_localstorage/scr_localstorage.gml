
function fn_localstorage_save(){
	var file = file_text_open_write(working_directory + "localstorage");
	var data;
	
	// TODO: get data to save
	
	file_text_write_string(file, data);
	file_text_close(file);
}
function fn_localstorage_open(){
	var file = file_text_open_read(working_directory + "localstorage");
	var data = file_text_read_string(file);
	
	// TODO: Write output into memory.
	
	file_text_close(file);
}