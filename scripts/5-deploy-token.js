import sdk from "./1-initialize-sdk.js";

const app = sdk.getAppModule("0xdb81d22fE93B44d08B2EABc49C2c8025A6DDFa33");

(async () => {
  try {
    const tokenModule = await app.deployTokenModule({
      name: "BoulderDAO Governance Token",
      symbol: "CLIMB",
    });
    console.log(
      "✅ Successfully deployed token module, address:",
      tokenModule.address
    );
  } catch (error) {
    console.error("failed to deploy token module", error);
  }
})();
