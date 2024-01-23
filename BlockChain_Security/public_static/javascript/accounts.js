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

async function execute() {
  if (typeof window.ethereum !== "undefined") {
    try {
      // Request account access if needed
      await window.ethereum.request({ method: 'eth_requestAccounts' });

      const contractAddress = "0x95bD3b2c96737e26DF000c5C2DE27a411030D3Fe";
      const abi = [
        {
          "constant": true,
          "inputs": [],
          "name": "assuranceData",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "dateDebut",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "dateFin",
              "type": "uint256"
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
              "internalType": "uint256",
              "name": "_dateDebut",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "_dateFin",
              "type": "uint256"
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
                  "internalType": "uint256",
                  "name": "dateDebut",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "dateFin",
                  "type": "uint256"
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
      ]; // Your ABI

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, abi, signer);

      // Set your parameters for setAssurance
      const params = [
        1300,
        4568,
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
