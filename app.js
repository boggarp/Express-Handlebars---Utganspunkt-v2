const setup = require('./setup.js')
const app = setup.app

//Handler fremsiden
// -- Old way: --
    //function hovedSideRute(request, response){
    //    response.render("index.hbs")
    //}
    //app.get('',hovedSideRute)
// -- New way: -- 
app.get('', (request,response) => {
    response.render("index.hbs", {title: "Tittelen"})
})

//Handler about-siden

//Handler for Innput - skjema

//Starter opp applikasjonen
app.listen(3000, function() { 
    console.log("Server is up! Check http://localhost:3000")
})