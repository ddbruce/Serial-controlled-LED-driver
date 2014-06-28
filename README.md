Serial-controlled-LED-driver
============================

Similar to the LED-Driver repo that already exists, using code from @ethanspitz's PolyDriverBoard


#####Note: The code I've written, specifically for web, uses [Chromoselector](http://chromoselector.com/). I have not included the necessary files in this repo. You can modify this code to suit your needs, or go over to their site and purchase a license.

I used an Arduino Nano (ATMega 328) and a Raspberry Pi Model B. The devices were connected using a standard micro USB cable. To connect and make sure the PHP code works:

1. Use `lsusb` to find the Arduino vendor ID and product ID. Mine were 0403 and 6001, respectively.
2. Make a new udev rule by doing `nano /etc/udev/rules.d/50-arduino.rules`.
  * `SUBSYSTEMS=="usb", ATTRS{idVendor}=="0403", ATTRS{idProduct}=="6001", SYMLINK+="arduino"` (Change the vendor and product IDs if needed.)
3. Reload udev rules with `udevadm control --reload-rules`