import {
	ActionRowBuilder,
	ButtonBuilder,
	ButtonStyle,
	CommandInteraction,
	SlashCommandBuilder,
} from "discord.js";

import { players } from "../game/players";
import { Game } from "../game";

export const data = new SlashCommandBuilder()
	.setName("play")
	.setDescription("Play the game");

export async function execute(interaction: CommandInteraction) {
	players.push(await new Game().start(interaction));
}
