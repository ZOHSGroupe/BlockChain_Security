const contract = require('truffle-contract');

const metacoin_artifact = require('../build/contracts/MetaCoin.json');
//const bookStroe_artifact = require('../build/contracts/BookStore.json');
const bookStroe_artifact = require('../build/contracts/AssuranceContract.json');
var MetaCoin = contract(metacoin_artifact);
//var BookStore=contract(bookStroe_artifact);
var AssuranceContract=contract(bookStroe_artifact);
module.exports = {
  start: function(callback) {
    var self = this;

    // Bootstrap the MetaCoin abstraction for Use.
    MetaCoin.setProvider(self.web3.currentProvider);
    //BookStore.setProvider(self.web3.currentProvider);
    AssuranceContract.setProvider(self.web3.currentProvider);
    // Get the initial account balance so it can be displayed.
    self.web3.eth.getAccounts(function(err, accs) {
      if (err != null) {
        console.log("There was an error fetching your accounts.");
        return;
      }

      if (accs.length == 0) {
        console.log("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
        return;
      }
      self.accounts = accs;
      self.account = self.accounts[2];

      callback(self.accounts);
    });
  },
  refreshBalance: function(account, callback) {
    var self = this;

    // Bootstrap the MetaCoin abstraction for Use.
    MetaCoin.setProvider(self.web3.currentProvider);

    var meta;
    MetaCoin.deployed().then(function(instance) {
      meta = instance;
      return meta.getBalance.call(account, {from: account});
    }).then(function(value) {
        callback(value.valueOf());
    }).catch(function(e) {
        console.log(e);
        callback("Error 404");
    });
  },



  // sellBook: function(sender,fullname,description,price,callback) {
  //   var self = this;

  //   BookStore.setProvider(self.web3.currentProvider);

  //   var meta;
  //   BookStore.deployed().then(function(instance) {
  //     meta = instance;
  //     return meta.sellBook(fullname,description,price, {from: sender});
  //   }).then(function() {
  //     self.getBook(function (answer) {
  //       callback(answer);
  //     });
  //   }).catch(function(e) {
  //     console.log(e);
  //     callback("ERROR 404");
  //   });
  // },

  // getBook: function(callback) {
  //   var self = this;

  //   // Bootstrap the MetaCoin abstraction for Use.
  //   BookStore.setProvider(self.web3.currentProvider);

  //   var meta;
  //   BookStore.deployed().then(function(instance) {
  //     meta = instance;
  //     return meta.getBook();
  //   }).then(function(value) {
  //       callback(value);
  //   }).catch(function(e) {
  //       console.log(e);
  //       callback("Error 404");
  //   });
  // },

  setAssurance: function(owner,dateDubut,dateFin,zipFile,assuranceType,name,cin,marque,model,callback) {
    var self = this;

    AssuranceContract.setProvider(self.web3.currentProvider);

    var meta;
    AssuranceContract.deployed().then(function(instance) {
      meta = instance;
      return meta.setAssurance(dateDubut,dateFin,zipFile,assuranceType,name,cin,marque,model, {from: owner});
    }).then(function() {
      self.getAssurance(function (answer) {
        callback(answer);
      });
    }).catch(function(e) {
      console.log(e);
      callback("ERROR 404");
    });
  },

  getAssurance: function(callback) {
    var self = this;

    // Bootstrap the MetaCoin abstraction for Use.
    AssuranceContract.setProvider(self.web3.currentProvider);

    var meta;
    AssuranceContract.deployed().then(function(instance) {
      meta = instance;
      return meta.getAssurance();
    }).then(function(value) {
        callback(value);
    }).catch(function(e) {
        console.log(e);
        callback("Error 404");
    });
  },

  sendCoin: function(amount, sender, receiver, callback) {
    var self = this;

    // Bootstrap the MetaCoin abstraction for Use.
    MetaCoin.setProvider(self.web3.currentProvider);

    var meta;
    MetaCoin.deployed().then(function(instance) {
      meta = instance;
      return meta.sendCoin(receiver, amount, {from: sender});
    }).then(function() {
      self.refreshBalance(sender, function (answer) {
        callback(answer);
      });
    }).catch(function(e) {
      console.log(e);
      callback("ERROR 404");
    });
  }
}
