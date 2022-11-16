//Require important scripts
const imports = require('../../imports');
var glofunc = require('../../globalfunctions');

//Getting the default chat platform library(can be something else than Discord)
const Discord = imports.Discord;

module.exports = {

	//Running the start command.
	run: function(interaction) {
	
		//todo: check if game already running.
		//todo: check if user data already exist, if exist fill in values in array.
		
		
		//Starting gameplay
		glofunc.gameInteraction(interaction);

	},
	ModuleType: "command",
	Permissions: 0, //deprecated function
	CommandToggleWhitelist: false, //deprecated function
	CommandWhitelist: [], //deprecated function
	CommandRunGuild: true,
	CommandRunDM: true,
	CommandName: ["start"],
	CommandDescription: "Start a game session."


};



