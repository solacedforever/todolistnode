const express = require('express');
const mustacheExpress = require('mustache-express');
const bodyParser = require('body-parser');
var app = express();
const expressValidator = require('express-validator');

app.engine('mustache',mustacheExpress());
app.set('views','./views');
app.set('view engine', 'mustache');

app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use(expressValidator());

app.get('/', function(req,res) {
  res.render('form');
});
