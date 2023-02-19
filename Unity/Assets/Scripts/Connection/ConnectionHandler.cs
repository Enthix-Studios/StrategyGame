using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

using NativeWebSocket;


public class ConnectionHandler : MonoBehaviour {

	WebSocket websocket;
	
	async void Start() { 
		
		
		Debug.Log("Trying to start connection to EGS...");
		
		// EGS(Enthix Gaming Servers) Lists:
		//    - enthix.net:30001 > Production servers
		//    - enthix.net:30003 > Development servers
		//
		// Ports 20001 and 30002 are used for other services for this game.
		
		websocket = new WebSocket("ws://enthix.net:30001");



		websocket.OnOpen += () => {
			Debug.Log("Started a connection on the EGS");
			
			// Request login status from EGS
			// TODO: Save the token in save file to be reused(so you don't have to login again on MeID) 
			websocket.SendText("{\"event\": \"LOGIN_TOKEN_REQUEST\", \"data\": \"\"}");
		};



		// TODO: Make a request to a diagnostic reporting server.
		websocket.OnError += (e) => {
			Debug.Log("Error! " + e);
		};



		// TODO: Terminating to home screen and restart the connection.
		websocket.OnClose += (e) => {
			Debug.Log("Connection closed!");
		};

		
		// TODO: Make event handler and include the correct scripts for the event job given by the EGS
		websocket.OnMessage += (bytes) => {
			// Reading a plain text message
			var message = System.Text.Encoding.UTF8.GetString(bytes);
			Debug.Log("Received OnMessage! (" + bytes.Length + " bytes) " + message);
		};

		// Sending heartbeat to EGS to keep connection alive.
		InvokeRepeating("SendHeartBeat", 0.0f, 5.0f);

		await websocket.Connect();

        DontDestroyOnLoad(gameObject);
	}



	void Update() {
		//#if !UNITY_WEBGL || UNITY_EDITOR
		websocket.DispatchMessageQueue();
		//#endif
	}


	async void SendHeartBeat() {
		if (websocket.State == WebSocketState.Open) {
			// Sending bytes
			//await websocket.Send(new byte[] { 10, 20, 30 });

			// Sending plain text
			await websocket.SendText("{\"event\": \"CONNECTION_HEARTBEAT\", \"data\": \"\"}");
		}
	}
	
	
	private async void OnApplicationQuit() {
		await websocket.Close();
	}
}
