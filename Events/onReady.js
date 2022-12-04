const imports = require("../imports");

imports.bot.on("ready", () => {
	console.info(`Logged in as ${imports.bot.user.tag}!`);
	imports.bot.user.setActivity("for /start to play", { type: "WATCHING" });
});
