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

### Deploy ERC 20 Token
Once again Thirdweb made it just a function we justneed to pass an object into. We set the name and symbol and now it lives forever on the blockchain 
here: 0x06e1D6387142fbe97B4dB57ee4D12D0cB5AB3493. We then used our "print money" script to set a token supply from then we whiched airdropped tokens.

## Governance
This was a fun part! We got our ERC-20 tokens running, we have our membership NFTs and our webview at this point can authenticate with a wallet.
We used a script to deploy our governance contract, which again is a standard that can be found <a href="https://docs.openzeppelin.com/contracts/4.x/api/governance?utm_source=buildspace.so&utm_medium=buildspace_project">here.</a>. Thirdweb uses this exact contract <a href="https://github.com/thirdweb-dev/contracts/blob/main/contracts/vote/VoteERC20.sol?utm_source=buildspace.so&utm_medium=buildspace_project">here</a>.

At this point we have built 3 contracts, our ERC-1155 membership NFT, our ERC-20 token contract, and our voting contract.

## Treasury
The voting contract itself doesn't have the ability to move tokens around because <b>we created the supply</b>. Our wallet owns access to the entire
supply. So only we have the power to airdop them, move them, etc. We need to transfer funds to our voting contract. 
I will transfer 90% into the contract. This way the voting contract itself will have the supply and it will become our DAO's treasury.