const { expect } = require("chai")
const { ethers } = require("hardhat")

//for simplification of way to ether
const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), 'ether')
}
const ID = 1
const NAME = "shoes"
const CATEGORY = "footwear"
const IMAGE = "IMAGE"
const COST = tokens(1)
const RATING = 5
const STOCK = 45
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
describe("listing", ()=> {
})
describe("buying", () => {
let transaction 

  beforeEach(async() =>{
    transaction = await D3clothes.connect(deployer).list(
      ID,
      NAME,
      CATEGORY,
      IMAGE,
      COST,
      RATING,
      STOCK
    )
    await transaction.wait()

    //buy an item
    transaction = await D3clothes.connect(buyer).buy(ID, {value: COST})
    
  })
  
  
  it("Updates buyer order coutn", async() => {
    const result = await D3clothes.orderCount(buyer.address)
    expect(result).to.equal(1)
  })

  it("adds order ", async() => {
    const order = await D3clothes.orders(buyer.address, 1)

    expect(order.time).to.be.greaterThan(0)
    expect(order.item.name).to.equal(NAME)
  })
it("Updates the contract balance ", async() => {
    const result = await ethers.provider.getBalance(D3clothes.address)
    expect(result).to.equal(COST)
  })

  it("emits a bbuy event ", () => {
    expect(transaction).to.emit(D3clothes, "Buy")
  })

  })


describe("Withdrawing", () =>{
  let balanceBefore
    beforeEach(async() =>{
      transaction = await D3clothes.connect(deployer).list(
        ID,
        NAME,
        CATEGORY,
        IMAGE,
        COST,
        RATING,
        STOCK
      )
      await transaction.wait()
      transaction = await D3clothes.connect(buyer).buy(ID, { value: COST })
      await transaction.wait()

      //get balance before
      balanceBefore = await ethers.provider.getBalance(deployer.address)

      //withdraw
      transaction = await D3clothes.connect(deployer).withdraw()
      await transaction.wait()
  })
  it("Updates the balance", async() => {
    const balanceAfter = await ethers.provider.getBalance(deployer.address)
    expect(balanceAfter).to.be.greaterThan(balanceBefore)
  })
  it("updates the contract balance", async function () {
      const result = await ethers.provider.getBalance(D3clothes.address)
      expect(result).to.equal(0)
    })
})
})