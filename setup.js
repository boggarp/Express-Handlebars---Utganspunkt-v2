const fs = require('fs')
const path = require('path')
const express = require('express')
const hbs = require('hbs')

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

exports.app = app