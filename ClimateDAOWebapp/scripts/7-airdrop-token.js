import sdk from "./1-initialize-sdk";

(async () => {
    try {
        //This is the address to our ERC-1155 membership NFT contract.
        const editionDrop = await sdk.getContract('0xe19e046fa7135d081f7e39535E8E48fF6453735d', 'edition-drop');
        //This is the address to our ERC20 token
        const token = await sdk.getContract('0x06e1D6387142fbe97B4dB57ee4D12D0cB5AB3493', 'token');

        //Grab all the addresses of people who own our membership NFT, which has a token id of 1.
        const walletAddresses = await editionDrop.history.getAllClaimerAddresses(1);

        //Check if any addresses, if not exit.
        if (walletAddresses.length === 0) {
            console.log("No NFTs have been claimed yet.");
            process.exit(0);
        }

        //Loop through the array of addresses and return an array of objects
        const airdropTargets = walletAddresses.map((address) => {
            //Pick a random # between 1000 and 10000.
            const randomAmount = Math.floor(Math.random() * (10000 - 1000 + 1) + 1000);
            console.log("✅ Going to airdrop", randomAmount, "tokens to", address);

            //Set up the target.
            const airdropTarget = {
                toAddress: address,
                amount: randomAmount,
            };

            return airdropTarget;
        });

        //Call transferBatch on all of our airdrop recipients.
        console.log("🌈 Starting airdrop...");
        await token.transferBatch(airdropTargets);
        console.log("✅ Successfully airdropped tokens to all the holders of the NFT!");

    } catch(error) {
        console.error("Failed to airdrop tokens", error);
    }
})();