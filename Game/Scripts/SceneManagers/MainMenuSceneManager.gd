extends Node

var ConnectionManager
var SceneManager

func _process(delta):
	ConnectionManager = get_node("/root/Global/ConnectionManager")
	SceneManager = get_node("/root/Global/SceneManager")
	
	var SERVER_CONNECTION_STATE = ConnectionManager.SERVER_CONNECTION_STATE
	if SERVER_CONNECTION_STATE == 2:
		get_node("/root/MainMenu/MeIDLoginButton").show()
	elif SERVER_CONNECTION_STATE == 3:
		get_node("/root/MainMenu/MeIDLoginButton").hide()
		get_node("/root/MainMenu/PlayButton").show()


func _on_play_button_pressed():
	var scene = ResourceLoader.load("res://UI/MessagePopUp.tscn")
	var instance = scene.instantiate()
	add_child(instance)
	SceneManager._showPopUp("Message from client", "hello this is a test!! :D")
	#get_tree().change_scene("res://Scenes/World/1.tscn")
	pass # Replace with function body.
