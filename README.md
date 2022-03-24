# erc-1155-settokenuri

Mint ERC-1155 NFTs on demand

HELP WANTED: Please write tests for this repo and send a pull request

This is a basic Truffle project with an ERC-1155 contract that implements setTokenURI(), which allows minting on demand

We are using parts of this code in https://artwork.rocks

Below are instructions for deployment and minting using Truffle. This solution is minimal on purpose and is here for educational purposes only

This guide assumes you have a wallet with enough tokens in it for contract deployment and minting. If your wallet is empty, there are various faucets that will provide you with free tokens for testing purposes

It also assumes you have the passphrase at hand. Please be careful with your credentials. It is advised to use a separate wallet just for smart contract purposes

Warning: Since you are going to save your passpharse to a file, if your computer is hacked, they are going to have your crypto wallet! Please be careful

## Setup

```bash
$ yarn install
```

rename .env-example to .env and set your blockchain RPC endpoints. truffle-config.js has Polyon Mumbai, Polygon Mainnet and Ethereum Rinkeby defined in it. If you need other networks, add their RPC endpoints to .env and define the networks in truffle-config.js

rename .secret-example to .secret and place your contract admin passphrase in there instead of the example passphrase

Rename /contracts/ERC1155SetTokenURI.sol to a name of your choice for your contract

Open the contract for editing, search and replace the original contract name with your new name (there are 2 locations in this file + a few in other files described below)

Rename /migrations/2_deploy_erc1155settokenuri.js to 2_deploy_yourcontractname.js

Change the name of the contract in the following line to your contract (Case sensitive)

```javascript
const contract = artifacts.require("ERC1155SetTokenURI");
```

## Deploy contract

Replace mumbai with rinkeby or polygon for deployment to the Ethereum testnew and the Polygon Mainnet, respectively

```bash
$ npx truffle migrate --network mumbai
```

## Publish image and metadata to IPFS

There are quite a few options for publishing to a decentralized content network, such as IPFS, Arweave and others. In this example, we are using the Pinata service to pin an image and the NFT metadata to IPFS

Open https://app.pinata.cloud/pinmanager

The /artwork folder has an example image for testing purposes. There is also a GIMP .xcf file for editing, so you can create your own example

Upload your image to Pinata and copy the CID

Edit metadata.json and change the image_url ipfs cid to the one you've just copied from Pinata

Edit the rest of the metadata as you see fit. It will have an effect on your NFT listing on OpenSea and other markets

Upload the metadata file to Pinata and copy the CID

## Minting ERC-1155 NFTs on demand

Truffle is interactive. We are going to use it to mint the ERC-1155 NFT and set the token URI

Open the Truffle interactive shell. If necessary, replace mumbai with the network you've deployed the contract to (rinkeby/polygon)

```bash
$ npx truffle console --network mumbai
```

Verify your contract deployment. Replace ERC1155SetTokenURI with your contract name (case sensitive)

```bash
truffle(mumbai)> contract = await ERC1155SetTokenURI.deployed()

truffle(mumbai)> caddress = contract.address
```

You should get undefined for the first command and the contract address for the second command

### Mint

In the following example, we are minting 7 copies of tokenId 0 and transferring all of them to YOURWALLETADDRESS (replace with your wallet address)

```bash
truffle(mumbai)> (await contract.mint("YOURWALLETADDRESS",0,7,[]))
```

Set the metadata URI for tokenId 0. Replace METADATACIDE with the metadata CID you copied earlier from Pinata

```bash
truffle(mumbai)> (await contract.setTokenURI(0,"https://ipfs.io/ipfs/METADATACIDE"))
```

Verify the token metadata URI. This should return the URI you have just set

```bash
truffle(mumbai)> (await contract.uri(0))
```

### Mint another NFT

Repeat the steps above

* Upload a new image
* Define and upload a new metadata file
* Mint tokenId 1
* Set Token URI for tokenId 1

Every NFT must have a unique id, so increment for each new ERC-1155 NFT you are minting

## Your NFTs on OpenSea

If you have deployed your contract and minted on a testnet, such as Rinkeby or Mumbai, open https://testnets.opensea.io, otherwise open https://opensea.io

Set your MetaMask to the appropriate network and login to OpenSea

Go to your profile

Your NFTs should be there. Wen Moon?!

I hope you've found this code and guide useful. Please send feedback and feature request as issues to this repo

LICENSE: MIT
