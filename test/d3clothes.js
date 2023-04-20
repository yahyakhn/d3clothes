const { expect } = require("chai")
const { ethers } = require("hardhat")

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), 'ether')
}

describe("d3clothes", () => {
  let D3clothes
  let deployer,buyer

  beforeEach(async() =>{
    //setup accounts(getting fake accounts)
    [deployer,buyer] = await ethers.getSigners()
    // console.log(deployer,buyer)

    //deploy contracts
    const d3clothes = await ethers.getContractFactory("d3clothes")
   D3clothes = await d3clothes.deploy()
  })

  describe("Deployment", () => {
    it("Sets the owner", async() => {
      expect(await D3clothes.owner()).to.equal(deployer.address)
    })
it('has a name' , async()=> {
   
   const name = await D3clothes.name()
   expect(name).to.equal("d3clothes")
})
})

  })
  
