<?php 
$channel = $_POST["channel"];
$color = $_POST["color"];
$settings = $_POST["settings"];
$com = "echo ".'"'.$color.$channel.'"'."> /dev/arduino";
	//echo "$channel: $color"
$output1 = shell_exec($com);
file_put_contents("data/settings.js", $settings);
?>