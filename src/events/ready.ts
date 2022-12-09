import { Client } from "discord.js";

export const event = "ready";

export function callback(client: Client<true>) {
	console.log(`Ready as ${client.user.tag}`);
}
