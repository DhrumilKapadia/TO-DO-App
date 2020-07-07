var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//connect to the database
mongoose.connect('add your mongoDB url', { useNewUrlParser: true, useUnifiedTopology: true });

//create a schema
var todoSchema = new mongoose.Schema({
    item: String
});

var Todo = mongoose.model('Todo', todoSchema);


var urlencodedParser = bodyParser.urlencoded({ extended: false })

module.exports = function(app) {

    app.get('/todo', function(req, res) {
        //get data from mongodb and pass to view
        Todo.find({}, function(err, data) {
            if (err) throw err;
            res.render('todo', { todos: data });
        });
    });

    app.post('/todo', urlencodedParser, function(req, res) {
        //get data from view and add to mongoDB
        var newTodo = new Todo(req.body).save(function(err, data) {
            if (err) throw err;
            res.json(data);
        })

    });

    app.delete('/todo/:item', function(req, res) {

        Todo.deleteOne({ item: req.params.item.replace(/\-/g, "") }, (function(err, data) {
            if (err) throw err;
            res.json(data);
        }));
    });


};
