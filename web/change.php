<?php 
$channel = $_POST["channel"];
$color = $_POST["color"];
$com = "echo ".$color.$channel."> /dev/arduino";
//echo "$channel: $color"
$output1 = shell_exec($com)
?>