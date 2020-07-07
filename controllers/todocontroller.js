var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//connect to the database
mongoose.connect('mongodb://test:test@cluster0-shard-00-00-51dvf.mongodb.net:27017,cluster0-shard-00-01-51dvf.mongodb.net:27017,cluster0-shard-00-02-51dvf.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });

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