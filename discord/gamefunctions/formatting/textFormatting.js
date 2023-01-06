const vars = require("../../globalvars");

module.exports = {
	textFormatting: function (str, player) {
		str = str.replaceAll("{VAL_USERNAME}", player.username);
		//str = str.replaceAll('{VAL_GLOBAL_LEVEL}', p_root.global_level);

		return str;
	},
};
