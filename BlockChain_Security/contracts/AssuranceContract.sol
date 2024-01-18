// SPDX-License-Identifier: MIT 
pragma solidity >=0.4.0 <0.9.0;

contract AssuranceContract {
    address owner;
    uint256 dateDebut;
    uint256 dateFin;
    string zipFile;
    string assuranceType;
    string name;
    string cin;
    string marque;
    string model;

    function setAssurance(uint256 _dateDubut,uint256 _dateFin,string memory _zipFile,string memory _assuranceType,string memory _name,string memory _cin,string memory _marque,string memory _model) public{
        dateDebut=_dateDubut;
        dateFin=_dateFin;
        zipFile=_zipFile;
        assuranceType=_assuranceType;
        name=_name;
        cin=_cin;
        marque=_marque;
        model=_model;
    }
    function getAssurance() public view returns(address _owner,uint256 _dateDubut,uint256 _dateFin,string memory _zipFile,string memory _assuranceType,string memory _name,string memory _cin,string memory _marque,string memory _model){
        return(owner,dateDebut,dateFin,zipFile,assuranceType,name,cin,marque,model);
    }
}