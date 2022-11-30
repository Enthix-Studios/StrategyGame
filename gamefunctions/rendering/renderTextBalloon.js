
const textFormatting = require('../formatting/textFormatting');
const renderImage = require('./renderImage');
const vars = require('../../globalvars');

const {loadImage} = require("skia-canvas");

module.exports = {

	renderTextBalloon: async function(interaction){
	
	
		// Marking game state array location
		var p_root = vars.player[interaction.user.id];
		var p_render = p_root.render;
		var interaction_id = vars.player[interaction.user.id].interaction;
		
		
		
		var data = p_root.gamedata.gameplay[interaction_id];
		
		//Render textballoon
		if(data.enable_textballoon){
			//const img_textbox = await loadImage('./assets/images/textbox.png')
			//const img_textdone = await loadImage('./assets/images/textdone.png')
			
			// Fade in effect
			if(data.textballoon_fadein && p_render.frame <= 10){
			
				//TODO: Recode textballoon

				p_render.ctx.globalAlpha = p_render.frame/10;
				//p_render.ctx.drawImage(img_textbox, 0, 0); 
				renderImage.render(interaction, './assets/images/textbox.png', 0, 0)
				p_render.ctx.globalAlpha = 1;
				
				
			}  else {
				// TODO: Make text animation optional
				var frame_offset = p_render.frame;
				if(data.textballoon_fadein) frame_offset = p_render.frame - 10;

				
				//p_render.ctx.drawImage(img_textbox, 0, 0); 
				renderImage.render(interaction, './assets/images/textbox.png', 0, 0)
				
				p_render.ctx.fillStyle = "#3d66b8";
				p_render.ctx.fillText(textFormatting.textFormatting(data.textballoon_author, p_root), 199, 172);
				
				p_render.ctx.fillStyle = "#a1aec7";
				p_render.ctx.fillText(textFormatting.textFormatting(data.textballoon_text, p_root).toString().slice(0, frame_offset), 199, 208);
				
				
				
				
				
				// TODO: Make fadeout function.

			}
			if(data.textballoon_text.length == frame_offset){
				// Add text done symbol at the last frame.
				renderImage.render(interaction, './assets/images/textdone.png', p_render.canvas.width - 22, p_render.canvas.height - 22)
				//p_render.ctx.drawImage(img_textdone, p_render.canvas.width - 22, p_render.canvas.height - 22); 
				p_render.interactionDone = true;
			} else {
				p_render.interactionDone = false;
			}
			
		}
	
	}

}
