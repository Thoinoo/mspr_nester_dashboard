const fs = require('fs');
const path = require('path');

module.exports = {
  devServer: {
    https: {
      key: fs.readFileSync(path.join(__dirname, './certs/cert_api.key')),
      cert: fs.readFileSync(path.join(__dirname, './certs/cert_api.crt')),
    },
    port: 3000, // Ou 443 si vous voulez utiliser le port HTTPS standard
  },
};
