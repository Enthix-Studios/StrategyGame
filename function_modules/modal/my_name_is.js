const imports = require('../../imports');
var glofunc = require('../../globalfunctions');
const vars = require('../../globalvars');
const Canvas = require("canvas");
const Discord = require('discord.js');
const axios = require("axios");

module.exports = {

	run: function(interaction) {
		if (interaction.customId === 'modal_whats_your_name') {
			
			const name = interaction.fields.getTextInputValue('input_name');
			vars.player[interaction.user.id].username = name;
			
			//Starting gameplay
			glofunc.gameInteraction(interaction);
		}
	},
	ModuleType: "submitmodal"
	
}
