# ClimateDAO
This is a DAO created in an attempt to learn more about the Ethereum blockchain and EVM. This is a mock DAO that would in theory be using its treasury to fund climate related projects and offsets. This project will go over membership NFTs with the <a href="https://ethereum.org/en/developers/docs/standards/tokens/erc-1155/"><b>ERC-1155</b></a> standard, ERC20 tokens, and governance and treasury contracts.

# What is a DAO?
A DAO is a decentralized Autonomous Organization. It's an organization with no central leadership and decisions get made from the bottom up. 
Simply put, it's a community of people with shared resources and decisions are made by voting on different proposals members create.
When a proposal gets enough votes, it gets executed on-chain.

Members can use governance tokens to vote on proposals, votes will be submitted on-chain. Voting power formulas can be custom, just because someone has a ton of tokens doesn't mean they have all of the power. 

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