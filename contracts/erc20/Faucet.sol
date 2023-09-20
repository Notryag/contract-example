// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "./IERC20.sol";

contract Faucet {
    IERC20 public tokenContract;
    uint256 public amountEachTime;
    mapping(address => uint256) public recivedRecord;
    address public owner;


    constructor(address _tokenContract, uint256 _amountEachTime) {
        tokenContract = IERC20(_tokenContract);
        amountEachTime = _amountEachTime;
        owner = msg.sender;
    }
    // 领取代币, 领取时间需要限制
    function withdraw() external {
        if(recivedRecord[msg.sender] > 0) {
            require(recivedRecord[msg.sender] - block.timestamp >= 1 days,
                "you can only request tokens once every 24 hours"
            );
        }
        require(
            tokenContract.balanceOf(address(this)) >= amountEachTime,
            "Not enougth tokens in the contract"
        );
        recivedRecord[msg.sender] = block.timestamp;
        tokenContract.transfer(msg.sender, amountEachTime);

    }

    function setAmountEachTime(uint256 _amountEachTime) public {
        require(msg.sender == owner, "only owner can set the amount");
        amountEachTime = _amountEachTime;
    }


}
 