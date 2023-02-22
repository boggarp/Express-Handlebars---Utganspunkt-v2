const fs = require('fs')
const path = require('path')
const express = require('express')
const hbs = require('hbs')
const session = require('express-session')


//Starter opp express, og skrur på public-mappen
const app = express()
const publicDirectoryPath = path.join(__dirname, "/public")
app.use(express.static(publicDirectoryPath))

//Bruker urlencoded-middleware, for å la oss få tilgang til request.body i post-forms
app.use(express.urlencoded({ extended: true }));

//Legger til Handlebars for å få til Server Side Rendering
const viewPath = path.join(__dirname, "/views/pages")
const partialsPath = path.join(__dirname, "/views/partials")
app.set("view engine", hbs)
app.set('views',viewPath)
hbs.registerPartials(partialsPath)

//Sessions
//Bruker express-session til å lagre informasjon på server om besøkende
//som for eksempel-login-state
app.use(session( {
    secret: "LangTekstSomSkalHoldesHemmelig",
    resave: false,
    saveUninitialized : false
}))

//Database
const sqlite3 = require('better-sqlite3')
let db;
if (process.env.WEB_SITE_NAME) { //Running on Azure, . 
    console.log("Running on Azure, using Db in memory, saving periodicly")
    db = loadDbToMemory('database.db') //Use DB in Memory
    saveDb('database.db',15,true) //Save database to file periodicly
} else { //Running Local
    console.log("Not Running on Azure, using Db in filemode")
    db = sqlite3('database.db', {verbose:console.log})
}

exports.app = app
exports.db = db


////////////////////////////////////////////////////////////////////////////////
///                                 Funksjoner                               ///
///  1 - loadDbToMemory: Last database til minne, og bruk den derfil         ///
///  2 - saveDb        : Lagre database fra minne til fil, mulighet for      ///
///                      å gjøre det automatisk hvert 15min f.eks            ///
////////////////////////////////////////////////////////////////////////////////

/**
 * Laster en SQLite-database fra en fil inn i minnet.
 * @param {string} db_filename - Navnet på SQLite-databasefilen som skal lastes.
 * @returns {object} Databasen som nå er i minnet.
 */
function loadDbToMemory(db_filename) {
	//Database
	const databaseStoragePath = path.join(__dirname, db_filename);

	console.log(`Loading database from file: ${databaseStoragePath}`);

	const fileDb = new sqlite3(databaseStoragePath);
	const buffer = fileDb.serialize();
	const db = new sqlite3(buffer, { verbose: console.log });
	fileDb.close();
	return db;
}

/**
 * Lagrer en database i minnet til en fil på disken. 
 * Hvis det er angitt, vil funksjonen også ta automatisk backup av databasen med en valgfri tidsintervall.
 *
 * @param {string} db_filename        - Filnavn for å lagre databasen
 * @param {int} backupIntervalMinutes - Tidsintervall i minutter for automatisk backup. 
 *                                      Standard er 0 (ingen backup).
 *                                      
 * @param {boolean} onlySchedule      - Hvis satt til true, vil funksjonen kun planlegge backup uten 
 *                                      å faktisk lagre databasen. Standard er false (lagrer databasen).
 * @returns {boolean}                 - Returnerer true hvis lagringen var vellykket, false ellers.
 */
function saveDb(db_filename, backupIntervalMinutes = 0, onlySchedule = false) {
	let IsSuccess = false;

	if (!onlySchedule) {
		console.log(`Saving in-memory database to file: ${db_filename}`);
		const databaseStoragePath = path.join(__dirname, db_filename);
		const buffer = db.serialize();
		try {
			fs.writeFileSync(databaseStoragePath, buffer);
			console.log(`Database written to: ${db_filename}`);
			IsSuccess = true;
		} catch (err) {
			console.error(err);
			IsSuccess = false;
		}
	}
	if (backupIntervalMinutes > 0)
		setTimeout(
			() => saveDb(db_filename, backupIntervalMinutes),
			backupIntervalMinutes * 60 * 1000
		);
	return IsSuccess;
}
