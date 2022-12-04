const imports = require("./imports");
const vars = require("./globalvars");
const axios = require("axios");
const { Canvas, FontLibrary, loadImage } = require("skia-canvas");
const GIFEncoder = require("gif-encoder-2");
var mysql = require("mysql-await");
require("dotenv").config();

//Getting the default chat platform library(can be something else than Discord)
const Discord = imports.Discord;

module.exports = {
	GetSingleMentionAfterCommandUsage:
		function GetSingleMentionAfterCommandUsage(msg) {
			var msgcontent = msg.content;

			if (msgcontent.startsWith(`<@!${imports.bot.user.id}>` + " ")) {
				var indexOfFirstSpace = msgcontent.indexOf(" ");
				if (indexOfFirstSpace != -1) {
					msgcontent = msgcontent.substr(indexOfFirstSpace + 1);
				}
			}

			var userMentionedForAvatar = null;

			var indexOfFirstSpace = msgcontent.indexOf(" ");
			if (indexOfFirstSpace != -1) {
				userMentionedForAvatar = msgcontent.substr(
					indexOfFirstSpace + 1,
				);
				var indexOfSecondSpace = userMentionedForAvatar.indexOf(" ");
				if (indexOfSecondSpace != -1) {
					userMentionedForAvatar = userMentionedForAvatar.substr(
						0,
						indexOfSecondSpace,
					);
				}
			}

			return userMentionedForAvatar;
		},

	CommandHandler: function CommandHandler(msg, commands) {
		var prefix = ">>"; // Should be later get from the database to change the prefix.

		const message = msg.content.toLowerCase();
		var messageString = message;
		var indexOfFirstSpace = messageString.indexOf(" ");

		if (commands !== undefined) {
			for (var i = 0; i < commands.length; i++) {
				var commandWithPrefixAlt = prefix + commands[i];
				var commandWithBotMentionAlt =
					`<@!${imports.bot.user.id}>` + " " + commands[i];

				if (messageString.startsWith(commandWithBotMentionAlt)) {
					if (indexOfFirstSpace != -1) {
						messageString = messageString.substr(
							indexOfFirstSpace + 1,
						);
						var indexOfSecondSpace = messageString.indexOf(" ");
						if (indexOfSecondSpace != -1) {
							messageString = messageString.substr(
								0,
								indexOfSecondSpace,
							);
						}
					}
				} else if (messageString.startsWith(commandWithPrefixAlt)) {
					if (indexOfFirstSpace != -1) {
						messageString = messageString.substr(
							0,
							indexOfFirstSpace,
						);
						var indexOfSecondSpace = messageString.indexOf(" ");
						if (indexOfSecondSpace != -1) {
							messageString = messageString.substr(
								0,
								indexOfSecondSpace,
							);
						}
					}
				} else {
				}

				if (
					messageString == commandWithPrefixAlt ||
					messageString == commands[i]
				) {
					if (module.exports.CommandTimeout(msg)) return true;
				}
			}
		}

		return false;
	},

	CommandTimeout: function CommandTimeout(msg) {
		//TODO: Fix the memory leak I just created...
		//TODO: Check if user is premium, will be from the database.

		//var timeoutTime = 5000;	// This will be production timeouts for a user for fun commands. Some command will need to be not limited by timeout, such as moderation ones.
		var timeoutTime = 0;

		if (user_timeout.has(msg.author.id)) {
			if (user_timeout.get(msg.author.id) > Date.now()) {
				msg.channel.send(
					"Please wait 5 seconds before running a command again\nTo bypass this you can buy premium.",
				);
				return false;
			} else {
				user_timeout.set(msg.author.id, Date.now() + timeoutTime);
				return true;
			}
		} else {
			user_timeout.set(msg.author.id, Date.now() + timeoutTime);
			return true;
		}
	},

	// Checks if this is production or not, held in the .evn file that is being git ignored.
	CheckProductionMode: function CheckProductionMode() {
		const ISTHISPRODUCTION = process.env.ISTHISPRODUCTION;
		if (ISTHISPRODUCTION == "TRUE") {
			return true;
		}

		return false;
	},

	// You can make it force sleep (wait) if you need to.
	// Only use this in async functions, otherwise you're gonna make whatever you are doing lag hard.
	// Sometimes the bot might respond too fast lol
	ForceSleep: function ForceSleep(ms) {
		return new Promise(resolve => {
			setTimeout(resolve, ms);
		});
	},

	GetAllFilesFromPath: function GetAllFilesFromPath(
		dirPath,
		existingArrayOfFiles,
	) {
		files = require("fs").readdirSync(dirPath);

		var arrayOfFiles = existingArrayOfFiles || []; // if there is an existing array of files we can use that, or just create a new array

		files.forEach(function (file) {
			if (
				require("fs")
					.statSync(dirPath + "/" + file)
					.isDirectory()
			) {
				arrayOfFiles = GetAllFilesFromPath(
					dirPath + "/" + file,
					arrayOfFiles,
				);
			} else {
				arrayOfFiles.push(require("path").join(dirPath, "/", file));
			}
		});

		return arrayOfFiles;
	},
	toHHMMSS: function (sec) {
		var sec_num = parseInt(sec, 10);
		var hours = Math.floor(sec_num / 3600);
		var minutes = Math.floor((sec_num - hours * 3600) / 60);
		var seconds = sec_num - hours * 3600 - minutes * 60;

		if (hours < 10) {
			hours = "0" + hours;
		}
		if (minutes < 10) {
			minutes = "0" + minutes;
		}
		if (seconds < 10) {
			seconds = "0" + seconds;
		}
		return hours + ":" + minutes + ":" + seconds;
	},
	toHex: function (data) {
		if (!data) return;
		var arr1 = [];
		for (var n = 0, l = data.length; n < l; n++) {
			var hex = Number(data.charCodeAt(n)).toString(16);
			arr1.push(hex);
		}
		return arr1.join("");
	},
	con: mysql.createConnection({
		host: process.env.MYSQLHOST,
		user: process.env.MYSQLUSER,
		password: process.env.MYSQLPASS,
		database: process.env.MYSQLDB,
		socketPath: "/var/run/mysqld/mysqld.sock",
	}),
};
