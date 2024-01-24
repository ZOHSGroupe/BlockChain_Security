// SPDX-License-Identifier: MIT 
pragma solidity >=0.4.0 <0.9.0;

pragma experimental ABIEncoderV2;

contract AssuranceContract {
    struct AssuranceData {
        address owner;
        string dateDebut;
        string dateFin;
        string zipFile;
        string assuranceType;
        string name;
        string cin;
        string marque;
        string model;
        uint256 price;
    }

    AssuranceData public assuranceData;

    function setAssurance(string memory _dateDebut, string memory _dateFin, string memory _zipFile, string memory _assuranceType, string memory _name, string memory _cin, string memory _marque, string memory _model, uint256 _price) public {
        assuranceData = AssuranceData({
            owner: msg.sender,
            dateDebut: _dateDebut,
            dateFin: _dateFin,
            zipFile: _zipFile,
            assuranceType: _assuranceType,
            name: _name,
            cin: _cin,
            marque: _marque,
            model: _model,
            price: _price
        });
    }

    function getAssurance() public view returns (AssuranceData memory) {
        return assuranceData;
    }
}
