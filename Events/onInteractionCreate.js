const imports = require('../imports');

imports.bot.on('interactionCreate',  async (interaction) => {
	console.log(interaction);
	
	if(interaction.isCommand()){
		for (let [k, v] of imports.ModuleImports.entries()) {
			if(imports.ModuleType.get(k) == "command"){
				if(imports.ModuleImports.get(k).CommandName.includes(interaction.commandName.toLowerCase())){
					try {
						
						//if(aaa){}
						
						//Check channel whitelist
						if(imports.ModuleImports.get(k).CommandToggleWhitelist){
						
							//Todo: deprecated whitelist function 
						
							if(!imports.ModuleImports.get(k).CommandWhitelist.includes(interaction.channelId)){
								if(msg.guild){
									await interaction.reply({ content: ":no_entry_sign: **Sorry,** *But you can't use that command in this channel.*", ephemeral: true });
									return;
								}
							}
						}
						
						if(interaction.guildId){
						
							//Check guild
							if(!imports.ModuleImports.get(k).CommandRunGuild){
								await interaction.reply({ content: ":no_entry_sign: **Sorry,** *But you can't use this command in guilds, please use dms.*", ephemeral: true });
								return;
							}
							
							
							imports.ModuleImports.get(k).run(interaction);
							
							// permissions disabled for a full permission system rewrite.
							
							//if(imports.ModuleImports.get(k).Permissions <= GetUserPermissions(msg)){
							//	imports.ModuleImports.get(k).run(msg, args);
							//} else {
							//	await interaction.reply(":no_entry_sign: **Sorry,** *But you don't have the permissions to run this command.*");
							//}
							
						} else {
							
							//Check dms
							if(!imports.ModuleImports.get(k).CommandRunDM){
								await interaction.reply({ content: ":no_entry_sign: **Sorry,** *But you can't use this command in dms, please use guilds.*", ephemeral: true });
								return;
							}
							
							if(imports.ModuleImports.get(k).Permissions == 0){
								imports.ModuleImports.get(k).run(interaction);
							} else {
								await interaction.reply({ content: ":no_entry_sign: **Sorry,** *But you don't have the permissions to run this command.*", ephemeral: true });
							}
						}



					} catch (e) {
						console.log(e);
						var mvdw_fix_this_you_lazy_cuck = imports.bot.users.cache.get('843501785603506246');
						mvdw_fix_this_you_lazy_cuck.send("Yo!! You maybe fucked up somewhere..\n\n```" + e + "```\nOk thanks.");
						
						await interaction.reply({ content: "I'm terribly sorry but an error occurred during processing of the command. The developers have been informed.", ephemeral: true });
					}
				}
			}
		}
	
	}

	if (interaction.isButton()){
		for (let [k, v] of imports.ModuleImports.entries()) {
			if(imports.ModuleType.get(k) == "clickbutton"){
				
				await imports.ModuleImports.get(k).run(interaction);
				
			}
		}
	}
	
	
	if (interaction.isModalSubmit()){
		for (let [k, v] of imports.ModuleImports.entries()) {
			if(imports.ModuleType.get(k) == "submitmodal"){
				
				await imports.ModuleImports.get(k).run(interaction);
				
			}
		}
	}
});
