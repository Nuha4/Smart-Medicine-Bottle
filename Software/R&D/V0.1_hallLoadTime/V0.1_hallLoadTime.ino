#include <HX711.h>
#include <ESP8266WiFi.h>
#include <time.h>

const char* ssid = "DataSoft_WiFi";
const char* password = "support123";

//configure TimeZone
int timezone = 6 * 3600;
int dst = 0;

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
  Serial.println();
  Serial.print("Wifi connecting to ");
  Serial.println( ssid );

  WiFi.begin(ssid,password);

  Serial.println();
  
  Serial.print("Connecting");

  while( WiFi.status() != WL_CONNECTED ){
      delay(500);
      Serial.print(".");        
  }
  
  Serial.println();

  Serial.println("Wifi Connected Success!");
  Serial.print("NodeMCU IP Address : ");
  Serial.println(WiFi.localIP() );

  configTime(timezone, dst, "pool.ntp.org","time.nist.gov");
  Serial.println("\nWaiting for Internet time");

  while(!time(nullptr)){
     Serial.print("*");
     delay(1000);
  }
  Serial.println("\nTime response....OK"); 
}
//===================================================================================
void loop() {

  // read the state of the hall effect sensor:
  hallState = digitalRead(hallPin); 
  
  // Magnet near == LOW
  if (hallState == LOW) {     
    // turn LED OFF:  
    Serial.println("!!! LID ON !!!");  
    digitalWrite(ledPin, LOW);
    delay(10000);  
  } 
  else if (hallState == HIGH) {
    // turn LED ON:
    digitalWrite(ledPin, HIGH);
    Serial.println("!!! LID OFF !!!");

     //loadcell
     float weight = scale.get_units(1);
    //weight = weight + 90;
    Serial.println(String((weight), 2));
    delay(6000);

    time_t now = time(nullptr);
    struct tm* p_tm = localtime(&now);
    String day = String(p_tm->tm_mday);
    String mon = String(p_tm->tm_mon+1);
    String year = String(p_tm->tm_year + 1900);
    String hour = String(p_tm->tm_hour);
    String mint = String(p_tm->tm_min);
    String sec = String(p_tm->tm_sec);
    String curTime = hour+":"+mint+":"+sec;
    String daymon = day+"/"+mon+"/"+year+"  "+curTime;
    Serial.println(daymon);

    Serial.println(String((weight), 2)+" "+daymon);
    
  }

  else {
    digitalWrite(ledPin, LOW);
    Serial.println("---Wait---");
  }

  
  
}
