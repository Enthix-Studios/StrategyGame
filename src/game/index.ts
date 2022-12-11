import { Player } from "./player";

import { ActionRowBuilder, AttachmentBuilder, ButtonBuilder, ButtonInteraction, ButtonStyle, CommandInteraction, EmbedBuilder } from "discord.js";

import { Canvas, FontLibrary } from "skia-canvas";
// @ts-ignore
import GIFEncoder from "gif-encoder-2";

import { resolve } from "node:path";
import { readdirSync } from "node:fs";

const fontsPath = resolve(__dirname, "..", "..", "assets", "fonts");
const fonts = readdirSync(fontsPath).map(path => resolve(fontsPath, path));

export class Game {
	player?: Player;

	canvas = new Canvas(400, 225);
	ctx = this.canvas.getContext("2d");

	encoder = new GIFEncoder(
		this.canvas.width,
		this.canvas.height,
		"neuquant",
		true,
	);

	async start(interaction: CommandInteraction) {
		this.player = new Player(interaction.user);

		await interaction.reply("Loading game...");
		// await interaction.deferReply();

		FontLibrary.use(fonts);

		const stream = this.encoder.createReadStream();

		this.encoder.start();
		this.encoder.setRepeat(-1);
		this.encoder.setDelay(41);
		this.encoder.setQuality(10);

		const start = performance.now();

		this.ctx.font = "13px Electrolize";
		this.ctx.textAlign = "center";
		this.ctx.fillStyle = "#111";

		let done = false;
		let i = 16;

		while (!done) {
			this.ctx.fillStyle = "#" + i.toString(16).repeat(3);
			this.ctx.fillRect(
				0,
				0,
				this.canvas.width,
				this.canvas.height,
			);

			this.encoder.addFrame(this.ctx);

			done = i-- == 0;
		}

		this.encoder.finish();

		const end = performance.now();
		const time = end - start;

		const embed = new EmbedBuilder()
			.setImage("attachment://game.gif");

		const buttons = new ActionRowBuilder<ButtonBuilder>();

		buttons.addComponents(
			new ButtonBuilder()
				.setCustomId("next")
				.setStyle(ButtonStyle.Secondary)
		);

		const attachment = new AttachmentBuilder(
			stream,
			{ name: "game.gif" },
		);

		interaction.editReply({
			content: "",
			embeds: [embed],
			files: [attachment],
		})

		interaction.channel?.send(`Time: ${time}`);

		return this;
	}

	next(interaction: ButtonInteraction) {
		interaction.reply("Next!");
	}
}
