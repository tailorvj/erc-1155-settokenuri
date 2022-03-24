const contract = artifacts.require("ERC1155SetTokenURI");

module.exports = async function (deployer) {
  await deployer.deploy(contract);
};
