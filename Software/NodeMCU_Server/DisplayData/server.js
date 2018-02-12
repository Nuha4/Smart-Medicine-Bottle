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
    app.get('/', (req, res) => {
      db.collection('data_table').find().toArray((err, result) => {
          if (err) throw err;
          //console.log(result);
          res.render('index.ejs', {CellData: result});
      });
    });

    app.get('/sendmail', function(req, res) {
        db.collection('data_table').find().toArray((err, result) => {
            if (err) throw err;
            var ln = result.length;
            for(var i=0; i<ln; i++){
              console.log("value : " + result[i].value);
              var LastWeight = result[ln-2].value;
              var currentWeight = result[ln-1].value;
            }
            if( LastWeight > currentWeight){
              console.log("Dose Taken");
              var flag = '0';
              var collection = db.collection('dose_table');
              var dose = {  Missed_Dose : flag};
                collection.insert(dose, function(err, result) {
                if(err) { throw err; }
                console.log('saved to database');
              });
            }
            else {
              console.log("Dose Missed");
              var flag = '1';
              var collection = db.collection('dose_table');
              var dose = {  Missed_Dose : flag};
                collection.insert(dose, function(err, result) {
                if(err) { throw err; }
                console.log('saved to database');
              });
              setInterval(function(){
                  sendEmail();
              },10000);
            }
            res.render('index.ejs', {CellData: result});
        });
    });
});

function sendEmail(){
    var mailOptions = {
        to:"nuha.khan4@gmail.com",
        subject:"Email from nodemailer",
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

