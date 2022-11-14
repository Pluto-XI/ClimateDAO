import { useAddress, ConnectWallet, useContract, useNFTBalance, Web3Button } from '@thirdweb-dev/react';
import { useState, useEffect, useMemo } from 'react';

const App = () => {
  // Use the hooks thirdweb give us.
  const address = useAddress();
  console.log("👋 Address:", address);
  
  //Initialize our edition drop address
  const editionDropAddress = "0xe19e046fa7135d081f7e39535E8E48fF6453735d";
  const { contract: editionDrop } = useContract(editionDropAddress, "edition-drop");
  //Hook to check if user has an NFT
  const { data: nftBalance } = useNFTBalance(editionDrop, address, "1");


  const hasClaimedNFT = useMemo(() => {
    return nftBalance && nftBalance.gt(0);
  }, [nftBalance]);

  // This is the case where the user hasn't connected their wallet
  // to your web app. Let them call connectWallet.
  if (!address) {
    return (
      <div className="landing">
        <h1>Welcome to ClimateDAO</h1>
        <div className="btn-hero">
          <ConnectWallet />
        </div>
      </div>
    );
  }


  if (hasClaimedNFT) {
    return (
      <div className='member-page'>
        <h1>ClimateDAO Membership Page</h1>
        <p>Welcome to the DAO!</p>
      </div>
    )
  }

  // This is the case where we have the user's address
  // which means they've connected their wallet to our site!
  return (
    <div className="mint-nft">
      <h1>Mint your 🌲ClimateDAO membership NFT.</h1>
      <div className="btn-hero">
        <Web3Button
          contractAddress={editionDropAddress}
          action={contract => {
            contract.erc1155.claim(1, 1);
          }}
          onSuccess={() => {
            console.log(`🌊 Successfully Minted! Check it out on OpenSea: https://testnets.opensea.io/assets/${editionDrop.getAddress()}/1`);
          }}
          onError={error => {
            console.error("Failed to mint NFT", error);
          }}
        >
          Join the ClimateDAO
        </Web3Button>
      </div>
    </div>
  )
}

export default App;