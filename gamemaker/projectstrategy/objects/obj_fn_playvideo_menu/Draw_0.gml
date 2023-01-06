/// @DnDAction : YoYo Games.Common.Execute_Code
/// @DnDVersion : 1
/// @DnDHash : 34ABB280
/// @DnDArgument : "code" "var _videoData = video_draw();$(13_10)var _videoStatus = _videoData[0];$(13_10)if(_videoStatus == 0){$(13_10)	draw_surface(_videoData[1], 171,0,)$(13_10)}"
var _videoData = video_draw();
var _videoStatus = _videoData[0];
if(_videoStatus == 0){
	draw_surface(_videoData[1], 171,0,)
}