var Roulette = artifacts.require("./Roulette.sol");

val REQUIRED_BLOCKS = 1;

module.exports = function(deployer) {
  deployer.deploy(Roulette, REQUIRED_BLOCKS);
};
