import { ethers } from "ethers";
import sdk from "./1-initialize-sdk.js";
import { readFileSync } from "fs";

const app = sdk.getAppModule("0xdb81d22fE93B44d08B2EABc49C2c8025A6DDFa33");

(async () => {
  try {
    const bundleDropModule = await app.deployBundleDropModule({
      name: "BoulderDAO Membership",
      description: "A DAO for all climbers alike.",
      image: readFileSync("scripts/assets/mountain.png"),
      primarySaleRecipientAddress: ethers.constants.AddressZero,
    });

    console.log(
      "✅ Successfully deployed bundleDrop module, address:",
      bundleDropModule.address
    );
    console.log(
      "✅ bundleDrop metadata:",
      await bundleDropModule.getMetadata()
    );
  } catch (error) {
    console.log("failed to deploy bundleDrop module", error);
  }
})();
