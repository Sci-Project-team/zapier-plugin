const getAccessToken = (z, bundle) => {
  return z.request({
    method: 'POST',
    url: 'https://2758-197-204-4-6.ngrok-free.app/auth/login',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    form: { // <--- THIS IS THE KEY
      grant_type: 'password',
      username: bundle.authData.username,
      password: bundle.authData.password,
      scope: '',          // optional, can be left blank
      client_id: '',      // optional, can be left blank
      client_secret: ''   // optional, can be left blank
    }
  }).then((response) => {
    if (response.status === 401) {
      throw new Error('Invalid username or password');
    }
    const result = z.JSON.parse(response.content);
    return { access_token: result.access_token };
  });
};



module.exports = {
  type: 'session',
  fields: [
    { key: 'username', required: true, label: 'Username' },
    { key: 'password', required: true, type: 'password', label: 'Password' },
  ],
  sessionConfig: { perform: getAccessToken },
    test: {
    url: 'https://2758-197-204-4-6.ngrok-free.app/',
    method: 'GET',
    headers: {
        Authorization: (bundle) => `Bearer ${bundle.authData.access_token}`,
    },
    },

  connectionLabel: '{{bundle.authData.username}}',
};
