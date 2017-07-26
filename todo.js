const express = require('express');
const mustacheExpress = require('mustache-express');
const bodyParser = require('body-parser');
var app = express();
const expressValidator = require('express-validator');
const todos = ["Wash the car"];

app.engine('mustache',mustacheExpress());
app.set('views','./views');
app.set('view engine', 'mustache');

app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use(expressValidator());

app.get("/", function (req, res) {
  res.render('todo', { todos: todos });
});

app.post("/", function (req, res) {
  todos.push(req.body.todo);
  res.redirect('/');
})



app.get('/', function(req,res) {
  res.render('todo');
});

app.post('/', function(req, res) {
  var schema = {
    'name': {
      notEmpty: true,
      isLength: {
        options: [{ min: 100 }],
        errorMessage: 'Name must not be longer than 100 characters'
      },
      errorMessage: 'Invalid Name'
    }
  };
  req.assert(schema);
  req.getValidationResult().then(function(result) {
    if (result.isEmpty()) {
      res.render('answers', { answers: req.body });
    } else {
      res.render('todo', { errors: result.array() });
    }
  });
});

app.listen(3000, function() {
  console.log('GOTCHU A SERVER UP');
});
