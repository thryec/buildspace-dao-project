import { ethers } from "ethers";
import sdk from "./1-initialize-sdk.js";

// Our voting contract.
const voteModule = sdk.getVoteModule(
  "0x05Fee3005C2286B01BcE90Dc53761511A835eF3c"
);

// Our ERC-20 contract.
const tokenModule = sdk.getTokenModule(
  "0x0486f641B798fe44B29Dc2CEdE51C5Ee9EF4ab0C"
);

(async () => {
  try {
    const amount = 420_000;
    await voteModule.propose(
      "Should the DAO mint an additional " +
        amount +
        " tokens into the treasury?",
      [
        {
          nativeTokenValue: 0,
          transactionData: tokenModule.contract.interface.encodeFunctionData(
            "mint",
            [voteModule.address, ethers.utils.parseUnits(amount.toString(), 18)]
          ),
          toAddress: tokenModule.address,
        },
      ]
    );

    console.log("✅ Successfully created proposal to mint tokens");
  } catch (error) {
    console.error("failed to create first proposal", error);
    process.exit(1);
  }

  try {
    const amount = 6_900;
    await voteModule.propose(
      "Should the DAO transfer " +
        amount +
        " tokens from the treasury to " +
        process.env.WALLET_ADDRESS +
        " for being awesome?",
      [
        {
          nativeTokenValue: 0,
          transactionData: tokenModule.contract.interface.encodeFunctionData(
            "transfer",
            [
              process.env.WALLET_ADDRESS,
              ethers.utils.parseUnits(amount.toString(), 18),
            ]
          ),

          toAddress: tokenModule.address,
        },
      ]
    );

    console.log(
      "✅ Successfully created proposal to reward ourselves from the treasury, let's hope people vote for it!"
    );
  } catch (error) {
    console.error("failed to create second proposal", error);
  }
})();
