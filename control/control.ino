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
  
 /*
  *
  * Note: You can tell the difference between Dan and Ethan's code because Dan rarely comments.
  * If you see a bunch of code without comments, it's most likely Dan's.
  *
  * "If it's hard to write, it should be hard to understand."
  *                                    -Jonathan M. Bruce
  *
  */

#include <Wire.h>
#include <ctype.h>

volatile int mode = 0; // current mode
int button = 2; // pin of button
volatile bool bP = false; // button pressed flag to exit current modes
 
int potValue = 0; // value of pot
volatile bool sevSegOff = true;

// values used for mode set/buttton debouncing
volatile long modeSetTime = 0;
  
// buffer for serial input
#define BUFFER_SIZE 7
char hexch[BUFFER_SIZE];
char serial_buffer[BUFFER_SIZE];
int serial_buffer_ptr;

// definition of registers on the pwm chip
#define LED0_ON_L 0x6
#define LED0_ON_H 0x7
#define LED0_OFF_L 0x8
#define LED0_OFF_H 0x9

#define PWM_ADDR 0x40 //address of the PWM chip

void setup(){
  Serial.begin(9600);
  Wire.begin();
  setConfiguration();
  serial_buffer_ptr = 0;
}

void loop(){  
  char ch;
  int i;
  
  if (Serial.available() > 0)  {
    ch = Serial.read();
    
    if (ch == '\n' || ch == '\r') {
      /* straighten out the circular buffer */
      for (i = 0; i < BUFFER_SIZE; i++) {
        hexch[i] = serial_buffer[serial_buffer_ptr];
        serial_buffer_ptr++;
        if (serial_buffer_ptr == BUFFER_SIZE) {
          serial_buffer_ptr = 0;
        }
      }
      
      /* parse the last seven characters received */
      parse(hexch);
    } else if (isxdigit(ch)) {
      /* store received character in circular buffer */
      serial_buffer[serial_buffer_ptr] = ch;
      serial_buffer_ptr++;
      if (serial_buffer_ptr == BUFFER_SIZE) {
        serial_buffer_ptr = 0;
      }
    }
  }
}

void parse(char* hexch) {
  int r, g, b, ch;
  r = (16 * hex2int(hexch[0])) + hex2int(hexch[1]);
  g = (16 * hex2int(hexch[2])) + hex2int(hexch[3]);
  b = (16 * hex2int(hexch[4])) + hex2int(hexch[5]);
  ch = ((int)hexch[6])-48;
  change(r,g,b,ch);
}

int hex2int(char x) {
  switch (x) {
    case 'a':
    case 'A':
      return 10;
    case 'b':
    case 'B':
      return 11;
    case 'c':
    case 'C':
      return 12;
    case 'd':
    case 'D':
      return 13;
    case 'e':
    case 'E':
      return 14;
    case 'f':
    case 'F':
      return 15;
    default:
      return ((int)x)-48;
  }
}

void change(int r, int g, int b, int ch) {
  setPWM(ch*3,r*16);
  setPWM(ch*3+1,g*16);
  setPWM(ch*3+2,b*16);
  
  //testing code:
  //Serial.print("Set R to " + String(r) + ", G to " + String(g) + ", and B to " + String(b) + " on channel "  + String(ch) + ".\n");
}

/*
 * setPWM brightness on channel given over I2C
 */
void setPWM(int channel, uint16_t brightness)
{
  if (channel >= 7) channel += 1;
  Wire.beginTransmission(PWM_ADDR);
  Wire.write(LED0_ON_L+4*channel);
  Wire.write(0x00); //turn the LED on at 0
  Wire.write(0x00); //turn the LED on at 0
  
  //turn the LED off when it hits this value (out of 4095)
  Wire.write(brightness); //first four LSB
  Wire.write(brightness>>8); //last four MSB
  Wire.endTransmission();
}


/*
 * Configure the PWM chip for easy suage and external MOSFET drive
 */
void setConfiguration()
{
  Wire.beginTransmission(PWM_ADDR);
  Wire.write(0x00); //enter Mode 1 Register
  Wire.write(0xa1); //enable ocsillator and auto-increment register and restart
  Wire.endTransmission();
  delayMicroseconds(500);//500us delay required after reset
  Wire.beginTransmission(PWM_ADDR);
  Wire.write(0x01); //enter Mode 2 Register
  Wire.write(0x04); //set drive mode for external MOSFETS 
  Wire.endTransmission();
}
