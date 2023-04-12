extends Node


# Called when the node enters the scene tree for the first time.
func _ready():
	pass # Replace with function body.


# Called every frame. 'delta' is the elapsed time since the previous frame.
func _process(delta):
	pass

func _showPopUp(title, description):
	var scene = preload("res://UI/MessagePopUp.tscn").instantiate()
	
	
	get_parent().add_child(scene)
	
	
	var test = get_parent().get_node("MessagePopUp/Title").text
	print_debug(test)
	get_parent().get_node("MessagePopUp/Title").text = "title"
	
	print_debug(test)
	
	scene.get_node("MessagePopUp/Description")
	#TODO: Get instance and set textlable to title and description
	

	
