// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const { ethers } = require("hardhat")
const hre = require("hardhat")
const { TASK_COMPILE_SOLIDITY_CHECK_ERRORS } = require("hardhat/builtin-tasks/task-names")
const { items } = require("../src/items.json")

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), 'ether')
}

async function main() {
const [deployer] = await ethers.getContractFactory("d3clothes")
const D3clothes = await D3clothes.deploy()
await D3clothes.deployed()

console.log(`Deployed d3clothes contract at: ${D3clothes.address}\n`)
//listing items
for(let i = 0; i <items.length; i++){
const transaction = await D3clothes.connect(deployer).list(
  items[i].id,
  items[i].name,
  items[i].category,
  items[i].image,
  tokens(items[i].price),
  items[i].rating,
  items[i].stock,

)
await transaction.wait()
}


}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
