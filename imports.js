const { Client, GatewayIntentBits } = require("discord.js");
const Discord = require('discord.js')


//The bot login
module.exports = {
	Discord: Discord,
	bot: new Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'],  intents: 3243773 }),
	ModuleImports: new Map(),
	ModuleType: new Map(),
}


/*    THIS IS HOW ITS GONNA WORK LATER, MOVE OVER TO GLOBAL VARS
const Discord = require('discord.js')

module.exports = {
	Discord: require('discord.js'),
	bot: new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] }),
	ModuleImports: new Map(),
	ModuleType: new Map()
}*/
