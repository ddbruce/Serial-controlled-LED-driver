<?php
	if(substr($_SERVER['REMOTE_ADDR'],0,10) != "192.168.1.") {
		echo $_SERVER['REMOTE_ADDR'].": ";
		die("You're not really allowed on this server. Sorry.");
	}
		include 'index.html';
?>
