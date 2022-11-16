const Discord = require('discord.js')

module.exports = {
	Discord: Discord,
	bot: new Discord.Client({ intents: 3243773 }),
	ModuleImports: new Map(),
	ModuleType: new Map(),
}

