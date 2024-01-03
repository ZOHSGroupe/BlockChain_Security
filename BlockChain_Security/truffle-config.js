// Allows us to use ES6 in our migrations and tests.
require('babel-register')

module.exports = {
  networks: {
    ZiadNetowrk: {
      host: '127.0.0.1',
      port: 7545,
      network_id: '*'
    }
  }
}