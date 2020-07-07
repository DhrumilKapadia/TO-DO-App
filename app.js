var express = require('express');
var todocontroller = require('./controllers/todocontroller');

var app = express();

//set up template engine
app.set('view engine', 'ejs');


//static files
app.use(express.static('./public'));

//firecontroler
todocontroller(app);

app.listen(8080);
console.log("you are listening to port 8080");