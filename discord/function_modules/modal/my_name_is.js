const imports = require("../../imports");
const game = require("../../gamefunctions/game");
const vars = require("../../globalvars");
const Canvas = require("canvas");
const Discord = require("discord.js");
const axios = require("axios");

module.exports = {
	run: function (interaction) {
		if (interaction.customId === "modal_whats_your_name") {
			const name = interaction.fields.getTextInputValue("input_name");
			vars.player[interaction.user.id].username = name;

			//Starting gameplay
			game.run(interaction);
		}
	},
	ModuleType: "submitmodal",
};
