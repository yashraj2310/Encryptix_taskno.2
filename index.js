import express from "express";
import bodyParser from "body-parser";
import nodemailer from "nodemailer";
import cors from "cors";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app=express();

const port = 5500;
app.use(bodyParser.urlencoded({extended:true}));

app.use(bodyParser.json());

app.use(cors());


app.use(express.static('public'));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});
 

// Contact form route
app.post('/submit-form', (req, res) => {
    const { name, email, subject, message } = req.body;

    // Create a transporter object using SMTP transport
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'yashrajsinghthakur23@gmail.com', // replace with your email
            pass: 'mathsfactorial',  // replace with your email password or app password
        },
    });

    // Set up email data
    const mailOptions = {
        from: email,
        to: 'yashrajsinghtkaur23@gmail.com', // recipient email
        subject: subject,
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.status(500).send('Error sending email');
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).send('Email sent successfully');
        }
    });
});
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });


