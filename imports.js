const Discord = require('discord.js')
const ws = require("ws");

module.exports = {
	Discord: Discord,
	bot: new Discord.Client({ intents: 3243773 }),
	wss: new ws.Server({ port: 30000 }),
	ModuleImports: new Map(),
	ModuleType: new Map(),
}

