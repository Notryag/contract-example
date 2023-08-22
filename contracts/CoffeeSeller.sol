// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

contract CoffeeSeller {
    uint256 public totalCoffees;
    
    address payable public owner;

    event NewCoffee(
        address indexed from,
        string name,
        string message,
        uint256 timestamp
    );

    constructor () payable {
        owner = payable(msg.sender);
    }
    struct Coffee {
        address giver;
        string name;
        string message;
        uint256 timestamp;
    }

    Coffee[] public coffees;

    function buyCoffee(string memory _name, string memory _message) public payable {
        uint256 price = 0.01 ether;

        require(msg.value >= price, "Not enough Ether sent for a coffee");
        uint256 _timestamp = block.timestamp;

        coffees.push(Coffee(msg.sender, _name, _message, _timestamp));
        totalCoffees += 1;

        (bool success, ) = owner.call{value: msg.value}("");
        require(success, "Failed to send Ether");

        emit NewCoffee(msg.sender, _name, _message, _timestamp);
    }

    function getTotalCoffee() public view returns (uint256) {
        return coffees.length;
    }

    function getCoffess() public view returns (Coffee[] memory) {
        return coffees;
    }

    function withdraw() public {
        require(msg.sender == owner, "Only the owner can withdraw");
        payable(msg.sender).transfer(address(this).balance);
    }
    
}