require("@nomiclabs/hardhat-waffle");

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.4",
  paths: {
    artifacts: './src/artifacts',
  },
  networks: {
    matic: {
      url: "https://polygon-mumbai.g.alchemy.com/v2/ARj01REYbwiY0JV4vVcq0ePisK4ri3RI",
      accounts: ["7247fc488d7898195aee3d26bf4a5d467a9eccfe25ae614db4c69ff61b874697"]
    }
  },
};
