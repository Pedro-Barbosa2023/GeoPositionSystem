#include <SoftwareSerial.h>
#include <TinyGPS.h>

TinyGPS gps;
SoftwareSerial gpsSerial(3, 4); // RX, TX

String GetGPSData(){

  Serial.println("Inicializando serial do GPS");
  gpsSerial.begin(9600);

  bool newData = false;
  String Data = "";
  /*unsigned long chars;
  unsigned short sentences, failed;*/

  // For one second we parse GPS data and report some key values
  for (unsigned long start = millis(); millis() - start < 1000;)
  {
    while (gpsSerial.available())
    {
      char c = gpsSerial.read();
      // Serial.write(c); // uncomment this line if you want to see the GPS data flowing
      if (gps.encode(c)) // Did a new valid sentence come in?
        newData = true;
    }
  }

  if (newData)
  {
    float flat, flon;
    unsigned long age;
    gps.f_get_position(&flat, &flon, &age);

    float _flat = (flat == TinyGPS::GPS_INVALID_F_ANGLE ? 0.0 : flat, 6);
    float _flon = (flon == TinyGPS::GPS_INVALID_F_ANGLE ? 0.0 : flon, 6);
    float _sat = (gps.satellites() == TinyGPS::GPS_INVALID_SATELLITES ? 0 : gps.satellites());
    float _prec = (gps.hdop() == TinyGPS::GPS_INVALID_HDOP ? 0 : gps.hdop());

    Data = "{";

    Data += "\"LAT\":\"" + String(_flat) + "\",";

    Data += "\"LON\":\"" + String(_flon) + "\"";

    Data += "\"SAT\":\"" + String(_sat) + "\"";

    Data += "\"PREC\":\"" + String(_prec) + "\"";
      
    Data += "}";

    Serial.println(Data);

  }
  //For debug purposes:
  else{ 
    unsigned long chars;
    unsigned short sentences, failed;
    gps.stats(&chars, &sentences, &failed);
    Serial.print(" CHARS=");
    Serial.print(chars);
    Serial.print(" SENTENCES=");
    Serial.print(sentences);
    Serial.print(" CSUM ERR=");
    Serial.println(failed);
    if (chars == 0)
      Serial.println("** No characters received from GPS: check wiring **");
  }

  return Data;

}