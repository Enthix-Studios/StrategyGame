//Require important scripts
const imports = require('../../imports');
const game = require('../../gamefunctions/game');
const vars = require('../../globalvars');

//Getting the default chat platform library(can be something else than Discord)
const Discord = imports.Discord;

module.exports = {

	//Running the start command.
	run: async function(interaction) {
	
		//todo: check if game already running.
		//todo: check if user data already exist, if exist fill in values in array.
		console.log(typeof(vars.player[interaction.user.id]));
		if(typeof vars.player[interaction.user.id] === "undefined"){
			vars.player[interaction.user.id] = new Object();
			vars.player[interaction.user.id].username = "ghost";
			vars.player[interaction.user.id].interaction = 0;
			
			vars.player[interaction.user.id].render = new Object();
			vars.player[interaction.user.id].render.canvas = null;
			vars.player[interaction.user.id].render.ctx = null;
			vars.player[interaction.user.id].render.encoder = null;
			vars.player[interaction.user.id].render.stream = null;
			vars.player[interaction.user.id].render.interactionDone = false;
			vars.player[interaction.user.id].render.frame = -1; 
			vars.player[interaction.user.id].gamedata = null;
			vars.player[interaction.user.id].render.working = false;
			vars.player[interaction.user.id].websocket = null;
			
		} else {
			await interaction.reply("There is already a game session started.");
			return
		}
		
		//Starting gameplay
		game.run(interaction);

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



