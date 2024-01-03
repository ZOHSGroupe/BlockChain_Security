// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract BookStore {
    address sender;
    string fullname;
    string description;
    uint price;
    
    function sellBook(string memory _fullname,string memory _description,uint _price) public{
        sender=msg.sender;
        fullname=_fullname;
        description=_description;
        price=_price;
    }
    function getBook() public view returns(address,string memory,string memory,uint){
        return(sender,fullname,description,price);
    }
}
