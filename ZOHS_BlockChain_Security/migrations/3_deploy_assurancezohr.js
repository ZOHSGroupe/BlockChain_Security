var AssuranceContract = artifacts.require("./AssuranceContract.sol");

module.exports = function(deployer) {
  deployer.deploy(AssuranceContract);
};
