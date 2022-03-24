const contract = artifacts.require("PolyAP");

module.exports = async function (deployer) {
  await deployer.deploy(contract);
};
