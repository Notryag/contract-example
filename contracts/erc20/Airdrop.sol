// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "./IERC20.sol";

contract Airdrop {
    IERC20 public tokenContract;
    address public owner;

    constructor(address _tokenCOntractAddress) {
        tokenContract = IERC20(_tokenCOntractAddress);
        owner = msg.sender;
    }

    function oneToMany(address[] memory _to, uint256 _amount) public {
        require(msg.sender == owner, "only the owner can airdrop tokens");
        uint256 totalAmount = _to.length * _amount;
        require(
            tokenContract.balanceOf(address(this)) >= totalAmount,
            "not enougth tokens in the contract"
        );

        for (uint256 i = 0; i < _to.length; i++) {
            tokenContract.transfer(_to[i], _amount);
        }
    }

    function oneToOne(address[] memory _to, uint256[] memory _amount) public {
        require(msg.sender == owner, "only the owner can airdrop tokens");
        uint256 totalAmount = 0;
        for (uint256 i = 0; i < _amount.length; i++) {
            totalAmount += _amount[i];
        }
        require(
            tokenContract.balanceOf(address(this)) >= totalAmount,
            "not enough tokens in the contract"
        );
        for (uint256 i = 0; i < _to.length; i++) {
            tokenContract.transfer(_to[i], _amount[i]);
        }
    }
}
