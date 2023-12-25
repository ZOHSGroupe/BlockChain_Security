// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Employees {
    string fullname;

    constructor(){
        fullname="Ziad Ben Saada";
    }
    function setEmployee(string memory value) public{
        fullname=value;
    }
    function getEmployee() public view returns(string memory){
        return fullname;
    }
}
