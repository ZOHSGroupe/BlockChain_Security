const { ethers } = require("ethers");

async function connect() {
  if (typeof window.ethereum !== "undefined") {
    try {
      await ethereum.request({ method: "eth_requestAccounts" });
    } catch (error) {
      console.log(error);
    }
    document.getElementById("connectButton").innerHTML = "Connected";
    const accounts = await ethereum.request({ method: "eth_accounts" });
    console.log(accounts);
  } else {
    document.getElementById("connectButton").innerHTML =
      "Please install MetaMask";
  }
}

async function getBalance(){
  let balance=await window.ethereum.request({method:"eth_getBalance",
    params:[
      accounts[0],
      'latest'
    ]}).catch((err)=>{
      console.log(err)
    })
    console.log(parseInt(balance)/Math.pow(10,18))
} 

async function execute() {
  if (typeof window.ethereum !== "undefined") {
    try {
      // Request account access if needed
      await window.ethereum.request({ method: 'eth_requestAccounts' });

      const contractAddress = "0x7cF2E66E4Db26a39dA98a81D266A7CB26D259a73";
      const abi = [
        {
          "constant": true,
          "inputs": [],
          "name": "assuranceData",
          "outputs": [
            {
              "internalType": "address",
              "name": "owner",
              "type": "address"
            },
            {
              "internalType": "string",
              "name": "dateDebut",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "dateFin",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "zipFile",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "assuranceType",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "name",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "cin",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "marque",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "model",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "price",
              "type": "uint256"
            }
          ],
          "payable": false,
          "stateMutability": "view",
          "type": "function"
        },
        {
          "constant": false,
          "inputs": [
            {
              "internalType": "string",
              "name": "_dateDebut",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "_dateFin",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "_zipFile",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "_assuranceType",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "_name",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "_cin",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "_marque",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "_model",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "_price",
              "type": "uint256"
            }
          ],
          "name": "setAssurance",
          "outputs": [],
          "payable": false,
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "constant": true,
          "inputs": [],
          "name": "getAssurance",
          "outputs": [
            {
              "components": [
                {
                  "internalType": "address",
                  "name": "owner",
                  "type": "address"
                },
                {
                  "internalType": "string",
                  "name": "dateDebut",
                  "type": "string"
                },
                {
                  "internalType": "string",
                  "name": "dateFin",
                  "type": "string"
                },
                {
                  "internalType": "string",
                  "name": "zipFile",
                  "type": "string"
                },
                {
                  "internalType": "string",
                  "name": "assuranceType",
                  "type": "string"
                },
                {
                  "internalType": "string",
                  "name": "name",
                  "type": "string"
                },
                {
                  "internalType": "string",
                  "name": "cin",
                  "type": "string"
                },
                {
                  "internalType": "string",
                  "name": "marque",
                  "type": "string"
                },
                {
                  "internalType": "string",
                  "name": "model",
                  "type": "string"
                },
                {
                  "internalType": "uint256",
                  "name": "price",
                  "type": "uint256"
                }
              ],
              "internalType": "struct AssuranceContract.AssuranceData",
              "name": "",
              "type": "tuple"
            }
          ],
          "payable": false,
          "stateMutability": "view",
          "type": "function"
        }
      ];
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, abi, signer);

      // Set your parameters for setAssurance
      const params = [
        "13/01/2023",
        "13/02/2023",
        "fjlksdjl",
        "annuel",
        "karam",
        "lc455888",
        "2024",
        "mercedec",
        ethers.utils.parseEther("1") // Specify the price in Ether
      ];
      const overrides = { gasLimit: 2000000 };  // Adjust the gas limit as needed
      // Send transaction
      const transaction = await contract.setAssurance(...params, overrides);

      // Wait for the transaction to be mined
      await transaction.wait();

      console.log('Transaction mined!');
    } catch (error) {
      console.error(error);
    }
  } else {
    document.getElementById("executeButton").innerHTML = "Please install MetaMask";
  }
}

module.exports = {
  connect,
  execute,
  
};
