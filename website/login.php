<?php
	if(isset($_GET["token"])){
		if(!ctype_xdigit($_GET["token"]) || strlen($_GET["token"]) !== 32){
			echo "<center><h2>Oh no.. an error occurred</h2><hr>There was an issue while trying to communicate with the server, please update your game client if possible.</center>";
			return;
		}
		
		setcookie("strategy_logintoken", $_GET["token"], time()+3600);
		
		header("Location: https://www.enthix.net/meid/blablabla");
		
		

	} else if(isset($_GET["meid"])){
		$ch = curl_init();

		$meid_api_request = "https://www.enthix.net/meid/api/v1/getUser.php?client_secret=dfsafdghfgdhrfsdfhfgutcdserdgdsfgfgdftereradsdfhfgnbvcvc&access_token=" . $_COOKIE["Creo_MeID_Token"];

		curl_setopt($ch, CURLOPT_URL, $meid_api_request);
		curl_setopt($ch, CURLOPT_HEADER, 0);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
		$meid_api_raw_data = curl_exec($ch);
		$meid_api_data = json_decode($meid_api_raw_data);
		$info = curl_getinfo($ch);


		if($info['http_code'] !== 200) {
			
			echo "ERROR: WE could not log you in because of a server error.<br>Please contact us!";
			exit;
		}
	
	}
?>
