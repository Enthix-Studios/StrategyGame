// Set environment variables
import dotenv from "dotenv";
dotenv.config();

// Validate
const token = process.env.TOKEN;
if (!token) throw new Error("No token");

import { Client, GatewayIntentBits as Intents } from "discord.js";

// Create client
const client = new Client({ intents: [Intents.Guilds] });

import { registerEvents, getCommands, registerCommands } from "./register";

registerEvents(client);
getCommands().then(commands => registerCommands(client, commands));

client.login(token);
