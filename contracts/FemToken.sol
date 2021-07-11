// SPDX-License-Identifier: MIT

import '../node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol';

pragma solidity >=0.4.0 <0.9.0;

contract FemToken is ERC20{
    constructor () ERC20("FemToken", "FEM"){
        _mint(msg.sender, 1000000000 * (10 ** uint256(decimals())));
    }
}