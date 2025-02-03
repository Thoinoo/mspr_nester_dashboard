const fs = require('fs');
const path = require('path');

module.exports = {
  devServer: {
    https: {
      key: fs.readFileSync(path.join(__dirname, 'private-key.pem')),
      cert: fs.readFileSync(path.join(__dirname, 'certificate.pem')),
    },
  },
};
