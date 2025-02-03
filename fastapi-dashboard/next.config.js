const fs = require('fs');
const path = require('path');

module.exports = {
  devServer: {
    https: {
      key: fs.readFileSync(path.join(__dirname, '/etc/ssl/nester/cert_api.key')),
      cert: fs.readFileSync(path.join(__dirname, '/etc/ssl/nester/cert_api.crt')),
    },
  },
};
