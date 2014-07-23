<?php 

/*
Copyright (c) 2014  Daniel D. Bruce

This file is part of serialledcontrol.

This program is free software; you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation; either version 2 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License along
with this program; if not, write to the Free Software Foundation, Inc.,
51 Franklin Street, Fifth Floor, Boston, MA 02110-1301 USA.

The developer can be found at:
  daniel@danieldbruce.com

If that doesn't work, contact the Rensselaer Union
Administration office and ask. Chances are they'll have a
good idea as to where the developer went. Note that no
association with Rensselaer Polytechnic Institute shall
construe any copyright obligations to Rensselaer.
*/

$colors = $_POST["colors"];
$com0 = 'echo "'.substr($colors,0,7).'" > /dev/arduino';
$com1 = 'echo "'.substr($colors,7,7).'" > /dev/arduino';
$com2 = 'echo "'.substr($colors,14,7).'" > /dev/arduino';
$com3 = 'echo "'.substr($colors,21,7).'" > /dev/arduino';
$com4 = 'echo "'.substr($colors,28,7).'" > /dev/arduino';
$output0 = shell_exec($com0);
$output1 = shell_exec($com1);
$output2 = shell_exec($com2);
$output3 = shell_exec($com3);
$output4 = shell_exec($com4);
file_put_contents("data/state.js", '{"state":"on"}')
?>
