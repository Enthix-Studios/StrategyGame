extends Node


func _process(delta):
	var globalScene = get_node("/root/Global")
	var SERVER_CONNECTION_STATE = globalScene.SERVER_CONNECTION_STATE
	if SERVER_CONNECTION_STATE == 2:
		get_node("/root/MainMenu/MeIDLoginButton").show()
	elif SERVER_CONNECTION_STATE == 3:
		get_node("/root/MainMenu/MeIDLoginButton").hide()
		get_node("/root/MainMenu/PlayButton").show()
