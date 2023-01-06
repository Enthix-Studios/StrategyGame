/// @DnDAction : YoYo Games.Instances.Sprite_Animation_Speed
/// @DnDVersion : 1
/// @DnDHash : 0772544D
/// @DnDArgument : "speed" "0"
image_speed = 0;

/// @DnDAction : YoYo Games.Instances.Set_Sprite
/// @DnDVersion : 1
/// @DnDHash : 532B1987
/// @DnDArgument : "imageind" "34"
/// @DnDArgument : "spriteind" "spr_logo_mvdw"
/// @DnDSaveInfo : "spriteind" "spr_logo_mvdw"
sprite_index = spr_logo_mvdw;
image_index = 34;

/// @DnDAction : YoYo Games.Common.Variable
/// @DnDVersion : 1
/// @DnDHash : 712B9D78
/// @DnDArgument : "var" "v_fadeout"
v_fadeout = 0;

/// @DnDAction : YoYo Games.Loops.While_Loop
/// @DnDVersion : 1
/// @DnDHash : 59D2C6ED
/// @DnDArgument : "var" "v_fadeout"
/// @DnDArgument : "op" "1"
/// @DnDArgument : "value" "100"
while ((v_fadeout < 100)) {
	/// @DnDAction : YoYo Games.Drawing.Draw_Sprite_Transformed
	/// @DnDVersion : 1
	/// @DnDHash : 71A10060
	/// @DnDParent : 59D2C6ED
	/// @DnDArgument : "alpha" "v_fadeout"
	/// @DnDArgument : "sprite" "spr_color_black"
	/// @DnDSaveInfo : "sprite" "spr_color_black"
	draw_sprite_ext(spr_color_black, 0, 0, 0, 1, 1, 0, $FFFFFF & $ffffff, v_fadeout);

	/// @DnDAction : YoYo Games.Common.Variable
	/// @DnDVersion : 1
	/// @DnDHash : 21C0B476
	/// @DnDParent : 59D2C6ED
	/// @DnDArgument : "expr" "v_fadeout+1"
	/// @DnDArgument : "var" "v_fadeout"
	v_fadeout = v_fadeout+1;
}

/// @DnDAction : YoYo Games.Rooms.Go_To_Room
/// @DnDVersion : 1
/// @DnDHash : 0CA6B0FF
/// @DnDArgument : "room" "rm_gamelogo"
/// @DnDSaveInfo : "room" "rm_gamelogo"
room_goto(rm_gamelogo);