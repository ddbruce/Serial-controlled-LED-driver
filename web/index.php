<?php
	if(substr($_SERVER['REMOTE_ADDR'],0,10) != "192.168.1.") {
		echo $_SERVER['REMOTE_ADDR'].": ";
		die("Yeah, right.");
	}
		include 'index.html';
?>
