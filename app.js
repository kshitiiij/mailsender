const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const path = require('path');
const ejs = require('ejs');


const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('view engine','ejs');
app.use(express.static('public'));


app.get('/', (req,res) => {
    res.render('login');
})

app.post('/home',(req,res) => {
  

    email = req.body.email;
    password =  req.body.password;
    user = req.body.user;

    transporter = nodemailer.createTransport({
      service : 'gmail',
      auth : {
      
        user : email,
        pass : password
      }
    });

    res.render('home', {user : user, email : email});
});


app.post('/send', (req, res) => {
    
    const output = `<h3> email sent successfully.
    </h3>
    <ul>
        <li>From: ${ req.body.from}</li>
        <li>To: ${ req.body.to}</li>
        <li>Subject: ${ req.body.subject}</li>
    </ul>
    <p>Message: ${req.body.message}</p>
    `


    
      const message = {
        from    : "kshitijs1010@gmail.com",
        to      :  req.body.to,
        subject :  req.body.subject,
        text    :  req.body.message,
        html    :  output
      };
    
      transporter.sendMail(message, (error, info) => {
        if(error) {
            console.log("error occured",error);
        }
        else {
            console.log("email sent successfully.");
        }
    
      });
      res.render('home');

});


app.listen(3000, () => {
    console.log('App listening....');
})