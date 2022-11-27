//funcion and value imports
const glofunc = require('./globalfunctions');
const imports = require('./imports');

const Discord = imports.Discord

// Discord API spesific stuff
const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

// Require other important librarys
const fs = require("fs");
const path = require("path");

// Configuring Discord Token
require('dotenv').config();
const TOKEN = process.env.TOKEN;
const rest = new REST({ version: '9' }).setToken(TOKEN);


// Array with all bot commands that will be send later to Discord 
var command_list = [];


// Normalize the paths for Events and Modules 
var ModualNormalizedPath = require("path").join(__dirname, "function_modules");
var EventsNormalizedPath = require("path").join(__dirname, "Events");

// Bot in Production mode?
var isProductionMode = glofunc.CheckProductionMode();


// Count how many modules are there and if they are loaded.
var mods_loaded = 0;
var mods_total = 0;

// Loading all function modules
glofunc.GetAllFilesFromPath(ModualNormalizedPath).forEach(function (file) {
	mods_total++;

	// Log what its trying to load in.
	process.stdout.write("\x1b[36m[" + mods_loaded + "/" + mods_total + "] \x1b[0mLoading up Module: " + file + "...");

	try {
		imports.ModuleImports.set(file, require(file));
		var type_module = imports.ModuleImports.get(file).ModuleType.toLowerCase();
		
		imports.ModuleType.set(file, type_module);
		
		
		mods_loaded++;
		process.stdout.write("   [ \x1b[32mOK\x1b[0m ] \n");
		
		if(type_module == "command"){
		
			// Command metadata
			var command_module = imports.ModuleImports.get(file).CommandName[0].toLowerCase();
			var command_description = imports.ModuleImports.get(file).CommandDescription;
			
			// Add command to list.
			const command_builder = new SlashCommandBuilder().setName(command_module).setDescription(command_description);
			command_list.push(command_builder);
		}

	} catch (e) {
	
		// When the module did fail to load it will show an error.
		process.stdout.write("   [ \x1b[31mFAIL\x1b[0m ]\n");
		console.log(e);
		process.stdout.write("\x1b[31mERROR: The module '" + file + "' will not be loaded in, please fix the issue.\x1b[0m\n");
	}
});



//Getting all events
fs.readdirSync(EventsNormalizedPath).forEach(function (file) {
	process.stdout.write("Require listener: " + file + "...");
	
	try {
		require("./Events/" + file);
		process.stdout.write("   [ \x1b[32mOK\x1b[0m ]\n");
	} catch (e) {
		process.stdout.write("   [ \x1b[31mFAIL\x1b[0m ]\n");
		console.log(e);
		process.stdout.write("\x1b[31mERROR: The module '" + file + "' will not be loaded in, please fix the issue.\x1b[0m\n");
	}
});




// Push all commands to commandlist.
//rest.put(Routes.applicationCommands("1042160078586925106"), { body: command_list }).then(() => console.log('Successfully registered application commands.')).catch(console.error);


// Make a connection to the database.
/*
glofunc.con.connect(function(err) {
	if (err) throw err;
	console.log("Connected!");
});*/


// Send warning message when not all modules are loaded in.
if(mods_loaded == mods_total) {
	console.log("\x1b[36m[" + mods_loaded + "/" + mods_total + "] \x1b[32mEverything loaded up, logging into servers...\x1b[0m\n");
} else {
	console.log("\x1b[36m[" + mods_loaded + "/" + mods_total + "] \x1b[33mWARNING: Not all modules seem to be loaded! We will try to continue but some things may be broken. logging into servers...\x1b[0m\n");
}


// this is for cleaning up code and is called when the app exits or closes for any reason.
var cleanup = require('./cleanup').Cleanup(myCleanup);

function myCleanup() {
	console.log('Spoonful Bot Has Exited....');
};




imports.bot.login(TOKEN);
