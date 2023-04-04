extends Node

var websocket_url = "ws://enthix.net:30001"

var socket = WebSocketPeer.new()

func _ready():
	print_debug("Connecting to ", websocket_url)
	socket.connect_to_url(websocket_url)
	

func _process(delta):
	socket.poll()
	var state = socket.get_ready_state()
	if state == WebSocketPeer.STATE_OPEN:
		socket.send_text("hi");
		while socket.get_available_packet_count():
			print("Packet: ", socket.get_packet())
		
	elif state == WebSocketPeer.STATE_CLOSING:
		pass
	elif state == WebSocketPeer.STATE_CLOSED:
		var code = socket.get_close_code()
		var reason = socket.get_close_reason()
		print("WebSocket closed with code: %d, reason %s. Clean: %s" % [code, reason, code != -1])
		set_process(false) # Stop processing.
