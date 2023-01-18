const setup = require('./setup.js')
const app = setup.app
const db = setup.db

//Handler fremsiden
app.get('', (request,response) => {
    response.render("index.hbs", {
        title: "Tittelen", 
        table: ["A","B","C"]})
})

//Handler about-siden
app.get('/about', (request,response) => {
    response.render("about.hbs", {title: "About"})
})

//Handler for html-skjema med action /sendInn og method post
app.post('/sendInn', (request,response) => {
    console.log(request.body)
})

//Starter opp applikasjonen
app.listen(3000, function() { 
    console.log("Server is up! Check http://localhost:3000")
})