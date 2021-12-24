import sdk from "./1-initialize-sdk.js";
import { readFileSync } from "fs";

const bundleDrop = sdk.getBundleDropModule(
  "0xBf1BD7D52A6BbdA2d27D7C6D4217b5A3b7c7971D"
);

(async () => {
  try {
    await bundleDrop.createBatch([
      {
        name: "V9 Stone",
        description: "A rock for everyone",
        image: readFileSync("scripts/assets/stone.png"),
      },
    ]);
    console.log("✅ Successfully created a new NFT in the drop!");
  } catch (error) {
    console.error("failed to create the new NFT", error);
  }
})();
