
// // export default CronJob;

// import React, { useState } from 'react';
// import axios from 'axios';

// function App() {
//   const [cronExpression, setCronExpression] = useState('0 0 * * *'); // Set the default cron expression

// //   const handleCronInputChange = (event) => {
// //     setCronExpression(event.target.value);
// //   };

// //   const handleSetCronExpression = () => {
// //     const newCronExpression = '30 10 20 4 *'; // Run the job at 10:30 AM on April 20th
// //     fetch('/set-cron-expression', {
// //       method: 'POST',
// //       headers: {
// //         'Content-Type': 'application/json'
// //       },
// //       body: JSON.stringify({ cronExpression: newCronExpression })
// //     })
// //       .then(response => response.text())
// //       .then(message => {
// //         console.log(message);
// //         cron.stop(); // Stop the current cron job
// //         cron.start(); // Start a new cron job with the updated expression
// //       });
// //   };
  

// //   const handleRunCronJob = () => {
// //     axios.post('http://192.168.85.8:7001/run-cron-job')
// //       .then(response => {
// //         console.log(response.data);
// //       })
// //       .catch(error => {
// //         console.error(error);
// //       });
// //   };

//   return (
//     <div>
//       <h1>React Cron Job</h1>
//       <label>
//         Cron Expression:
//         {/* <input type="text" value={cronExpression} onChange={handleCronInputChange} /> */}
//       </label>
//       {/* <button onClick={handleSetCronExpression}>Set Cron Expression</button> */}
//       {/* <button onClick={handleRunCronJob}>Run Cron Job</button> */}
//     </div>
//   );
// }

// export default App;


import React, { useState } from 'react';
import axios from 'axios';

const SendEmail = () => {
  // Create state variables for email input values
  const [recipient, setRecipient] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [scheduleTime, setScheduleTime] = useState('');

  // Create a function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Make an API call to the server to schedule the email
    axios.post('/api/schedule-email', {
      recipient: recipient,
      subject: subject,
      message: message,
      scheduleTime: scheduleTime
    })
      .then(response => console.log(response))
      .catch(error => console.log(error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="recipient">Recipient:</label>
      <input type="email" id="recipient" value={recipient} onChange={(e) => setRecipient(e.target.value)} required />

      <label htmlFor="subject">Subject:</label>
      <input type="text" id="subject" value={subject} onChange={(e) => setSubject(e.target.value)} required />

      <label htmlFor="message">Message:</label>
      <textarea id="message" value={message} onChange={(e) => setMessage(e.target.value)} required />

      <label htmlFor="scheduleTime">Schedule Time:</label>
      <input type="time" id="scheduleTime" value={scheduleTime} onChange={(e) => setScheduleTime(e.target.value)} required />

      <button type="submit">Send Email</button>
    </form>
  );
};

export default SendEmail;

