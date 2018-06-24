var Roulette = artifacts.require("./Roulette.sol");
var SimpleRoulette = artifacts.require('./RouletteSimple.sol');

var REQUIRED_BLOCKS = 1;

module.exports = function(deployer) {
  deployer.deploy(Roulette, REQUIRED_BLOCKS);
  deployer.deploy(SimpleRoulette);
};
