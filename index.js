const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3001;;

app.use(cors());
app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ limit: "25mb" }));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

function sendEmail({name, email, number, service, message}) {
    console.log(email)
    return new Promise((resole, reject) => {
        var transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "jwdigitalltd@gmail.com",
                pass: "fidvjwawgbyssidd"
            },
        });
        const mail_configs = {
            from: "jwdigitalltd@gmail.com",
            to: email,
            subject: "Testing Koding 101 email",
            text: "Just checking if this email will be sent"
        };
        transporter.sendMail(mail_configs, function(error, info) {
            if (error) {
                console.log(error)
                return reject({ message: "an error has occured"})
            } 
            setTimeout(() => {
            }, 1000)
            return resolve ({message: "email sent succesfully"})
            
        });
        return resole({message: "finished"})
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