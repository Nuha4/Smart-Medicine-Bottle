#include <HX711.h>
// Scale Settings
const int SCALE_DOUT_PIN = D2;
const int SCALE_SCK_PIN = D3;
// constants won't change. They're used here to set pin numbers:
const int hallPin = D0;     // the number of the hall effect sensor pin
const int ledPin =  D7;     // the number of the LED pin
// variables will change:
int hallState = 0;          // variable for reading the hall sensor status

HX711 scale(SCALE_DOUT_PIN, SCALE_SCK_PIN);

void setup() {
  Serial.begin(115200);
  scale.set_scale(2230);// <- set here calibration factor!!!
  scale.tare();
  // initialize the LED pin as an output:
  pinMode(ledPin, OUTPUT);      
  // initialize the hall effect sensor pin as an input:
  pinMode(hallPin, INPUT); 
}

void HallEffect(){
  hallState = digitalRead(hallPin);   // read the state of the hall effect sensor:
  // Magnet near == LOW
  if (hallState == LOW) {     
    // turn LED on:  
    Serial.println("!!! LID ON !!!");  
    digitalWrite(ledPin, LOW);  
  } 
  else if (hallState == HIGH) {
    // turn LED off:
    digitalWrite(ledPin, HIGH);
    Serial.println("!!! LID OFF !!!");
    LoadCell(); // Call LoadCell function
  }
}

void LoadCell(){
    float weight = scale.get_units(1); //loadcell
    //weight = weight + 90;
    Serial.println(String((weight), 5));
    delay(5000);
}

void loop() {
  HallEffect(); // Call HallEffect function
}
