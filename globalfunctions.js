const imports = require('./imports');
const vars = require('./globalvars');
const axios = require('axios');
const Canvas = require("canvas");
const GIFEncoder = require('gif-encoder-2');
var mysql = require('mysql-await');
require('dotenv').config();

//Getting the default chat platform library(can be something else than Discord)
const Discord = imports.Discord;

module.exports = {
	
	GetSingleMentionAfterCommandUsage: function GetSingleMentionAfterCommandUsage(msg) {

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
			userMentionedForAvatar = msgcontent.substr(indexOfFirstSpace + 1);
			var indexOfSecondSpace = userMentionedForAvatar.indexOf(" ");
			if (indexOfSecondSpace != -1) {
				userMentionedForAvatar = userMentionedForAvatar.substr(0, indexOfSecondSpace);
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
				var commandWithBotMentionAlt = `<@!${imports.bot.user.id}>` + " " + commands[i];

				if (messageString.startsWith(commandWithBotMentionAlt)) {
					if (indexOfFirstSpace != -1) {
						messageString = messageString.substr(indexOfFirstSpace + 1);
						var indexOfSecondSpace = messageString.indexOf(" ");
						if (indexOfSecondSpace != -1) {
							messageString = messageString.substr(0, indexOfSecondSpace);
						}
					}
				}
				else if (messageString.startsWith(commandWithPrefixAlt)) {
					if (indexOfFirstSpace != -1) {
						messageString = messageString.substr(0, indexOfFirstSpace);
						var indexOfSecondSpace = messageString.indexOf(" ");
						if (indexOfSecondSpace != -1) {
							messageString = messageString.substr(0, indexOfSecondSpace);
						}
					}
				}
				else {

				}

				if (messageString == commandWithPrefixAlt || messageString == commands[i]) {
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
		
		if(user_timeout.has(msg.author.id)){
			if(user_timeout.get(msg.author.id) > Date.now()){
				msg.channel.send("Please wait 5 seconds before running a command again\nTo bypass this you can buy premium.");
				return false;
				
			} else{
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
		return new Promise((resolve) => {
			setTimeout(resolve, ms);
		});
	},


	GetAllFilesFromPath: function GetAllFilesFromPath(dirPath, existingArrayOfFiles) {

		files = require("fs").readdirSync(dirPath);

		var arrayOfFiles = existingArrayOfFiles || [];		// if there is an existing array of files we can use that, or just create a new array

		files.forEach(function (file) {
			if (require("fs").statSync(dirPath + "/" + file).isDirectory()) {
				arrayOfFiles = GetAllFilesFromPath(dirPath + "/" + file, arrayOfFiles);
			} else {
				arrayOfFiles.push(require("path").join(dirPath, "/", file));
			}
		})

		return arrayOfFiles;

	}, 
	toHHMMSS: function (sec) {
		var sec_num = parseInt(sec, 10);
		var hours   = Math.floor(sec_num / 3600);
		var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
		var seconds = sec_num - (hours * 3600) - (minutes * 60);

		if (hours   < 10) {hours   = "0"+hours;}
		if (minutes < 10) {minutes = "0"+minutes;}
		if (seconds < 10) {seconds = "0"+seconds;}
		return hours+':'+minutes+':'+seconds;
	},
	toHex: function(data) {
		if(!data) return;
		var arr1 = [];
		for (var n = 0, l = data.length; n < l; n ++) {
			var hex = Number(data.charCodeAt(n)).toString(16);
			arr1.push(hex);
		}
		return arr1.join('');
	},
	con:  mysql.createConnection({
		host: process.env.MYSQLHOST,
		user: process.env.MYSQLUSER,
		password: process.env.MYSQLPASS,
		database: process.env.MYSQLDB,
		socketPath: "/var/run/mysqld/mysqld.sock"
	}),
	gameFormating: function(str, interaction){
		return str.replaceAll('{VAL_USERNAME}', vars.player[interaction.user.id].username)
	
	},
	gameInteraction: async function(interaction){
	
		if(interaction.isButton() || interaction.isModalSubmit()) interaction.deferUpdate();
		
		//if (!(interaction.user.id in vars.player)){
			//vars.player[interaction.user.id] = {"interaction": 0,"room":0,"message":null, "username":null};
		//};
		console.log(vars.player[interaction.user.id]);
		
		
		
		var playEmbed = new Discord.EmbedBuilder();
		var playEmbedRow = new Discord.ActionRowBuilder();
		
		const canvas = Canvas.createCanvas(400, 225);
		const ctx = canvas.getContext('2d');
		const encoder = new GIFEncoder(canvas.width, canvas.height, 'octree');
		var stream = encoder.createReadStream();

		encoder.start();
		encoder.setRepeat(-1);   // 0 for repeat, -1 for no-repeat
		encoder.setDelay(41);  // frame delay in ms
		encoder.setQuality(10); // image quality. 10 is default.
		
		Canvas.registerFont('./assets/fonts/electrolize.ttf', { family: "visitor" });
		
		//clear canvas
		ctx.fillStyle = "#ffffff";
		ctx.fillRect(0, 0, canvas.width, canvas.height);

		ctx.font = "13px Electrolize";
		ctx.textAlign = 'center';
		ctx.fillStyle = "#111";

		let gamedata = require('./gamedata/game.json');
		var item = vars.player[interaction.user.id].interaction;
		vars.player[interaction.user.id].interaction++;
		
		console.log(gamedata.gameplay[item].textballoon_text);
		
		//Render textballoon
		if(gamedata.gameplay[item].enable_textballoon){
			const img_textbox = await Canvas.loadImage('./assets/images/textbox.png')
			const img_textdone = await Canvas.loadImage('./assets/images/textdone.png')
			
			// Fade in effect
			if(gamedata.gameplay[item].textballoon_fadein){
				var task_done = false;
				var textbox_animation_alpha = 0;
				
				while(!task_done){
					ctx.fillStyle = "#ffffff";
					ctx.fillRect(0, 0, canvas.width, canvas.height);
				
				
					ctx.globalAlpha = textbox_animation_alpha/10;
					ctx.drawImage(img_textbox, 0, 0); 
					textbox_animation_alpha++;
					ctx.globalAlpha = 1;
					
					if(textbox_animation_alpha == 10) task_done = true;
					
					encoder.addFrame(ctx);
				}
			} 
			// Draw text
			// TODO: Make text animation optional
			for(var i = 0; i <= gamedata.gameplay[item].textballoon_text.length; i++){
				ctx.fillStyle = "#ffffff";
				ctx.fillRect(0, 0, canvas.width, canvas.height);
				
				ctx.drawImage(img_textbox, 0, 0); 
				
				ctx.fillStyle = "#3d66b8";
				ctx.fillText(module.exports.gameFormating(gamedata.gameplay[item].textballoon_author, interaction), 199, 172);
				
				ctx.fillStyle = "#a1aec7";
				ctx.fillText(module.exports.gameFormating(gamedata.gameplay[item].textballoon_text, interaction).slice(0, i), 199, 208);
				
				
				
				encoder.addFrame(ctx);
			}
			// TODO: Make fadeout function.
			
			// Add text done symbol at the last frame.
			ctx.drawImage(img_textdone, canvas.width - 22, canvas.height - 22); 
			encoder.addFrame(ctx);
		
		}














		/*
		if(vars.player[interaction.user.id].room == 0){
			if(vars.player[interaction.user.id].interaction == 0){
				var textbox = "Hi and welcome to Strategy game."
				var animation_state = 0;
				var textbox_animation_alpha = 0;
				
				if(animation_state == 0){
					while(animation_state == 0){
						ctx.fillStyle = "#ffffff";
						ctx.fillRect(0, 0, canvas.width, canvas.height);
					
					
						ctx.globalAlpha = textbox_animation_alpha/10;
						ctx.drawImage(img_textbox, 0, 0); 
						textbox_animation_alpha++;
						ctx.globalAlpha = 1;
						
						if(textbox_animation_alpha == 10) animation_state = 1;
						
						encoder.addFrame(ctx);
					}
				} 
				if(animation_state == 1){
				
					for(var i = 0; i <= textbox.length; i++){
						ctx.fillStyle = "#ffffff";
						ctx.fillRect(0, 0, canvas.width, canvas.height);
						
						ctx.drawImage(img_textbox, 0, 0); 
						
						ctx.fillStyle = "#3d66b8";
						ctx.fillText("???", 199, 172);
						
						ctx.fillStyle = "#a1aec7";
						ctx.fillText(textbox.slice(0, i), 199, 208);
						
						
						
						encoder.addFrame(ctx);
					}
				}
				
				
				ctx.drawImage(img_textdone, canvas.width - 22, canvas.height - 22); 
				encoder.addFrame(ctx);
				player[interaction.user.id].interaction++;
			} else if(player[interaction.user.id].interaction == 1){
				var textbox = "This game is in early development so expect some bugs.."
				
				for(var i = 0; i <= textbox.length; i++){
					ctx.fillStyle = "#ffffff";
					ctx.fillRect(0, 0, canvas.width, canvas.height);
					ctx.fillStyle = "#111";
					
					ctx.drawImage(img_textbox, 0, 0); 
					
					ctx.fillStyle = "#3d66b8";
					ctx.fillText("???", 199, 172);
					
					ctx.fillStyle = "#a1aec7";
					ctx.fillText(textbox.slice(0, i), 199, 208);
					
					encoder.addFrame(ctx);
				}
				ctx.drawImage(img_textdone, canvas.width - 22, canvas.height - 22); 
				encoder.addFrame(ctx);
				player[interaction.user.id].interaction++;
			} else if(player[interaction.user.id].interaction == 2){
				var textbox = "Before we start please tell your name."
				
				for(var i = 0; i <= textbox.length; i++){
					ctx.fillStyle = "#ffffff";
					ctx.fillRect(0, 0, canvas.width, canvas.height);
					ctx.fillStyle = "#111";
					
					ctx.drawImage(img_textbox, 0, 0); 
					
					ctx.fillStyle = "#3d66b8";
					ctx.fillText("???", 199, 172);
					
					ctx.fillStyle = "#a1aec7";
					ctx.fillText(textbox.slice(0, i), 199, 208);
					
					encoder.addFrame(ctx);
				}
				
				ctx.drawImage(img_textdone, canvas.width - 22, canvas.height - 22); 
				encoder.addFrame(ctx);
				player[interaction.user.id].interaction++;
			} else if(player[interaction.user.id].interaction == 3){
				player[interaction.user.id].username = player[interaction.user.id].message
				var textbox = "My name is " + player[interaction.user.id].username + ""
				
				for(var i = 0; i <= textbox.length; i++){
					ctx.fillStyle = "#ffffff";
					ctx.fillRect(0, 0, canvas.width, canvas.height);
					ctx.fillStyle = "#111";
					
					ctx.drawImage(img_textbox, 0, 0); 
					
					ctx.fillStyle = "#3d66b8";
					ctx.fillText(player[interaction.user.id].username, 199, 172);
					
					ctx.fillStyle = "#a1aec7";
					ctx.fillText(textbox.slice(0, i), 199, 208);
					
					encoder.addFrame(ctx);
				}
				ctx.drawImage(img_textdone, canvas.width - 22, canvas.height - 22); 
				encoder.addFrame(ctx);
				player[interaction.user.id].interaction++;
				
			} else if(player[interaction.user.id].interaction == 4){
				var textbox = "I hope we have a great time toghetter!"
				
				for(var i = 0; i <= textbox.length; i++){
					ctx.fillStyle = "#ffffff";
					ctx.fillRect(0, 0, canvas.width, canvas.height);
					ctx.fillStyle = "#111";
					
					ctx.drawImage(img_textbox, 0, 0); 
					
					ctx.fillStyle = "#3d66b8";
					ctx.fillText("???", 199, 172);
					
					ctx.fillStyle = "#a1aec7";
					ctx.fillText(textbox.slice(0, i), 199, 208);
					
					encoder.addFrame(ctx);
				}
				ctx.drawImage(img_textdone, canvas.width - 22, canvas.height - 22); 
				encoder.addFrame(ctx);
				player[interaction.user.id].interaction++;
			}
		
		
		}*/

		 
		 
		 
		 
		encoder.finish();
		
		
		
		
		const attachment = new Discord.AttachmentBuilder(stream, { name: 'game.gif' });
		
		//playEmbed.setDescription("this is an early development build, expect bugs!");
		playEmbed.setColor("#ffffff");
		playEmbed.setImage("attachment://game.gif");
		console.log("btn arr len: " + gamedata.gameplay[item].interactbutton.length);
		
		
		//for(var i = 0; i <= gamedata.gameplay[item].interactbutton.length; i++){
			
		
		
		//}
		if(vars.player[interaction.user.id].interaction == 3){
			playEmbedRow.addComponents(
				new Discord.ButtonBuilder()
				.setCustomId("my_name_is")
				.setLabel('My name is...')
				.setStyle(Discord.ButtonStyle.Secondary)
				.setEmoji('🖊️')
			);
		} else {
			playEmbedRow.addComponents(
				new Discord.ButtonBuilder()
				.setCustomId("next")
				.setLabel('Next')
				.setStyle(Discord.ButtonStyle.Secondary)
				.setEmoji('1042544660968636467')
			);
		
		}
		
	
		
		
		// Update message system.
		//if(interaction.isButton() || interaction.isModalSubmit()){
			//await interaction.update({ embeds: [playEmbed], components: [playEmbedRow], files: [attachment] });
			
		//} else if(interaction.isModalSubmit()){
		//	interaction.deferUpdate();
		//	player[interaction.user.id].message.edit({ embeds: [playEmbed], components: [playEmbedRow], files: [attachment] });
		
		if(interaction.isCommand()){
			await interaction.reply({ embeds: [playEmbed], components: [playEmbedRow], files: [attachment] });
			
			const message = await interaction.fetchReply();
			vars.player[interaction.user.id].message = message;
		} else {
			vars.player[interaction.user.id].message.edit({ embeds: [playEmbed], components: [playEmbedRow], files: [attachment] });
		}
	}
	
	
};



