const Employee = artifacts.require("./Employees.sol");

module.exports = function (deployer) {
  deployer.deploy(Employee);
};
