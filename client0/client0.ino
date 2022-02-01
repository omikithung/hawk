
#include <DHT.h>

#include <ArduinoJson.h>
#include <WebSocketClient.h>
#include <ESP8266WiFi.h>


WiFiClient client;
WebSocketClient wsClient;
void wsConnect();

const char* ssid = "Radioactive";
const char* password = "1234554321";
char* host = "192.168.43.168";
const int port = 3000;
boolean handshakeStatus = 0;
char* path = "/u/devices";
String data;

#define ldr A0
#define light1 D4
#define light2 10
#define DHTTYPE DHT11
#define temphum D1

DHT dht(temphum, DHT11);

long holdTime = 0, holdTimeTH = 0, holdTimeLdr = 0;
long startTime, startTimeLdr, startTimeTH;
long delayTime = 20, delayTimeLdr=500, delayTimeTH=2500;

void setup() {
  Serial.begin(115200);
  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid,password);
  while(WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.print(".");
  }
  Serial.println("Connected to WiFi: ");
  Serial.println(ssid);
  Serial.println("nodeMCU has Ip address: ");
  Serial.println(WiFi.localIP());
  delay(1000);
  wsConnect();

  pinMode(ldr,INPUT);
  pinMode(light1,OUTPUT);
  pinMode(light2,OUTPUT);
  
}

void wsConnect() {
  if(client.connect(host,port)){
    Serial.println("connected to Host SUCCESSFUL!");
  }
  else {
    Serial.println("connection to Host FAILED!");
    delay(1000);
//    if(handshakeStatus) {
//      handshakeStatus = 0;
//      ESP.restart();
//    }
//    handshakeStatus = 1;
  }
  //handshake with server
  wsClient.path = path;
  wsClient.host = host;
  //ws communication happens over http client
  if(wsClient.handshake(client)) {
    Serial.println("Handshake Successful.");
  }
  else {
    Serial.println("Handshake failed.");
    delay(5000);
//    if(handshakeStatus) {
//      handshakeStatus = 0;
//      ESP.restart();
//    }
//    else {
//      handshakeStatus = 1;
//    }
  }
}
int initial = 1;

void loop() {
  
  if (client.connected()) { 
    if (abs(startTime - holdTime) >= delayTime) {
      holdTime = startTime;
      //read light
      int readLight1 = digitalRead(light1);
      int readLight2 = digitalRead(light2);
      String lightData = "{\"light1\":";
             lightData += readLight1;
             lightData += ",\"light2\":";
             lightData += readLight2; 
             lightData += "}";
//      Serial.println(lightData);
      wsClient.sendData(lightData);//send sensor data to websocket
    }
    
    //read ldr  at specific time 
    startTimeLdr = millis();  
    if (abs(startTimeLdr - holdTimeLdr) >= delayTimeLdr) {
      holdTimeLdr = startTimeLdr;
      int readLdr = analogRead(ldr);
      String ldrData = "{\"ldr\":";
             ldrData += readLdr;  
             ldrData += "}";
      //Serial.println(ldrData);
      wsClient.sendData(ldrData);//send sensor data to websocket 
    }  
   
    //read temp and hum. executes every after 2.5 secs
    startTimeTH = millis();
    if (abs(startTimeTH - holdTimeTH) >= delayTimeTH) {
      holdTimeTH = startTimeTH;
      //delay(500);
      // Reading temperature or humidity takes about 250 milliseconds!
      // Sensor readings may also be up to 2 seconds 'old' (its a very slow sensor)
      float h = dht.readHumidity();
      // Read temperature as Celsius (the default)
      float t = dht.readTemperature();
      if (isnan(h) || isnan(t)) {
        Serial.println(F("Failed to read from DHT sensor!"));
        return;
      } 
      String thData = "{\"temp\":";
             thData += t;
             thData += ",\"hum\":";
             thData += h;   
             thData += "}";
     //Serial.println(thData);
     wsClient.sendData(thData);//send sensor data to websocket server
   }
    
    wsClient.getData(data);    
    if (data.length() > 0) {
//      Serial.println(data);
      DynamicJsonDocument dataJson(200);
      DeserializationError error = deserializeJson(dataJson,data);
      if(error) {
        Serial.println("deserialization of JSON failed:");
        Serial.println(error.c_str());
        return;
      }
      //use string instead of character array
      if(dataJson["light1"]==1) {
        digitalWrite(light1,HIGH);
      }
      if(dataJson["light1"]==0){
        digitalWrite(light1,LOW);
      }  
      if(dataJson["light2"]==1) {
        digitalWrite(light2,HIGH);
      }
      if(dataJson["light2"]==0){
        digitalWrite(light2,LOW);
      } 
    }
  }
}
