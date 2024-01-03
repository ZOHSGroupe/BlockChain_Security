const express = require('express');
const app = express();
const port = 3000 || process.env.PORT;
const Web3 = require('web3');
const truffle_connect = require('./connection/app.js');
const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use('/', express.static('public_static'));

app.get('/getAccounts', (req, res) => {
  console.log("**** GET /getAccounts ****");
  truffle_connect.start(function (answer) {
    res.send(answer);
  })
});

//Get All Accounts
app.get('/api/Accounts', (req, res) => {
  console.log("**** GET /getAccounts ****");
  truffle_connect.start(function (answer) {
    console.log(answer);
    res.status(200).send({
      success:'true',
      accounts:answer
    });
  })
});

//Get One Account
app.get('/api/Accounts/:id', (req, res) => {
  console.log("**** GET /getAccounts ****");
  truffle_connect.start(function (answer) {
    console.log(answer[req.params.id]);
    res.status(200).send({
      success:'true',
      accounts:answer[req.params.id]
    });
  })
});

//Get Account Balance
app.get('/api/Balance/:id', (req, res) => {
  console.log("**** GET /getBalance ****");
  truffle_connect.start(function (answer) {
    console.log(answer[req.params.id]);
    var web3= new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545"));
    var balance=web3.fromWei(web3.eth.getBalance(answer[req.params.id]),'ether')+" ETH"; 
    res.status(200).send({
      Success:'true',
      Account:answer[req.params.id],
      Balance:balance
    });
  })
});

//Get Transaction Count For Account
app.get('/api/transactionCount/:id', (req, res) => {
  console.log("**** GET /getTransactionCount ****");
  truffle_connect.start(function (answer) {
    console.log(answer[req.params.id]);
    var web3= new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545"));
    var transactionCount=web3.eth.getTransactionCount(answer[req.params.id]); 
    res.status(200).send({
      Success:'true',
      Account:answer[req.params.id],
      TransactionCount:transactionCount
    });
  })
});

//Get Transaction For Account
app.get('/api/transaction/:id', (req, res) => {
  console.log("**** GET /getTransaction ****");
  truffle_connect.start(function (answer) {
    console.log(answer[req.params.id]);
    var web3= new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545"));
    var transaction=web3.eth.getTransaction("0xf89d16a7ead30e1c0bb9393b5de4875b8080c8a9e2185fdd03e94e2eac3e91b4"); 
    res.status(200).send({
      Success:'true',
      Account:answer[req.params.id],
      Transaction:transaction
    });
  })
});

app.post('/getBalance', (req, res) => {
  console.log("**** GET /getBalance ****");
  console.log(req.body);
  let currentAcount = req.body.account;

  truffle_connect.refreshBalance(currentAcount, (answer) => {
    let account_balance = answer;
    truffle_connect.start(function(answer){
      // get list of all accounts and send it along with the response
      let all_accounts = answer;
      response = [account_balance, all_accounts]
      res.send(response);
    });
  });
});

app.post('/sendCoin', (req, res) => {
  console.log("**** GET /sendCoin ****");
  console.log(req.body);

  let amount = req.body.amount;
  let sender = req.body.sender;
  let receiver = req.body.receiver;

  truffle_connect.sendCoin(amount, sender, receiver, (balance) => {
    res.send(balance);
  });
});

app.listen(port, () => {

  // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
  truffle_connect.web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545"));

  console.log("Express Listening at http://localhost:" + port);

});
