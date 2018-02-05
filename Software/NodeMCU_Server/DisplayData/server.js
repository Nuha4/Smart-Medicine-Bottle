const express = require('express');
const app = express();
const bodyParser= require('body-parser');

app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({extended: true}));

var MongoClient = require('mongodb').MongoClient;
MongoClient.connect('mongodb://localhost:27017/MedicineDB', function (err, client) {
  if (err) throw err;

  var db = client.db('MedicineDB');

  db.collection('data_table').findOne({}, function (findErr, result) {
    if (findErr) throw findErr;
    console.log(result);
    //client.close();
  });

  app.get('/', (req, res) => {
     /*var cursor = db.collection('data_table').find();
     console.log(cursor);*/

    //db.collection('data_table').findOne({}, function (findErr, result) {
    db.collection('data_table').find().toArray((err, result) => {
        if (err) throw err;
        console.log(result);
        //client.close();
        res.render('index.ejs', {quotes: result});
    });
    //res.sendFile(__dirname + '/index.html');
  });
});


app.post('/quotes', (req, res) => {
  console.log(req.body) // Take data From Browser
});


//res.render(view, locals)

/*app.post('/data', (req, res) => {
  db.collection('data_table').save(req.body, (err, result) => {
    if (err) return console.log(err)

    console.log('saved to database')
    res.redirect('/')
  })
})*/


/*const MongoClient = require('mongodb').MongoClient;
var db
var url = 'mongodb://localhost:27017/MedicineDB';
MongoClient.connect(url, (err, client) => {
  if (err) return console.log(err)
  db = client.db('MedicineDB') // whatever your database name is
  app.listen(3000, () => {
    console.log('listening on 3000')
  })
})*/


/*app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
  // Note: __dirname is directory that contains the JavaScript source code. Try logging it and see what you get!
  // Mine was '/Users/zellwk/Projects/demo-repos/crud-express-mongo' for this app.
});
*/

app.listen(3000, function() {
  console.log('listening on 3000');
});
