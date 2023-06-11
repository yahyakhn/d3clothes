import { useEffect, useState } from 'react' // importing libraries, useeffect is a hook from react which let us call a function whenever a function is rendered
import { ethers } from 'ethers'

// Components
import Navigation from './components/Navigation'
import Section from './components/Section'
import Product from './components/Product'

// ABIs
import d3clothes from './abis/d3clothes.json'

// Config
import config from './config.json'

function App() {
const [provider, setProvider] = useState(null)
const [D3clothes, setd3clothes] = useState(null)

const [account, setAccount] = useState(null) //this makes the site stateful (remembers the previous state)
const loadblockchainData = async() => {
  //connect to blockchain(we have to use ethers provider)
  const provider = new ethers.providers.Web3Provider(window.ethereum)
  setProvider(provider) 


  const network = await provider.getNetwork()
  console.log(network)
  //connect to smart contracts(load js versions)
  const D3clothes = new ethers.Contract(
    config[network.chainId].d3clothes.address, d3clothes , provider)//abi = abstract binary interface
    setd3clothes(D3clothes)
  //load blockchain data
  const items = []
  for (var i = 0; i < 9; i++){
    const item = await D3clothes.items(i + 1)
    items.push(item)
  }
    const clothing = items.filter((item) => item.category === "clothing")
    const toys = items.filter((item) => item.category === "toys")
    const electronics = items.filter((item) => item.category === "electronics")
    const jewelry = items.filter((item) => item.category === "jewelry")

}
useEffect(()=> {
  loadblockchainData()
},[])//[] is empty string

  return (
    <div>
      <Navigation account={account} setAccount={setAccount} ></Navigation>

      <h2>our best sellers</h2>
      {/* <p>{account}</p>
       */}

    </div>
  );
}

export default App;
