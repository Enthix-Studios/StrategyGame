extends Button


func _on_pressed():
	var ConnectionNode = get_node("/root/Global/ConnectionManager")
	var SERVER_AUTH_TOKEN = ConnectionNode.SERVER_AUTH_TOKEN
	OS.shell_open("https://www.enthix.net/strategy/login?token=" + SERVER_AUTH_TOKEN)


func _on_mouse_entered():
	mouse_default_cursor_shape = Control.CURSOR_POINTING_HAND


func _on_mouse_exited():
	mouse_default_cursor_shape = Control.CURSOR_ARROW

