require('babel-register')
require('dotenv').config()
const HDWalletProvider = require("@truffle/hdwallet-provider")

const private_keys = [
  process.env.PRIVATE_KEY_0, // Assuming these are already strings
  process.env.PRIVATE_KEY_1,
];

module.exports = {
  networks: {
    ZiadNetowrk: {
      host: '127.0.0.1',
      port: 7545,
      network_id: '*'
    },
    sepolia: {
      provider: () => new HDWalletProvider({
        privateKeys: private_keys,
        providerOrUrl: 'https://sepolia.infura.io/v3/1f58a6eab2794cc69142810813e03d74',
        numberOfAddress: 2
      }),
      network_id: 11155111, // replace with the actual network id
      gas: 5500000,
      gasPrice: 123609748701,
    },
  },
  compilers: {
    solc: {
      version: "0.5.16", // Change this to the desired Solidity version
      settings: {
        optimizer: {
          enabled: true,
          runs: 200,
        },
      },
    },
  },
}
