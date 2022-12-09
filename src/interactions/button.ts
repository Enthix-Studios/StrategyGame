import { ButtonInteraction, Interaction } from "discord.js";

export const id = "next";

export function shouldRun(interaction: Interaction) {
	return interaction.isButton();
}

export function execute(interaction: ButtonInteraction) {
	interaction.reply("Next!");
}
