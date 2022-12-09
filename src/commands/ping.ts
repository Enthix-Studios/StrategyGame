import { CommandInteraction, SlashCommandBuilder } from "discord.js";

export const data = new SlashCommandBuilder()
	.setName("ping")
	.setDescription("test");

export async function execute(interaction: CommandInteraction) {
	interaction.reply("Pong!");
}
