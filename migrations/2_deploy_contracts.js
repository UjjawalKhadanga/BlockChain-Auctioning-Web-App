const Transfer = artifacts.require("Transfer");
const ItemData = artifacts.require("ItemData");

module.exports = function(deployer){
    deployer.deploy(Transfer);
    deployer.deploy(ItemData);
}