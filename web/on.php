<?php 
$colors = $_POST["colors"];
$com0 = 'echo "'.substr($colors,0,7).'" > /dev/arduino';
$com1 = 'echo "'.substr($colors,7,7).'" > /dev/arduino';
$com2 = 'echo "'.substr($colors,14,7).'" > /dev/arduino';
$com3 = 'echo "'.substr($colors,21,7).'" > /dev/arduino';
$com4 = 'echo "'.substr($colors,28,7).'" > /dev/arduino';
$output0 = shell_exec($com0);
usleep(10000);
$output1 = shell_exec($com1);
usleep(10000);
$output2 = shell_exec($com2);
usleep(10000);
$output3 = shell_exec($com3);
usleep(10000);
$output4 = shell_exec($com4);
usleep(10000);
file_put_contents("data/state.js", '{"state":"on"}')
?>
