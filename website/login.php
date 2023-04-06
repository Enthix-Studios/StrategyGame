<?php
	
	$page_title_color = 0;
	$page_title_name = "NONE";
	$page_description = "NONE";
	
	if (isset($_GET["token"])) {
		if (ctype_xdigit($_GET["token"]) || strlen($_GET["token"]) == 32) {
			setcookie("strategy_logintoken", $_GET["token"], time()+3600);
		
			header("Location: https://www.enthix.net/meid/oauth/index.php?client_id=3242323523556224");
			exit;
		}
		
		
		$page_title_name = "Error: Invailid Request";
		$page_title_color = 1;
		$page_description = "There was an issue while trying to communicate with the server.";
	

	} else if (isset($_GET["access_code"]) && isset($_GET["expiry"]) && isset($_GET["user_id"])) {
	
	
		$ch = curl_init();
		$ch2 = curl_init();
		$meid_api_request = "https://www.enthix.net/meid/api/v1/getUser.php?client_secret=kjfsdghirekjbscvurelamdbgroirghjjalldlifisinnnnewwerwka&access_token=" . $_GET["access_code"];

		curl_setopt($ch, CURLOPT_URL, $meid_api_request);
		curl_setopt($ch, CURLOPT_HEADER, 0);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
		$meid_api_raw_data = curl_exec($ch);
		$meid_api_data = json_decode($meid_api_raw_data);
		$info = curl_getinfo($ch);

		$login_token = preg_replace('/[[:^print:]]/', '', $_COOKIE["strategy_logintoken"]);
		$server_api = "http://localhost:25555/" . $login_token;

		
		curl_setopt($ch2, CURLOPT_URL, $server_api);
		curl_setopt($ch2, CURLOPT_HEADER, 0);
		curl_setopt($ch2, CURLOPT_RETURNTRANSFER, true);
		curl_exec($ch2);


		if ($info['http_code'] !== 200) {
			
			$page_title_name = "Error: Failed to login";
			$page_title_color = 1;
			$page_description = "We couldn't log you in because of an internal server error.<br>Please contact us!";
		}
		
		$page_title_name = "Success";
		$page_description = "You have successfully been authenticated, you can now open your game.";
	} else {
		$page_title_name = "Error: Invailid Request";
		$page_title_color = 1;
		$page_description = "You need to login by clicking on the MeID button in game.";

	}
?>
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />

		<title><?php echo $page_title_name; ?></title>
		<style>
			h1{
				<?php
					if ($page_title_color == 0) {
						echo "background: linear-gradient(#00FFB7, #f440);";
					} else {
						echo "background: linear-gradient(#f44f, #f440);";
					} 
				?>
				-webkit-background-clip: text;
			}
			
		</style>
		<link href="./assets/css/style_login.css" rel="stylesheet" />
	
	</head>
	<body>

		<div>
			<h1>
				<?php echo $page_title_name; ?>
			</h1>

			<p><?php echo $page_description; ?></p>
		</div>

	</body>
</html>