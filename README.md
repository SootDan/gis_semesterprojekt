# Semesterprojekt GIS WS24: StudyTime Web-Version
## Autor
Daniel Benjamin Georg (277 055)  

## Projektidee
Eine Web-Version basiert auf ein vorherigen Projekt namens [StudyTime](https://github.com/SootDan/StudyTime). Das Projekt ist komplett in JavaScript, HTML, und CSS neugeschrieben.  
Die App wird benutzt zum Produktivitaetsmanagement eines Studiensemesters. Man kann eine Deadline setzen. Setzt man eine Deadline, wird einem vorgegeben, wie viele Stunden pro Tag/Woche/Monat gelernt werden muss. Die Statistiken richten sich am SPO.  
Es wird gerechnet, wie viel Lernzeit dieses Semester noch benoetigt wird. Man kann aus mehreren SQL-Datenbanken auswaehlen; sie sind passwortgeschuetzt, damit andere User nicht die Daten von anderen veraendern koennen.  
Man darf die Sprache entweder in Deutsch oder Englisch setzen; die Settings werden in einer json-File gespeichert.  

## User Experience
Am Anfang waehlt der User eine Sprache aus. Diese wird als Cookie gespeichert, aber kann wieder geaendert werden.  
![Der Splashscreen](Assets/StartScreen.png)  