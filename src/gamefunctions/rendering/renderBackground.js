const textFormatting = require("../formatting/textFormatting");
const renderImage = require("./renderImage");
const vars = require("../../globalvars");

const { loadImage } = require("skia-canvas");

module.exports = {
	render: async function (interaction) {
		// Marking game state array location
		var p_root = vars.player[interaction.user.id];
		var p_render = p_root.render;
		var interaction_id = vars.player[interaction.user.id].interaction;

		var data = p_root.gamedata.gameplay[interaction_id];

		//const img_bg = await loadImage("" + data.background)
		//p_render.ctx.drawImage(img_bg, 0, 0);

		renderImage.render(interaction, "" + data.background, 0, 0);

		p_render.interactionDone = true;
	},
};
