// Set environment variables
import dotenv from "dotenv";
dotenv.config();

const token = process.env.TOKEN;
if (!token) throw new Error("No token");

import { Client, GatewayIntentBits as Intents } from "discord.js";

const client = new Client({ intents: [Intents.Guilds] });

import {
	registerEvents,
	getCommands,
	registerCommands,
	registerButtons,
} from "./register";

registerEvents(client);
getCommands().then(commands => {
	registerCommands(client, commands);
	registerButtons(client);
});

client.login(token);
