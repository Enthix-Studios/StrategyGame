const vars = require("../../globalvars");

const { loadImage } = require("skia-canvas");

module.exports = {
	render: async function (interaction, asset, x, y) {
		if (typeof vars.loadedAssets[asset] === "undefined") {
			console.log("LOADING " + asset);
			vars.loadedAssets[asset] = await loadImage(asset);
		}

		vars.player[interaction.user.id].render.ctx.drawImage(
			vars.loadedAssets[asset],
			x,
			y,
		);
	},
};
