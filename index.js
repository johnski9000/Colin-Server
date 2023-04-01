const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3001;;

app.use(cors());
app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ limit: "25mb", extended: true }));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});


function sendEmail(props) {
    return new Promise((resolve, reject) => {
        var transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "jwdigitalltd@gmail.com",
                pass: "fidvjwawgbyssidd"
            },
        });
        const mail_configs = {
            from: "jwdigitalltd@gmail.com",
            to: "januszwozniak.bth@gmail.com",
            subject: "Testing Koding 101 email",
            text: "Just checking if this email will be sent"
        };
        transporter.sendMail(mail_configs, function(error, info) {
            if (error) {
                console.log(error)
                return reject({ message: "an error has occured"})
            } 
            return resolve ({message: "email sent succesfully", props})
            
        });
    });
}
app.get("/", (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    sendEmail()
    .then((response) => res.send(response.message))
    .catch((error) => res.status(500).send(error.message))
})
app.post("/send_email", (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    sendEmail(req.body)
    .then((response) => res.send(response.message))
    .catch((error) => res.status(500).send(error.message))
})
app.listen(port, () => {
    console.log(`nodemailerProject is listening at http://localhost:${port}`);
})
app.options('/send_email', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.status(200).send();
  });