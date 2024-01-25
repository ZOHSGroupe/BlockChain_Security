const AssuranceContract = artifacts.require("AssuranceContract");

module.exports = async function(callback) {
  const assuranceInstance = await AssuranceContract.deployed();
  const assuranceData = await assuranceInstance.getAssurance();
  console.log("Assurance Data:", assuranceData);
  callback();
};
