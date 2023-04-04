// const express = require('express');
// const nodemailer = require('nodemailer');
// const cors = require("cors");

// const app = express();
// const port = process.env.PORT || 3001;
// app.use(cors());
// app.options('*', cors());

// const allowCors = fn => async (req, res) => {
//   res.setHeader('Access-Control-Allow-Credentials', true)
//   res.setHeader('Access-Control-Allow-Origin', '*')
//   res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
//   res.setHeader(
//     'Access-Control-Allow-Headers',
//     'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
//   )
//   if (req.method === 'OPTIONS') {
//     res.status(200).end()
//     return
//   }
//   return await fn(req, res)
// }

// app.use(express.json({ limit: "25mb" }));
// app.use(express.urlencoded({ limit: "25mb", extended: true }));

// app.put('/send_email', allowCors(async (req, res) => {
//   const { name, email, number, service, message } = req.body;
  
//   try {
//     const transporter = nodemailer.createTransport({
//       service: 'gmail',
//       auth: {
//         user: 'jwdigitalltd@gmail.com',
//         pass: 'fidvjwawgbyssidd'
//       }
//     });

//     const mailOptions = {
//       from: 'jwdigitalltd@gmail.com',
//       to: 'januszwozniak.bth@gmail.com',
//       subject: 'Testing Koding 101 email',
//       text: `Name: ${name}\nEmail: ${email}\nNumber: ${number}\nService: ${service}\nMessage: ${message}`
//     };
    
//     await transporter.sendMail(mailOptions);
    
//     res.status(200).json({ message: 'Email sent successfully' });
//   } catch (error) {
//     res.status(500).json({ message: 'An error occurred while sending email' });
//   }
// }));

// app.listen(port, () => {
//   console.log(`nodemailerProject is listening at http://localhost:${port}`);
// });

const express = require('express');
const nodemailer = require('nodemailer');
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3001;

const allowCors = fn => async (req, res) => {
    res.setHeader('Access-Control-Allow-Credentials', true)
    const allowedOrigins = ['https://sarah-s-nails.vercel.app', 'http://localhost:3000'];
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
      res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
    res.setHeader(
      'Access-Control-Allow-Headers',
      'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    )
    if (req.method === 'OPTIONS') {
      res.status(200).end()
      return
    }
    return await fn(req, res)
  }

app.use(cors());
app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ limit: "25mb", extended: true }));

app.put('/', allowCors(async (req, res) => {
  const { name, email, number, service, message } = req.body;
  
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'jwdigitalltd@gmail.com',
        pass: 'fidvjwawgbyssidd'
      }
    });

    const mailOptions = {
      from: 'jwdigitalltd@gmail.com',
      to: 'januszwozniak.bth@gmail.com',
      subject: 'Testing Koding 101 email',
      text: `Name: ${name}\nEmail: ${email}\nNumber: ${number}\nService: ${service}\nMessage: ${message}`
    };
    
    await transporter.sendMail(mailOptions);
    
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while sending email' });
  }
}));

app.listen(port, () => {
  console.log(`nodemailerProject is listening at http://localhost:${port}`);
});
