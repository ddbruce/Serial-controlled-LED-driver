/* A serial-controlled LED driver, based off ethanspitz's PolyDriverBoard.
 *
 * Copyright 2014 Dan Bruce. Portions copyright 2014 Ethan Spitz.
 * 
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 */

void setup(){
  Serial.begin(9600);
}

void loop(){
  String hexch = ""
  char character;
  if (Serial.available())  {
     character = Serial.read();
     hexch.concat(character);
     parse(hexch);
  }
}

void parse(String hexch) {
  int r, g, b, ch;
  r = (15 * hex2int(hexch.substring(0,1))) + hex2int(hexch.substring(1,2));
  g = (15 * hex2int(hexch.substring(2,3))) + hex2int(hexch.substring(3,4));
  b = (15 * hex2int(hexch.substring(4,5))) + hex2int(hexch.substring(5,6));
  ch = (int)hexch.substring(6,7);
}

int hex2int(char x) {
  switch (x) {
    case a:
      return 10;
    case b:
      return 11;
    case c:
      return 12;
    case d:
      return 13;
    case e:
      return 14;
    case f:
      return 15;
    default:
      return (int)x;
  }
}
