const express = require('express');

const app = express();
const path = require('path');

const cors = require('cors');
app.use(cors());
app.use(express.json());

const db = require('monk')('localhost/database' || process.env.MONGODB_URI);
var mailingList = db.get('mailList');

app.get('/mailingList', (req, res) => {
    mailingList.find()
        .then(email => {
            res.json(email);
        })
});

app.post('/test', (req, res) => {
    res.json("this is a test msg sent from the server while debugging");
})

app.post('/email', (req, res) => {
    
    mailingList.find({mail: req.body.email}, {multi: false}, (err, obj) => {

        //if an array with that mail object is returned, it already exists
        if (obj.length >= 1) {
            res.json("This email has already been added");
        }
        else {

            //if the email is a valid email, add them with confirmation
            if (validateEmail(req.body.email)) {
                mailingList
                    .insert({ mail: req.body.email })
                    .then(() => {
                        res.json("You've been successfully added to the mailing list.")
                    });
            }

            //otherwise, let them know there email entered isn't valid
            else {
                res.json("Please enter a valid email address.");
            }
        }
    });
});

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

const port = process.env.PORT || 5000;
const host = '0.0.0.0';

app.listen(port, host, () => console.log(`Example app listening on port ${port}!`));

if (process.env.NODE_ENV === "production"){    
   app.use(express.static(path.join(__dirname, "build")));

   app.get('*', (req, res) => {
        res.sendFile(path.join(_dirname, "build", "index.html"));
   });
}