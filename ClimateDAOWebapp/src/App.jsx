import { useAddress, ConnectWallet, useContract, useNFTBalance, Web3Button } from '@thirdweb-dev/react';
import { useState, useEffect, useMemo } from 'react';

const App = () => {
  // Use the hooks thirdweb give us.
  const address = useAddress();
  console.log("👋 Address:", address);
  
  //Initialize our edition drop address
  const editionDropAddress = "0xe19e046fa7135d081f7e39535E8E48fF6453735d";
  const ercTokenAddress = '0x06e1D6387142fbe97B4dB57ee4D12D0cB5AB3493';
  
  const { contract: editionDrop } = useContract(editionDropAddress, "edition-drop");
  const { contract: token } = useContract(ercTokenAddress, 'token');

  //Hook to check if user has an NFT
  const { data: nftBalance } = useNFTBalance(editionDrop, address, "1");


  const hasClaimedNFT = useMemo(() => {
    return nftBalance && nftBalance.gt(0);
  }, [nftBalance]);

  //Holds the amount of token each member has in state
  const [memberTokenAmounts, setMemberTokenAmounts] = useState([]);
  //The array holding all of our member addresses.
  const[memberAddresses, setMemberAddresses] = useState([]);

  //A function to shorten someone's wallet address
  const shortenAddress = (address) => {
    return address.substring(0,6) + '...' + address.substring(address.length - 4);
  };

  //Use effect grabs all the addresses from members holding the NFT
  useEffect(() => {
    if (!hasClaimedNFT) {
      return;
    }

    //Grab the users who hold the NFT with token id 1
    const getAllAddresses = async () => {
      try {
        const memberAddresses = await editionDrop?.history.getAllClaimerAddresses(1);
        setMemberAddresses(memberAddresses);
        console.log('🚀 Members addresses', memberAddresses);
      } catch (error) {
        console.error("Failed to get member list", error);
      }
    };
    getAllAddresses();
  }, [hasClaimedNFT, editionDrop?.history]);

  //this useEffect grabs the # of token each member holds
  useEffect(() => {
    if (!hasClaimedNFT) {
      return;
    }

    const getAllBalances = async () => {
      try {
        const amounts = await token?.history.getAllHolderBalances();
        setMemberTokenAmounts(amounts);
        console.log('Amounts', amounts);
      } catch (error) {
        console.error("Failed to get balances", error);
      }
    };
    getAllBalances();
  }, [hasClaimedNFT, token?.history]);

  const memberList = useMemo(() => {
    return memberAddresses.map((address) => {
      //Check to see if the address is in the memberTokenAmounts array
      //If true, return amount of token member has,
      //else return 0
      const member = memberTokenAmounts?.find(({ holder }) => holder === address);

      return {
        address,
        tokenAmount: member?.balance.displayValue || '0',
      };
    });
  }, [memberAddresses, memberTokenAmounts]);


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