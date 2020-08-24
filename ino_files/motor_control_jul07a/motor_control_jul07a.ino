#include <SoftwareSerial.h>



//bluetooth
SoftwareSerial hc06(2,3);
char data_hc06;
String cmd;


//Distance Sensor
int sensorpin = A0;                
int val = 0;


//Motor controler
 

int enA = 5;
int enB = 6;
int In1 = 10;
int In2 = 11;
int In3 = 12;
int In4 = 13;




void setup() {
  
  Serial.begin(9600);
  hc06.begin(57600);
  pinMode(enA, OUTPUT);
  pinMode(In1, OUTPUT);
  pinMode(In2, OUTPUT);

  digitalWrite(In1, LOW);
  digitalWrite(In2, LOW);
  analogWrite(enA, 0);

  cmd = "";
               
}
 
void loop(){
  
  
  val = analogRead(sensorpin);
  float volts = val*5/1024;
  int distance = 13*pow(volts, -1);

  if (val > 500 ){
    analogWrite(enA, 0);
    Serial.println(val);
    
  }

   

  if(hc06.available()){

    data_hc06 = hc06.read();

    /*
    if(Serial.available()){
    Serial.print("Data received: ");
    Serial.println(data_hc06);
    }*/

    if ( data_hc06 == 'f'){
      analogWrite(enA, 255);
      analogWrite(enB, 255);
      digitalWrite(In1, HIGH);
      digitalWrite(In2, LOW);
      digitalWrite(In3, HIGH);
      digitalWrite(In4, LOW);
      
      Serial.print("Command recieved : ");
      Serial.println(data_hc06);
      Serial.write(data_hc06);
      Serial.println(val);
      
    }

    if ( data_hc06 == 'b'){
      analogWrite(enA, 255);
      analogWrite(enB, 255);
      digitalWrite(In1, LOW);
      digitalWrite(In2, HIGH);
      digitalWrite(In3, LOW);
      digitalWrite(In4, HIGH);
      Serial.print("Command recieved : ");
      Serial.println(data_hc06);
      Serial.write(data_hc06);
    }

    if ( data_hc06 == 's'){
      analogWrite(enA, 0);
      analogWrite(enB, 0);
      digitalWrite(In1, LOW);
      digitalWrite(In2, LOW);
      digitalWrite(In3, LOW);
      digitalWrite(In4, LOW);
      Serial.print("Command recieved : ");
      Serial.println(data_hc06);
      Serial.write(data_hc06);
    }

    if ( data_hc06 == 'l'){
      analogWrite(enB, 0);
      digitalWrite(In1, LOW);
      digitalWrite(In2, LOW);
      Serial.print("Command recieved : ");
      Serial.println(data_hc06);
      Serial.write(data_hc06);
    }
  
}
    
  
  
 
}
