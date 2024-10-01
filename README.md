# Semesterprojekt GIS WS24: StudyTime Web-Version
## Autor
Daniel Benjamin Georg (277 055)  

## Projektidee
Eine Web-Version basiert auf ein vorherigen Projekt namens [StudyTime](https://github.com/SootDan/StudyTime). Das Projekt ist komplett neu geschrieben.  
Die App wird benutzt zum Produktivitaetsmanagement eines Studiensemesters. Man kann eine Deadline setzen. Setzt man eine Deadline, wird einem vorgegeben, wie viele Stunden pro Tag/Woche/Monat noch gelernt werden muss. Die Statistiken richten sich am SPO.  
Es wird gerechnet, wie viel Lernzeit dieses Semester noch benoetigt wird. Man kann aus mehreren SQL-Datenbanken auswaehlen; sie sind passwortgeschuetzt, damit andere User nicht die Daten von anderen veraendern koennen.  
Man darf die Sprache entweder auf Deutsch oder Englisch setzen; die Settings werden in einem Cookie gespeichert.  

## User Experience
Am Anfang waehlt der User eine Sprache aus. Diese wird als Cookie gespeichert, aber kann wieder geaendert werden.  
![Der Splashscreen](Assets/StartScreen.png)    

Der Einfachheit wegen werden die Skizzen nur noch in der deutschen Sprache erscheinen; die englische Sprache ist weiterhin eine Moeglichkeit.  
Nach Auswahl der Sprache wird man in eine Art Login-Screen weitergeleitet. Jedoch speichert StudyTime keine Accounts, sondern passwortgeschuetzte Datenbanken.  
![Der Loginscreen](Assets/LoginScreen.png)  
Oben rechts kann mit einem Klick auf das Zahnrad die Sprache angepasst werden.    

Klickt der User auf den unteren Link ("eine Datenbank."), wird dieser auf eine Art Datenbankregistrierung weitergeleitet. Es wird nach einem Datenbanknamen und einem Passwort gefragt. Es wird validiert, ob eine Datenbank mit diesem Namen schon existiert (in dem Fall wird die Checkbox rot) und ob sie ueber 12 oder unter 3 Zeichen lang ist. Ebenso wird validiert, ob die Passwoerter ueber 4 und unter 16 Zeichen lang und identisch sind. Die Passwoerter werden verschluesselt in einer fuer User unzugaengliche Datenbank gespeichert. Eventuell koennen diese mit RegEx auf illegale Zeichen ueberprueft werden. 
Nach diesem Prozess wird der User auf den Login-Screen weitergeleitet, wo dieser nun seine gewaehlten Daten eingeben kann.  
