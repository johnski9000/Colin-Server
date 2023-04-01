const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3001;;

const whitelist = ["http://localhost:3000"]
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error("Not allowed by CORS"))
    }
  },
  credentials: true,
}
app.use(cors(corsOptions))

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
    sendEmail()
    .then((response) => res.send(response.message))
    .catch((error) => res.status(500).send(error.message))
})
app.post("/send_email", (req, res) => {
    sendEmail(req.body)
    .then((response) => res.send(response.message))
    .catch((error) => res.status(500).send(error.message))
})
app.listen(port, () => {
    console.log(`nodemailerProject is listening at http://localhost:${port}`);
})
