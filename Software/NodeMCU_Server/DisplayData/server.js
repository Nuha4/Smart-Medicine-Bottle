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
    var mailOptions = {
        to:"nuha.khan4@gmail.com",
        subject:"Email from nodemailer",
        html:'<div>Name: '+ req.query.name +'</div><div>Email: '+ req.query.email +'</div><div>Mobile: '+ req.query.mobile +'</div><div>Message: '+ req.query.message +'</div>'
    }
    smtpTransport.sendMail(mailOptions, function(error, response) {
     if(error) {
        res.end("error");
     } else {
        res.end("sent");
     }
   });
});


app.listen(3000, function() {
  console.log('listening on 3000');
});





// Generate test SMTP service account from ethereal.email
// Only needed if you don't have a real mail account for testing
    /*nodemailer.createTestAccount((err, account) => {
        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: account.user, // generated ethereal user
                pass: account.pass  // generated ethereal password
            }
        });
        // setup email data with unicode symbols
        let mailOptions = {
            from: '"Fred Foo 👻" <foo@example.com>', // sender address
            to: 'bar@example.com, baz@example.com', // list of receivers
            subject: 'Hello ✔', // Subject line
            text: 'Hello world?', // plain text body
            html: '<b>Hello world?</b>' // html body
        };
        // send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message sent: %s', info.messageId);
            // Preview only available when sending through an Ethereal account
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

            // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
            // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
        });
    });*/










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
