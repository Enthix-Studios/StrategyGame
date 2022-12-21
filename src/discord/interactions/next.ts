import { ButtonInteraction, Interaction } from "discord.js";
import { players } from "../game/players";

export const id = "next";

export function shouldRun(interaction: Interaction) {
	return interaction.isButton();
}

export function execute(interaction: ButtonInteraction) {
	players
		.find(game => game.player?.user.id == interaction.user.id)
		?.next(interaction);
}
