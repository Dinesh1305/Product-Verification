require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config(); // ✅ Load .env variables
//0x5424D9e81e0Ad39fb00Fe43d650eE7995D49cE07   address
module.exports = {
  solidity: "0.8.28",
  networks: {
    sepolia: {
      url: process.env.API_URL || "", // ✅ Ensure API_URL is not undefined
      accounts: process.env.PRIVATE_KEY ? [`0x${process.env.PRIVATE_KEY}`] : [] // ✅ Ensure PRIVATE_KEY is valid
    }
  }
};
