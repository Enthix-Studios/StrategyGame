<?php
	if(isset($_GET["token"])){
		if(!ctype_xdigit($_GET["token"]) || strlen($_GET["token"]) !== 32){
			include_once("./error/game_error/INVALID_TOKEN_FORMAT.html");
			return;
		}
		
		setcookie("strategy_logintoken", $_GET["token"], time()+3600);
		
		header("Location: https://www.enthix.net/meid/oauth/index.php?client_id=3242323523556224");
		
		

	} else if(isset($_GET["access_code"]) && isset($_GET["expiry"]) && isset($_GET["user_id"])){
	
	
		$ch = curl_init();
		$ch2 = curl_init();
		$meid_api_request = "https://www.enthix.net/meid/api/v1/getUser.php?client_secret=kjfsdghirekjbscvurelamdbgroirghjjalldlifisinnnnewwerwka&access_token=" . $_GET["access_code"];

		curl_setopt($ch, CURLOPT_URL, $meid_api_request);
		curl_setopt($ch, CURLOPT_HEADER, 0);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
		$meid_api_raw_data = curl_exec($ch);
		$meid_api_data = json_decode($meid_api_raw_data);
		$info = curl_getinfo($ch);
		
		$server_api = "http://localhost:25555/" . $_COOKIE["strategy_logintoken"];
		echo $server_api;
		
		curl_setopt($ch2, CURLOPT_URL, $server_api);
		curl_setopt($ch2, CURLOPT_HEADER, 0);
		curl_setopt($ch2, CURLOPT_RETURNTRANSFER, true);
		curl_exec($ch2);
		
		
		
		echo $meid_api_raw_data;

		if($info['http_code'] !== 200) {
			
			echo "ERROR: WE could not log you in because of a server error.<br>Please contact us!";
			exit;
		}
		
		echo $_COOKIE["strategy_logintoken"];
		include_once("./error/game_error/GAME_LOGIN_SUCCESS.html");
		
	
	}
?>
