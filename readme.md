# Generell Info

### Moduler brukt
express, express-session, bcrypt, better-sqlite3

### setup.js
I setup.js står kode som kjøres i starten av de fleste express prosjekt

### app.js
app.js er hovedprogrammet. Start app.js med kommandoen ```node .\app.js```

### database
Prosjektet better-sqlite3.  
Viss koden kjøres på Azure, brukes databasen i minne, og
lagres periodisk til fil.


## For å komme igang
- Installer node herfra: https://nodejs.org/en/

- Kjør følgende kommando for å få alle pakkene-du trenger:
```npm install```

- Grafisk brukergrensesnitt til databasen (database.db):
https://sqlitestudio.pl/

- Data-base-plugin til Visual Studio:
https://marketplace.visualstudio.com/items?itemName=alexcvzz.vscode-sqlite