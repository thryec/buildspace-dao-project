import { ethers } from "ethers";
import sdk from "./1-initialize-sdk.js";

const voteModule = sdk.getVoteModule(
  "0x05Fee3005C2286B01BcE90Dc53761511A835eF3c"
);
const tokenModule = sdk.getTokenModule(
  "0x0486f641B798fe44B29Dc2CEdE51C5Ee9EF4ab0C"
);

(async () => {
  try {
    await tokenModule.grantRole("minter", voteModule.address);
    console.log(
      "Successfully gave vote module permissions to act on token module"
    );
  } catch (error) {
    console.error(
      "failed to grant vote module permissions on token module",
      error
    );
    process.exit(1);
  }

  try {
    const ownedTokenBalance = await tokenModule.balanceOf(
      process.env.WALLET_ADDRESS
    );

    const ownedAmount = ethers.BigNumber.from(ownedTokenBalance.value);
    const percent90 = ownedAmount.div(100).mul(90);

    await tokenModule.transfer(voteModule.address, percent90);
    console.log("✅ Successfully transferred tokens to vote module");
  } catch (err) {
    console.error("failed to transfer tokens to vote module", err);
  }
})();
