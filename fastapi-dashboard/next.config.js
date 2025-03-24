const fs = require('fs');
const path = require('path');

module.exports = {
  devServer: {
    https: {
      key: fs.readFileSync(path.join(__dirname, './certs/cert_nester.key')),
      cert: fs.readFileSync(path.join(__dirname, './certs/cert_nester.crt')),
    },
    port: 3000, // Ou 443 si vous voulez utiliser le port HTTPS standard
  },
};
