import sdk from "./1-initialize-sdk.js";

const appModule = sdk.getAppModule(
  "0xdb81d22fE93B44d08B2EABc49C2c8025A6DDFa33"
);

(async () => {
  try {
    const voteModule = await appModule.deployVoteModule({
      name: "BoulderDAO's Epic Proposals",
      votingTokenAddress: "0x0486f641B798fe44B29Dc2CEdE51C5Ee9EF4ab0C",
      proposalStartWaitTimeInSeconds: 0,
      proposalVotingTimeInSeconds: 24 * 60 * 60,
      votingQuorumFraction: 0,
      minimumNumberOfTokensNeededToPropose: "0",
    });

    console.log(
      "✅ Successfully deployed vote module, address:",
      voteModule.address
    );
  } catch (err) {
    console.log("Failed to deploy vote module", err);
  }
})();
