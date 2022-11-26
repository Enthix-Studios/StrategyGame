const imports = require('../../imports');
const game = require('../../gamefunctions/game');
const Canvas = require("canvas");
const Discord = require('discord.js');
const axios = require("axios");

module.exports = {

	run: function(interaction) {
		if (interaction.customId === 'next') {
			
			//Todo: Update state of the game
		
			

			game.run(interaction);
			

		} else if (interaction.customId === 'my_name_is') {
		
			const modal = new Discord.ModalBuilder()
			.setCustomId('modal_whats_your_name')
			.setTitle('Whats your name?');
			
			
			const input_name = new Discord.TextInputBuilder()
			.setCustomId('input_name')
			.setLabel("Please tell me your name")
			.setStyle(Discord.TextInputStyle.Short)
			.setRequired(true);
		
			const row = new Discord.ActionRowBuilder().addComponents(input_name);
			
			modal.addComponents(row);
			interaction.showModal(modal);
		}
	},
	ModuleType: "clickbutton"
	
}
