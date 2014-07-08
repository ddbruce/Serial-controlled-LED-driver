<?php 
$settings = $_POST["settings"];
file_put_contents("data/settings.js", $settings);
echo "worked";
?>
