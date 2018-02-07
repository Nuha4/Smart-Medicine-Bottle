const express = require('express');
const app = express();
const bodyParser= require('body-parser');
const nodemailer = require('nodemailer');

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}));


var smtpTransport = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    auth: {
        user: "moinul.f18g01@gmail.com",
        pass: "floor18group1"
    }
});


var MongoClient = require('mongodb').MongoClient;
MongoClient.connect('mongodb://localhost:27017/MedicineDB', function (err, client) {
  if (err) throw err;
  var db = client.db('MedicineDB');
  db.collection('data_table').findOne({}, function (findErr, result) {
    if (findErr) throw findErr;
    console.log(result);
  });

  app.get('/', (req, res) => {
     /*var cursor = db.collection('data_table').find();
     console.log(cursor);*/
    //db.collection('data_table').findOne({}, function (findErr, result) {
    db.collection('data_table').find().toArray((err, result) => {
        if (err) throw err;
        console.log(result);
        res.render('index.ejs', {CellData: result});
    });
    //res.sendFile(__dirname + '/index.html');
  });
});

app.get('/sendmail', function(req, res) {
    setInterval(function(){
        sendEmail();
    },5000);
});


function sendEmail(){
  var mailOptions = {
      to:"nuha.khan4@gmail.com",
      subject:"Email from nodemailer",
      //html:'<div>Name: '+ req.query.name +'</div><div>Email: '+ req.query.email +'</div><div>Mobile: '+ req.query.mobile +'</div><div>Message: '+ req.query.message +'</div>'
      html: 'LoadCell Data'
  }
  smtpTransport.sendMail(mailOptions, function(error, response) {
   if(error) {
      res.end("error");
   } else {
      res.end("sent");
   }
 });
}

app.listen(3000, function() {
  console.log('listening on 3000');
});

/*app.post('/quotes', (req, res) => {
  console.log(req.body) // Take data From Browser
});*/
//res.render(view, locals)
/*app.post('/data', (req, res) => {
  db.collection('data_table').save(req.body, (err, result) => {
    if (err) return console.log(err)

    console.log('saved to database')
    res.redirect('/')
  })
})*/
/*app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
  // Note: __dirname is directory that contains the JavaScript source code. Try logging it and see what you get!
  // Mine was '/Users/zellwk/Projects/demo-repos/crud-express-mongo' for this app.
});
*/
