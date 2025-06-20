const sendSms = (z, bundle) => {
  return z.request({
    url: 'https://8401-105-97-120-175.ngrok-free.app/sms',
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${bundle.authData.access_token}`,
      'Content-Type': 'application/json',
    },
    body: {
      phone_number: bundle.inputData.phone_number,
      message: bundle.inputData.message,
    },
  }).then(response => z.JSON.parse(response.content));
};

module.exports = {
  key: 'send_sms',
  noun: 'SMS',
  display: {
    label: 'Send SMS',
    description: 'Send SMS via ESPing Gateway',
  },
  operation: {
    inputFields: [
      { key: 'phone_number', required: true, label: 'Phone Number' },
      { key: 'message', required: true, label: 'Message' },
    ],
    perform: sendSms,
    sample: {
      phone_number: "+213794478998",
      message: "postman test",
      id: "90302d06-8f73-4808-9069-58ccbb64558a",
      status: "sent",
      created_at: "2025-06-08T02:21:39.058200",
      updated_at: "2025-06-08T02:21:39.058200",
      error_message: null
    }
  },
};
