import sdk from "./1-initialize-sdk.js";
import { readFileSync } from "fs";

(async () => {
  try {
    const editionDrop = await sdk.getContract("0xe19e046fa7135d081f7e39535E8E48fF6453735d", "edition-drop");
    await editionDrop.createBatch([
      {
        name: "Lone Tree",
        description: "This NFT will give you access to ClimateDAO!",
        image: readFileSync("scripts/assets/trees.jpeg"),
      },
    ]);
    console.log("✅ Successfully created a new NFT in the drop!");
  } catch (error) {
    console.error("failed to create the new NFT", error);
  }
})();
