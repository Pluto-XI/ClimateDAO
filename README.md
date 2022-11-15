# ClimateDAO
This is a DAO created in an attempt to learn more about the Ethereum blockchain and EVM. This is a mock DAO that would in theory be using its treasury to fund climate related projects and offsets. This project will go over membership NFTs with the <a href="https://ethereum.org/en/developers/docs/standards/tokens/erc-1155/"><b>ERC-1155</b></a> standard, ERC20 tokens, and governance and treasury contracts.

#### The site was deployed on Netlify and can be seen <a href="https://legendary-beignet-2835dd.netlify.app/"><b>here</b></a>.

# What is a DAO?
A DAO is a decentralized Autonomous Organization. It's an organization with no central leadership and decisions get made from the bottom up. 
Simply put, it's a community of people with shared resources and decisions are made by voting on different proposals members create.
When a proposal gets enough votes, it gets executed on-chain.

Members can use governance tokens to vote on proposals, votes will be submitted on-chain. Voting power formulas can be custom, just because someone has a ton of tokens doesn't mean they have all of the power.

Our DAO has 3 main contracts.

Our voting/governance contract: 0xbbdf71398E67C42e356DC94c5D56e90720F9BE6F
Our Governance Token, ERC-20: 0x06e1D6387142fbe97B4dB57ee4D12D0cB5AB3493
Our ERC-1155 Membership NFT: 0xe19e046fa7135d081f7e39535E8E48fF6453735d

These can be looked at on Etherscan on the <a href="https://goerli.etherscan.io/token/0x06e1d6387142fbe97b4db57ee4d12d0cb5ab3493?a=0xbbdf71398E67C42e356DC94c5D56e90720F9BE6F">Goerli test network.</a>

### Creating a web app to manage membership and proposals
This app will allow users to connect their ETH wallets, mint a membership NFT, receive airdrop tokens, and actually vote on any DAO proposals.
<b>Metamask</b> will allow our browser to call functions on smart contracts and provides an Ethereum address and private key. It's like authentication, and let's
users "login" to the DAO, or any dapp. We'll be running on the <b>Goerli Test Network</b>. If you're looking at how this was made and are trying the same, here
is the faucet I used to get some test Eth. <a href="https://goerlifaucet.com/">Goerli Faucet</a>. Also <b>PLEASE DO NOT COMMIT YOUR PRIVATE KEY TO GITHUB</b> this is how you get robbed.

We used <a href="https://portal.thirdweb.com/sdk">Thirdweb's front-end SDK</a> to speed up development here. We used it to create a "Connect to Wallet" button and to connect to the right chainID.

## DAO membership NFTs
Now that thirdweb helped us connect to a user's wallet, we can check if they're in the DAO. The user needs a membership NFT and if they don't have one we'll 
prompt them to mint one. Thirdweb really speeds up the process here, we can avoid writing any solidity because they've already done it all for us.
We just need to write a script to create/deploy with the <a href="https://github.com/thirdweb-dev/contracts">standard contracts</a> they have made.

Using the SDK we simplified our lives and used the SDK to deploy our contract from our wallet. 
It is located here: 0xe19e046fa7135d081f7e39535E8E48fF6453735d.

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

This contract is where we can create proposals and the whole shebang. 

## Treasury
The voting contract itself doesn't have the ability to move tokens around because <b>we created the supply</b>. Our wallet owns access to the entire
supply. So only we have the power to airdop them, move them, etc. We need to transfer funds to our voting contract. 
I will transfer 90% into the contract. This way the voting contract itself will have the supply and it will become our DAO's treasury.


## Thirdweb SDK
This SDK really sped up development, it was wild seeing what I could do with just node and javascript.
To recap.

✅ deployed my own custom ERC-20 token.

✅ deployed my own ERC-1155 NFT people can mint to join my DAO.

✅ deployed my own governance contract + treasury.

✅ built a dapp that lets people connect their wallet, get an NFT, see a DAO Dashboard where they can see other members + actually vote on proposals that are executed directly by your governance contract.

Maybe in the future I'll pick up some tokenomics, learn about running an actual community and planning some road maps. But for now, here it lives on
the Ethereum blockchain. This was a humbling experience. Thank you to the <a href="https://buildspace.so/">buildspace community!</a>