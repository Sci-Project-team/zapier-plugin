const { version } = require('./package.json');
const zapier = require('zapier-platform-core');
const authentication = require('./authentication');
const sendSms = require('./actions/send_sms');
module.exports = {
  version,
  platformVersion: zapier.version,
  authentication: authentication,
  triggers: {},
  creates: {
    [sendSms.key]: sendSms,
  },
  resources: {},
};
