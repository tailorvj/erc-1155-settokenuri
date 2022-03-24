require("dotenv").config();

const HDWalletProvider = require("@truffle/hdwallet-provider");

const fs = require("fs");
const mnemonic = fs.readFileSync("../.secret").toString().trim();

const myWallet = new HDWalletProvider(
  mnemonic,
  `${process.env.POLYGON_ENDPOINT}`
);

console.log(myWallet.getAddresses());
