import sdk from "./1-initialize-sdk.js";

const bundleDrop = sdk.getBundleDropModule(
  "0xBf1BD7D52A6BbdA2d27D7C6D4217b5A3b7c7971D"
);

(async () => {
  try {
    const claimConditionFactory = bundleDrop.getClaimConditionFactory();
    claimConditionFactory.newClaimPhase({
      startTime: new Date(),
      maxQuantity: 50_000,
      maxQuantityPerTransaction: 1,
    });

    await bundleDrop.setClaimCondition(0, claimConditionFactory);
    console.log(
      "✅ Sucessfully set claim condition on bundle drop:",
      bundleDrop.address
    );
  } catch (error) {
    console.error("Failed to set claim condition", error);
  }
})();
