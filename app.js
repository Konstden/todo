const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const date = require(__dirname + "/date.js");
const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static('public'))

let items = [];
let workItems = [];
app.get('/', function(req, res) {
  

    let day = date.getDay();

    res.render('list', {
      listTitle: day,
      newListItem: items
    });
    

})

app.post('/', function(req, res) {
  let item = req.body.newItem; 
  
  if (req.body.list === "Work") {
    workItems.push(item);
    res.redirect('/work');
  } else {
    items.push(item);
    res.redirect('/');
  }
});

app.get('/work', function(req, res) {
  res.render('list', {listTitle: "Work List", newListItem: workItems})
})

app.post('/work', function(req, rest) {
  let work = req.body.newItem;
  workItems.push(work); 
  res.redirect('/work');
})

app.get('/about', function(req, res) {
  res.render('about');
})
app.listen(3000, function() {

})

