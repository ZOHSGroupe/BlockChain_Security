const contract = require('truffle-contract');
const Web3 = require('web3');

const metacoin_artifact = require('../build/contracts/MetaCoin.json');
const assurance_artifact = require('../build/contracts/AssuranceContract.json');
var MetaCoin = contract(metacoin_artifact);
var AssuranceContract = contract(assurance_artifact);

module.exports = {
  start: function (callback) {
    var self = this;

    // Check if we are in a browser environment
    if (typeof window !== 'undefined') {
      // Check if the ethereum object is available
      if (window.ethereum) {
        self.web3 = new Web3(window.ethereum);

        window.ethereum.enable().then(function (accounts) {
          self.accounts = accounts;
          self.account = accounts[0]; // Assuming the first account is the current one
          callback(self.accounts);
        }).catch(function (error) {
          console.error("Error connecting with MetaMask:", error);
        });
      } else {
        console.error("Ethereum object not available. Make sure MetaMask is installed and running.");
      }
    } else {
      console.error("Window object not available. Are you running in a browser?");
    }
  },

  refreshBalance: function (account, callback) {
    var self = this;

    MetaCoin.setProvider(self.web3.currentProvider);

    var meta;
    MetaCoin.deployed().then(function (instance) {
      meta = instance;
      return meta.getBalance.call(account, { from: account });
    }).then(function (value) {
      callback(value.valueOf());
    }).catch(function (e) {
      console.log(e);
      callback("Error 404");
    });
  },

  setAssurance: function (owner, dateDubut, dateFin, zipFile, assuranceType, name, cin, marque, model,price, callback) {
    var self = this;

    AssuranceContract.setProvider(self.web3.currentProvider);

    var meta;
    AssuranceContract.deployed().then(function (instance) {
      meta = instance;
      return meta.setAssurance(dateDubut, dateFin, zipFile, assuranceType, name, cin, marque, model,price, { from: owner });
    }).then(function () {
      self.getAssurance(function (answer) {
        callback(answer);
      });
    }).catch(function (e) {
      console.log(e);
      callback("ERROR 404");
    });
  },

  getAssurance: function (callback) {
    var self = this;

    AssuranceContract.setProvider(self.web3.currentProvider);

    var meta;
    AssuranceContract.deployed().then(function (instance) {
      meta = instance;
      return meta.getAssurance();
    }).then(function (value) {
      callback(value);
    }).catch(function (e) {
      console.log(e);
      callback("Error 404");
    });
  },

  sendCoin: function (amount, sender, receiver, callback) {
    var self = this;

    MetaCoin.setProvider(self.web3.currentProvider);

    var meta;
    MetaCoin.deployed().then(function (instance) {
      meta = instance;
      return meta.sendCoin(receiver, amount, { from: sender });
    }).then(function () {
      self.refreshBalance(sender, function (answer) {
        callback(answer);
      });
    }).catch(function (e) {
      console.log(e);
      callback("ERROR 404");
    });
  }
}
