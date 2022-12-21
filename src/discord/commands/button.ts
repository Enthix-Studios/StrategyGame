import {
	ActionRowBuilder,
	ButtonBuilder,
	ButtonStyle,
	CommandInteraction,
	SlashCommandBuilder,
} from "discord.js";

export const data = new SlashCommandBuilder()
	.setName("button")
	.setDescription("test");

export async function execute(interaction: CommandInteraction) {
	const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
		new ButtonBuilder()
			.setCustomId("next")
			.setLabel("Next")
			.setStyle(ButtonStyle.Secondary),
	);

	await interaction.reply({
		content: "yep",
		components: [row],
	});
}
