const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const connectDb = require('./config/connection');
const nodemailer = require('nodemailer');
const authRoute = require('./route/auth');
const employeenRoute = require('./route/employee');
const draftRoute = require('./route/draft');
const companyRoute = require('./route/setup');
const projectsRoute = require('./route/project');
const hrmoduleRoute = require('./route/hr');
const hrfacilityRoute = require('./route/hrfacility');
const roleRoute = require('./route/role');
const excelRoute = require('./route/excel');
const multer = require('multer');
const cron = require('node-cron');

const errorMiddleware = require('./middleware/errorHandle');
const Cors = require('cors');
// Setting up config file
dotenv.config();

// Handle uncaught exceptions => hqandling undefined variables ..

    process.on('uncaughtException', err => {
      console.log(`ERROR: ${err.message}`);
      console.log('Shutting down due to uncaught exception')
      server.close(() => {
        process.exit(1);
      })
    })

// Connection to database mongodb
connectDb();

const app = express();
const upload = multer();

app.use(Cors());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: '500mb' }));
app.use(bodyParser.urlencoded({ limit: '500mb', extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use('/api', authRoute,projectsRoute,draftRoute,hrmoduleRoute,roleRoute,employeenRoute,companyRoute,hrfacilityRoute,excelRoute);



app.use(bodyParser.json()); 


const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
      user: 'cshankari27@gmail.com',
      pass: 'vqhzwuklzypwruyu',
  }
});

app.post('/send-email', (req, res) => {
  const { name, email, message } = req.body;

  const mailOptions = {
      from: 'cshankari27@gmail.com',
      to: email,
      subject: 'New message from your website',
      text: `Username: ${name}\nEmail: ${email}\nPassword: ${message}`
  };

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



let cronExpression = '26 10 18 4 *';
const transporters = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'cshankari27@gmail.com',
    pass: 'vqhzwuklzypwruyu'
  }
});

const mailOptions = {
  from: 'cshankari27@gmail.com',
  to: 'akramjavithkhan@gmail.com',
  subject: 'Automatic Email',
  text: 'This email is sent automatically based on a cron job schedule its me.'
};

cron.schedule(cronExpression, () => {

  transporters.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
});



// const transporters = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: 'cshankari27@gmail.com',
//     pass: 'vqhzwuklzypwruyu'
//   }
// });

// // Create an endpoint to handle email scheduling requests
// app.post('/api/schedule-email', (req, res) => {
//   const { recipient, subject, message, scheduleTime } = req.body;

//   // Create the email message
//   const mailOptions = {
//     from: 'youremail@gmail.com',
//     to: recipient,
//     subject: subject,
//     text: message
//   };

//   // Get the current date
//   const today = new Date();

//   // Parse the user input value as a Date object
//   const selectedTime = new Date(`${today.toDateString()} ${scheduleTime}`);

//   // Schedule the email to be sent at the selected time
//   cron.schedule(selectedTime, () => {
//     transporter.sendMail(mailOptions, (error, info) => {
//       if (error) {
//         console.log(error);
//         res.status(500).json({ message: 'Error sending email' });
//       } else {
//         console.log('Email sent: ' + info.response);
//         res.status(200).json({ message: 'Email sent successfully' });
//       }
//     });
//   });
// });


// Handling middleware error
app.use(errorMiddleware);
const port = process.env.PORT || 7001
const env  = process.env.NODE_ENV;
const server = app.listen(port, ()=> console.log(`Server started at ${env} mode port ${port}`));

// unhandled promise rejection => for handling mongodb url errors

//     process.on('unhandledRejection', err => {
//       console.log(`ERROR: ${err.message}`);
//       console.log('Shutting down due to unhandled promise rejection')
//       server.close(() => {
//         process.exit(1);
//       })
//     })