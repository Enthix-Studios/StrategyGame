//Require important scripts
const imports = require('../../imports');

//Getting the default chat platform library(can be something else than Discord)
const Discord = imports.Discord;

module.exports = {

	//Running the start command.
	run: async function(interaction) {
		var creditsEmbed = new Discord.EmbedBuilder();
		
		creditsEmbed.setTitle('Credits')
		creditsEmbed.setDescription('Thank you all for making this game possible.')
		creditsEmbed.addFields(
		{ name: 'Story writing', value: 'niel#4105' },
		{ name: 'Development', value: 'randamu#0001\nRemliv#0677' },
		{ name: 'Director', value: 'randamu#0001' });
		
		await interaction.reply({ embeds: [creditsEmbed] });
	
	},
	ModuleType: "command",
	Permissions: 0, //deprecated function
	CommandToggleWhitelist: false, //deprecated function
	CommandWhitelist: [], //deprecated function
	CommandRunGuild: true,
	CommandRunDM: true,
	CommandName: ["credits"],
	CommandDescription: "list all the people who worked on this game."
}
