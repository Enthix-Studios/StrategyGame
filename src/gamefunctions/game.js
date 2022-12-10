// Game function imports.
const renderTextBalloon = require("./rendering/renderTextBalloon");
const renderBackground = require("./rendering/renderBackground");

// Generic variable imports
const vars = require("../globalvars");
const imports = require("../imports");

// Importing library's
const { Canvas, FontLibrary, loadImage } = require("skia-canvas");
const GIFEncoder = require("gif-encoder-2");

// Abstract Discord variable
const Discord = imports.Discord;

module.exports = {
	run: async function (interaction) {
		console.log(vars.player[interaction.user.id].render.working);

		// Check if interaction needs to send an deferUpdate.
		if (interaction.isCommand()) {
			await interaction.reply({
				content:
					"<a:Loading:1046076563407519784> **Loading game, Please wait...**",
			});

			const message = await interaction.fetchReply();
			vars.player[interaction.user.id].message = message;
		} else if (interaction.isButton() || interaction.isModalSubmit()) {
			console.log("deferUpdate");
			//interaction.deferUpdate();
		}

		if (vars.player[interaction.user.id].render.working) return;
		vars.player[interaction.user.id].render.working = true;

		// Making message objects for embeds and button row
		var playEmbed = new Discord.EmbedBuilder();
		var playEmbedRow = new Discord.ActionRowBuilder();

		// Marking game state array location
		var p_root = vars.player[interaction.user.id];
		var p_render = p_root.render;

		// Setting up the canvas
		p_render.canvas = new Canvas(400, 225);
		p_render.ctx = p_render.canvas.getContext("2d");

		// Setting up the gif encoder
		p_render.encoder = new GIFEncoder(
			p_render.canvas.width,
			p_render.canvas.height,
			"octree",
		);
		p_render.stream = p_render.encoder.createReadStream();

		// Configure gif encoding
		p_render.encoder.start();
		p_render.encoder.setRepeat(-1); //no repeat
		p_render.encoder.setDelay(41); // 24 fps
		p_render.encoder.setQuality(10);

		// Import all the fonts used by the game.
		FontLibrary.use(["./assets/fonts/electrolize.ttf"]);

		// Getting the required game data json file
		let gamedata = require("../gamedata/game.json");
		p_root.gamedata = gamedata;

		// Set some font settings
		p_render.ctx.font = "13px Electrolize";
		p_render.ctx.textAlign = "center";
		p_render.ctx.fillStyle = "#111";

		// Game run loop
		// -------------
		// Every function will try to cancel out the interactionDone variable.
		// When that is done the gif has finished rendering.
		// -------------
		const t0 = performance.now();
		while (!p_render.interactionDone) {
			p_render.interactionDone = false;
			p_render.frame++;

			// Start with empty canvas.
			p_render.ctx.fillStyle = "#ffffff";
			p_render.ctx.fillRect(
				0,
				0,
				p_render.canvas.width,
				p_render.canvas.height,
			);

			await renderBackground.render(interaction);
			await renderTextBalloon.renderTextBalloon(interaction);

			// Anti infinite loop
			if (p_render.frame == 128) {
				p_render.interactionDone = true;
				if (p_root.message)
					p_root.message.channel.send(
						"Warning: Infinite loop protection trigger, please check your code.",
					);
				console.log(
					"Warning: Infinite loop protection trigger, please check your code.",
				);
				return;
			}

			p_render.encoder.addFrame(p_render.ctx);
		}

		// Reset game loop variables
		p_render.interactionDone = false;
		p_render.frame = -1;

		// Tell the gif encoder that all the frames has been rendered.
		p_render.encoder.finish();

		// Increese interaction ID
		vars.player[interaction.user.id].interaction++;

		const t1 = performance.now();
		p_root.message.channel.send("Performance: " + (t1 - t0));

		// Make attachment for embed.
		const attachment = new Discord.AttachmentBuilder(
			vars.player[interaction.user.id].render.stream,
			{ name: "game.gif" },
		);
		playEmbed.setImage("attachment://game.gif");
		playEmbed.setColor("#ffffff");

		//for(var i = 0; i <= gamedata.gameplay[item].interactbutton.length; i++){
		//TODO: Make the buttons

		//	}

		// TODO: Implement and change to the for loop above.
		if (vars.player[interaction.user.id].interaction == 3) {
			playEmbedRow.addComponents(
				new Discord.ButtonBuilder()
					.setCustomId("my_name_is")
					.setLabel("My name is...")
					.setStyle(Discord.ButtonStyle.Secondary)
					.setEmoji("🖊️"),
			);
		} else {
			playEmbedRow.addComponents(
				new Discord.ButtonBuilder()
					.setCustomId("next")
					.setLabel("Next")
					.setStyle(Discord.ButtonStyle.Secondary)
					.setEmoji("1042544660968636467"),
			);
		}

		if (interaction.isModalSubmit()) {
			await vars.player[interaction.user.id].message.edit({
				content: "",
				embeds: [playEmbed],
				components: [playEmbedRow],
				files: [attachment],
			});
		} else if (interaction.isCommand()) {
			await interaction.editReply({
				content: "",
				embeds: [playEmbed],
				components: [playEmbedRow],
				files: [attachment],
			});
		} else {
			await interaction.update({
				content: "",
				embeds: [playEmbed],
				components: [playEmbedRow],
				files: [attachment],
			});
		}
		vars.player[interaction.user.id].render.working = false;

		console.log(vars.player[interaction.user.id].websocket);
		if (vars.player[interaction.user.id].websocket !== null)
			vars.player[interaction.user.id].websocket.send("1");
	},
};
