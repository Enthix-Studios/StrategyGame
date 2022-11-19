const imports = require('./imports');
const vars = require('./globalvars');

const {Canvas, FontLibrary, loadImage} = require("skia-canvas");

module.exports = {
	gameFormating: async function(str, data){
		return str.replaceAll('{VAL_USERNAME}', data.username)
	
	},
	textBalloon: async function(canvas, ctx, encoder, data){
	
	
		//Render textballoon
		if(data.enable_textballoon){
			const img_textbox = await loadImage('./assets/images/textbox.png')
			const img_textdone = await loadImage('./assets/images/textdone.png')
			
			// Fade in effect
			if(data.textballoon_fadein){
				var task_done = false;
				var textbox_animation_alpha = 0;
				
				while(!task_done){
					//ctx.fillStyle = "#ffffff";
					//ctx.fillRect(0, 0, canvas.width, canvas.height);
				
				
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
			for(var i = 0; i <= data.textballoon_text.length; i++){
				//ctx.fillStyle = "#ffffff";
				//ctx.fillRect(0, 0, canvas.width, canvas.height);
				
				ctx.drawImage(img_textbox, 0, 0); 
				
				ctx.fillStyle = "#3d66b8";
				ctx.fillText(module.exports.gameFormating(data.textballoon_author, data), 199, 172);
				
				ctx.fillStyle = "#a1aec7";
				ctx.fillText(module.exports.gameFormating(data.textballoon_text, data).slice(0, i), 199, 208);
				
				
				
				encoder.addFrame(ctx);
			}
			// TODO: Make fadeout function.
			
			// Add text done symbol at the last frame.
			ctx.drawImage(img_textdone, canvas.width - 22, canvas.height - 22); 
			encoder.addFrame(ctx);
		
		}
	
	
	
	
	
	}


}
