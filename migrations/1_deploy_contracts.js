const FemToken = artifacts.require("../contracts/FemToken.sol")

module.exports = function(deployer){
    deployer.deploy(FemToken)
}