import {
	Client,
	CommandInteraction,
	SlashCommandBuilder,
	Routes,
} from "discord.js";

import { resolve } from "node:path";
import { readdir } from "node:fs/promises";

import { once } from "node:events";

const eventsPath = resolve(__dirname, "events");
const commandsPath = resolve(__dirname, "commands");

export async function registerEvents(client: Client) {
	const entries = await readdir(eventsPath);

	// `import()` each file. Will be converted to `require()`.
	for (const entry of entries) {
		const {
			event,
			once = false,
			callback,
		} = await import(resolve(eventsPath, entry));

		client[once ? "once" : "on"](event, callback);
	}
}

interface command {
	data: SlashCommandBuilder;
	execute: (
		interaction: CommandInteraction,
	) => Promise<any | void> | any | void;
}

export async function getCommands(): Promise<command[]> {
	const entries = await readdir(commandsPath);
	let commands = [];

	// `import()` each file. Will be converted to `require()`.
	for (const entry of entries) {
		const { data, execute } = await import(resolve(commandsPath, entry));
		commands.push({ data, execute });
	}

	return commands;
}

export async function registerCommands(client: Client, commands: command[]) {
	// We can't get the bot id when it's not ready.
	if (!client.isReady()) await once(client, "ready");

	// Only send the important parts.
	await client.rest.put(Routes.applicationCommands(client.user.id), {
		body: commands.map(command => command.data.toJSON()),
	});

	console.log("Registered commands!");

	// Command handler
	client.on("interactionCreate", async interaction => {
		if (!interaction.isChatInputCommand()) return;

		const command = commands.find(
			command => command.data.name == interaction.commandName,
		);

		if (!command) return;

		try {
			await command.execute(interaction);
		} catch (error) {
			console.error(error);
		}
	});

	console.log("Attached listeners!");
}
