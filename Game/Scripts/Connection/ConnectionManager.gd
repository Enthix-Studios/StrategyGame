extends Node

var websocket_url = "ws://enthix.net:30001"

@export var SERVER_AUTH_TOKEN = "NONE"


var socket = WebSocketPeer.new()
var connection_state = 0


func _ready():
	print_debug("Connecting to ", websocket_url)
	socket.connect_to_url(websocket_url)
	

func _process(delta):
	socket.poll()
	var state = socket.get_ready_state()
	if state == WebSocketPeer.STATE_OPEN:
		_connectionHandleSetup()
		while socket.get_available_packet_count():
			var event_packet_raw = socket.get_packet().get_string_from_utf8()
			var event_packet_json = _processJsonFormat(event_packet_raw)
			print_debug("[server] ", event_packet_raw)
			_connectionHandleEvents(event_packet_json.event, event_packet_json.data)
			
			
	elif state == WebSocketPeer.STATE_CLOSING:
		pass
	elif state == WebSocketPeer.STATE_CLOSED:
		var code = socket.get_close_code()
		var reason = socket.get_close_reason()
		print("WebSocket closed with code: %d, reason %s. Clean: %s" % [code, reason, code != -1])
		set_process(false) # Stop processing.
		
func _processJsonFormat(json_string):
	var json_object = JSON.new()
	var json_data = json_object.parse(json_string)
	return json_object.get_data()
		

	
func _connectionHandleSetup():
	if connection_state == 0:
		socket.send_text('{ "event": "LOGIN_TOKEN_REQUEST", "data": null }');
		connection_state = 1
		
func _connectionHandleEvents(event, data):
	match(event):
		"LOGIN_TOKEN_REFRESH":
			SERVER_AUTH_TOKEN = data
			
		"AUTH":
			if data == "OK":
				print("Client has been logged in.")
	pass
