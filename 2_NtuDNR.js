const NtuDNR = artifacts.require("NtuDNR"); // importing artifacts from Truffle compile

module.exports = function (deployer) {
    // deployer is an object provided by Truffle to handle migration
    deployer.deploy(NtuDNR); // now, we ask deployer to deploy our Bank.sol contract
};