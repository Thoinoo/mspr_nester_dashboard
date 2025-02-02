// next.config.js
module.exports = {
  async rewrites() {
    return [
      {
        source: '/api/:path*', // Vous pouvez choisir n'importe quel chemin
        destination: 'http://10.0.0.12:57935/:path*', // C'est l'adresse de votre API
      },
    ]
  },
}
