const express = require('express');
const mustacheExpress = require('mustache-express');
const bodyParser = require('body-parser');
var app = express();
const expressValidator = require('express-validator');
let listOfTodos = [];

app.engine('mustache',mustacheExpress());
app.set('views',__dirname + '/views');
app.set('view engine', 'mustache');

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(expressValidator());

app.get("/", function (req, res) {
  res.render('todo', { todos: listOfTodos});
});
app.post("/", function (req, res) {
  let id = parseInt(Math.random() * 1000);
  newTodoObject = { text: req.body.todo, id: id}
  listOfTodos.push(newTodoObject);
  res.redirect('/');
});

app.post('/mark-complete/:id', function(req, res) {
  let idOfTheTodoThatImMarkingComplete = parseInt(req.params.id);
  let completeTodo = listOfTodos.find(function (todo) {
    return todo.id === idOfTheTodoThatImMarkingComplete
  });
  completeTodo.complete = true
  res.redirect('/');

});
app.post('/', function(req, res) {
  var schema = {
    'name': {
      notEmpty: true,
      isLength: {
        options: [{ min: 2 }],
        errorMessage: ' must be longer than 2 characters'
      },
      errorMessage: 'Invalid Entry'
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
  console.log('Server is up.');
});
