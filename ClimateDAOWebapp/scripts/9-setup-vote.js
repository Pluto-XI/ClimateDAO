import sdk from './1-initialize-sdk.js';

(async () => {
    try {
        //This is our governance contract
        const vote = await sdk.getContract('0xbbdf71398E67C42e356DC94c5D56e90720F9BE6F', 'vote');
        //ERC-20 contract
        const token = await sdk.getContract('0x06e1D6387142fbe97B4dB57ee4D12D0cB5AB3493', 'token');
        //Give the treasury the power to mint additional tokens if needed.
        await token.roles.grant("minter", vote.getAddress());

        console.log(
            "Successfully gave vote contract permissions to act on token contract"
        );
        
    } catch (error) {
        console.error("Failed to grant vote contract permissions on token contract.", error);
        process.exit(1);
    }

    try {
        //This is our governance contract
        const vote = await sdk.getContract('0xbbdf71398E67C42e356DC94c5D56e90720F9BE6F', 'vote');
        //ERC-20 contract
        const token = await sdk.getContract('0x06e1D6387142fbe97B4dB57ee4D12D0cB5AB3493', 'token');
        //Grab our wallet's token balance
        const ownedTokenBalance = await token.balanceOf(process.env.WALLET_ADDRESS);

        //grab 50% of the supply we hold.
        // Grab 90% of the supply that we hold.
        const ownedAmount = ownedTokenBalance.displayValue;
        const percent50 = Number(ownedAmount) / 100 * 50;



        await token.transfer(
            vote.getAddress(),
            percent50
        );
        console.log("✅ Successfully transferred " + percent50 + " tokens to vote contract");
        
    } catch (error) {
        console.error("Failed to transfer tokens to vote contract", error);
    }

})();