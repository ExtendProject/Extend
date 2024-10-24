const axios = require('axios');

const apiKey = 'c0tQU0hjU2JST3hwa2hxRHRRYnk';
const phoneNumber = '+233240727345'; // Replace with the actual phone number
const senderID = 'Credet'; // Replace with the actual sender ID
const message = 'Testing'; // Replace with the actual message

const apiUrl = `https://sms.arkesel.com/sms/api?action=send-sms&api_key=${apiKey}&to=${phoneNumber}&from=${senderID}&sms=${message}`;

async function sendSMS() {
  try {
    const response = await axios.get(apiUrl);
    console.log('Response:', response.data);
  } catch (error) {
    console.error('Error:', error);
  }
}

sendSMS();
