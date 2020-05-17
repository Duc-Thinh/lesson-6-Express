// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require("express");
const app = express();
var low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('./db.json')
const bodyParser = require('body-parser')
const db = low(adapter);

var todoList =[]

db.defaults({ todoList: [] }).write();
app.use(bodyParser.json()) 
app.use(bodyParser.urlencoded({ extended: true })) 
app.set('views engine', 'pug');
app.set('views', './views');
app.get('/', function(req,res){
    res.render('./index.pug',{
        todoList: db.get('todoList').value()
    });
});
app.get('/todos', function(req,res){   
    var q = req.query.q
    if (q){
        var matchedTodo = todoList.filter(function(){
            return db.get('todoList').find(name).value().toLowerCase().indexOf(q.toLowerCase()) !== -1    
        })
    } else {
        matchedTodo = todoList   
    }
    res.render('./index.pug',{
        todoList: matchedTodo
    })
})
app.get('/todos/create',function(req,res){
    res.render('./create.pug')    
})
app.post('/todos/create', function(req,res){
  db.get("todoList").push(req.body).write()
  res.render('./index.pug',{todoList:db.get("todoList").value()});
  res.redirect('/todos')
})

// listen for requests :)
app.listen(process.env.PORT, () => {
  console.log("Server listening on port " + process.env.PORT);
});
