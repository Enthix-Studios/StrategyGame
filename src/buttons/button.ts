import { ButtonInteraction } from "discord.js";

export const id = "next";

export function execute(interaction: ButtonInteraction) {
	interaction.reply("Next!");
}
