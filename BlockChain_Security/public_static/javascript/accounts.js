$(document).ready(async function () {
  var curraccount;
  var selectedAccount;

  // Initialize Web3
  if (window.ethereum) {
    window.web3 = new Web3(window.ethereum);
    try {
      // Request account access if needed
      await window.ethereum.enable();
    } catch (error) {
      // User denied account access...
      console.error('User denied account access');
    }
  }
  // Legacy dapp browsers...
  else if (window.web3) {
    window.web3 = new Web3(web3.currentProvider);
  }
  // Non-dapp browsers...
  else {
    console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
  }

  // Get accounts from MetaMask
  window.web3.eth.getAccounts((error, accounts) => {
    if (error) {
      console.error(error);
    } else {
      for (let i = 0; i < accounts.length; i++) {
        curraccount = accounts[i];
        $('#options').append("<option value='" + curraccount + "'>" + curraccount + "</option>");
      }
    }
  });

  $('#submit').click(function () {
    selectedAccount = $('#options').val();
    console.log(selectedAccount);
    // Rest of your existing code...
  });

  $('#send').click(function () {
    // Rest of your existing code...
  });
});
