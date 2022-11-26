module.exports = {
	textFormatting: function(str, data){
		str.replaceAll('{VAL_USERNAME}', data.username);
		str.replaceAll('{VAL_GLOBAL_LEVEL}', data.global_level);
		
		return str;
	
	}
}
