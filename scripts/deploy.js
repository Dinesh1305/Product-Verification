const { ethers } = require("hardhat");

async function main() {
  // Get the Contract Factory
  const Products = await ethers.getContractFactory("Products");
  
  console.log("Deploying contract...");
  
  // Deploy the contract
  const products = await Products.deploy();
  await products.deployed();
  
  console.log("Contract deployed at:", products.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
