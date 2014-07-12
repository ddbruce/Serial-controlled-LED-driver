<?php
for ($x = 0; x < 5; x++) {
	$com = "echo ".'"'."000000".$x." > /dev/arduino";
	$output = shell_exec($com);
}
?>