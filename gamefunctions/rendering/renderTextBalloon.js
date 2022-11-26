
const textFormatting = require('../formatting/textFormatting');
const vars = require('../../globalvars');

const {loadImage} = require("skia-canvas");

module.exports = {

	renderTextBalloon: async function(interaction){
	
	
		// Marking game state array location
		var p_root = vars.player[interaction.user.id];
		var p_render = p_root.render;
		var interaction_id = vars.player[interaction.user.id].interaction;
		
		
		console.log(p_render.frame);
		
		
		var data = p_root.gamedata.gameplay[0];
		
		//Render textballoon
		if(data.enable_textballoon){
			const img_textbox = await loadImage('./assets/images/textbox.png')
			const img_textdone = await loadImage('./assets/images/textdone.png')
			
			// Fade in effect
			if(data.textballoon_fadein){
			
				//TODO: Recode textballoon
				/*
				var task_done = false;
				var textbox_animation_alpha = 0;
				
				while(!task_done){
					//ctx.fillStyle = "#ffffff";
					//ctx.fillRect(0, 0, canvas.width, canvas.height);
					ctx.restore();
				
					ctx.globalAlpha = textbox_animation_alpha/10;
					ctx.drawImage(img_textbox, 0, 0); 
					textbox_animation_alpha++;
					ctx.globalAlpha = 1;
					
					if(textbox_animation_alpha == 10) task_done = true;
					
					encoder.addFrame(ctx);
				}
				*/
			} 
			// Draw text
			// TODO: Make text animation optional
			/*
			for(var i = 0; i <= data.textballoon_text.length; i++){
				//ctx.fillStyle = "#ffffff";
				//ctx.fillRect(0, 0, canvas.width, canvas.height);
				
				ctx.drawImage(img_textbox, 0, 0); 
				
				ctx.fillStyle = "#3d66b8";
				ctx.fillText(textFormatting.textFormatting(data.textballoon_author, data), 199, 172);
				
				ctx.fillStyle = "#a1aec7";
				ctx.fillText(textFormatting.textFormatting(data.textballoon_text, data).toString().slice(0, i), 199, 208);
				
				
				
				
			}
			// TODO: Make fadeout function.
			
			// Add text done symbol at the last frame.
			ctx.drawImage(img_textdone, canvas.width - 22, canvas.height - 22); 
			encoder.addFrame(ctx);
		*/
		}
	
	
	
	
	
	}


}
