# Semesterprojekt GIS WS24: StudyTime Web-Version
## Autor
Daniel Benjamin Georg (277 055)  

## Projektidee
Eine Web-Version basiert auf ein vorherigen Projekt namens [StudyTime](https://github.com/SootDan/StudyTime). Das Projekt wird als Web-Applikation mit NodeJS komplett neu geschrieben.  
Die App wird benutzt zum Produktivitätsmanagement eines Studiensemesters. Man kann eine Deadline setzen. Setzt man eine Deadline, wird einem vorgegeben, wie viele Stunden pro Tag/Woche/Monat noch gelernt werden muss. Die Statistiken richten sich am SPO. Man kann jedoch auch eine StudyTime-Datenbank für persönliche Zwecke einsetzen.  
Es wird gerechnet, wie viel Lernzeit dieses Semester noch benötigt wird. Man kann aus mehreren MongoDB-Datenbanken auswählen; sie sind passwortgeschützt, damit andere User nicht die Daten von anderen verändern können.  
Man darf die Sprache entweder auf Deutsch oder Englisch setzen; die Settings werden in einem Cookie gespeichert.  

## User Experience
Am Anfang wählt der User eine Sprache aus. Diese wird als Cookie gespeichert, aber kann wieder geändert werden.  
![Der Splashscreen](Assets/StartScreen.png)    

Der Einfachheit wegen werden die Skizzen nur noch in der deutschen Sprache erscheinen; die englische Sprache ist weiterhin eine Möglichkeit.  
Nach Auswahl der Sprache wird man in eine Art Login-Screen weitergeleitet. Jedoch speichert StudyTime keine Accounts, sondern passwortgeschützte Datenbanken.  
![Der Loginscreen](Assets/LoginScreen.png)  
Oben rechts kann mit einem Klick auf das Zahnrad die Sprache angepasst werden.    

Klickt der User auf den unteren Link *("Datenbank")*, wird dieser auf eine Art Datenbankregistrierung weitergeleitet. Es wird nach einem Datenbanknamen und einem Passwort gefragt. Es wird validiert, ob eine Datenbank mit diesem Namen schon existiert (in dem Fall wird die Checkbox rot) und ob sie über 12 oder unter 3 Zeichen lang ist. Ebenso wird validiert, ob die Passwörter über 4 und unter 16 Zeichen lang und identisch sind. Die Passwörter werden verschlüsselt in einer für User unzugängliche Datenbank gespeichert. Eventuell können diese mittels RegEx auf illegale Zeichen überprüft werden.  
![Eine Datenbank wird erstellt](Assets/CreateDB.png)  
Im Rahmen der Userfreundlichkeit werden diese Kriterien mittels Klick an den blauen Fragezeichen rechts erläutert.  
Nach diesem Prozess wird der User auf den Login-Screen weitergeleitet, wo dieser nun seine gewählten Daten eingeben kann.  

Sobald der User seine Datenbank betritt, werden einem die Statistiken der gewählten Fächer und Interessen gezeigt. Der User kann mit einem Klick auf das jeweilige Fach den Namen und die (evtl. noch nicht vorhandene) Deadline editieren. Ebenso kann der User zusätzliche Zeit hinzufügen.  
![Das Interface](Assets/InterfaceScreen.png)
Wenn der User dies will, zeigt StudyTime auch einen "Streak" an, wie viele Tage er hintereinander gelernt hat.  

## Dokumentation  
StudyTime läuft über TypeScript, und NodeJS (Express/Express-Session, i18n, MongoDB, und Cookie-Parser). Packages werden von package-lock.json mit `npm ci` installiert.  
`npm run build` transpiliert es zu JS; `npm start` startet src/server.ts.  
Ich benutze eslint als Linter mit `npx eslint .` . Es ignoriert dist/.  
MongoDB Server wird mit `sudo systemctl start mongodb.service` gestartet.  

    interface User {
    name: string;
    password: string;
    subjects: Subjects[];
    };

    interface StudyTime {
        time_done: number;
        date: Date;
    };

    export class Subjects {
        name: string;
        time_req: number;
        time_done?: number;
        has_deadline: boolean;
        deadline?: Date;
        study_time?: StudyTime[];  
    }  
Ich fing an, mit Docker zu experimentieren. Ein Container wird erstellt mit `docker-compose up --build -d` und automatisch gestartet. Bei einem Crash restartet der Container einfach.  
Um meine Container zu überwachen, benutze ich `ducker`.  


## Quellen
### Bilder
[Farbenpalette](https://nightpalette.com/)  
[Free Icons](https://iconoir.com/)  
[Flaggen (WhatsApp-Version)](https://emojipedia.org/)  
[StudyTime Logo](https://www.flaticon.com/)    

### Code & Guides
[Google TypeScript Style Guide](https://google.github.io/styleguide/tsguide.html)  
[TS-eslint](https://typescript-eslint.io/)  
[MongoDB](https://www.mongodb.com/resources/languages/express-mongodb-rest-api-tutorial)  
[Containerizing NodeJS with Docker Compose](https://www.digitalocean.com/community/tutorials/containerizing-a-node-js-application-for-development-with-docker-compose#step-5-testing-the-application)  
[Docker / Ducker](https://wiki.archlinux.org/title/Docker)