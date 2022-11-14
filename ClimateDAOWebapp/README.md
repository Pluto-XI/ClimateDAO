## ClimateDAO Front-end 
#### created with Buildspace x Thirdweb
This is a React app using the Thirdweb SDK to simplify our lives.

```
npm install
npm start
```
## Initializing Thirdweb SDK
From here we had to create an environment with our private key, public address, and quicknode api url. 
Quicknode essentially broadcasts our contract creation transaction so that it can be picked up and mined as fast as possible.

Thirdweb is initialized in our ```1-initialize-sdk.js``` script. Essentially all it does is get our info from our env file and uinitialize 
variables with this info.

## Creating an ERC-1155 token with the SDK
Our second script here allows us to create the metadata for the token and deploy it on our testnet. It's pretty wild
seeing how easy the SDK makes this type of development. Traditionally we would have to write out the solidity code by extending the ERC-1155 standard,
fill in our metadata and additional functions and deploy it manually. Where-as here it's all done for you, you just provide the data and keys.
If you want to see what the code actually was it can be found <a href="https://github.com/thirdweb-dev/contracts/blob/main/contracts/drop/DropERC1155.sol?utm_source=buildspace.so&utm_medium=buildspace_project">here</a>.

### Deploying NFT metadata
We need to deploy our metadata associated with our membership NFT. In script 3 we create the metadata for an ERC-1155 drop and in script 4
we set the claim conditions for the NFT.

### Claim Conditions
From there we have pretty much finished our membership NFT and they can be minted. We just need to set the claim conditions now. 