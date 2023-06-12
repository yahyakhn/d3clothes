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
import { isCompositeComponentWithType } from 'react-dom/test-utils'

function App() {
const [account, setAccount] = useState(null) //this makes the site stateful (remembers the previous state)
const [provider, setProvider] = useState(null)
const [D3clothes, setd3clothes] = useState(null)


const [electronics, setElectonics] = useState(null)
const [clothing, setClothing] = useState(null)
const [toys, setToys] = useState(null)

const togglePop = () =>{
  console.log ("togglepop...")
}

  async function loadblockchainData() {
    //connect to blockchain(we have to use ethers provider)
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    setProvider(provider)

    const network = await provider.getNetwork()
    console.log(network)

    //connect to the smart contract (create JS version)
    const D3clothes = new ethers.Contract(config[network.chainId].D3clothes.address, d3clothes, provider)
    setd3clothes(D3clothes)
  //load products
    const items = []
    for (var i = 0 ; i < 9; i++){
      const item = await D3clothes.items(i + 1)
      items.push(item)
    }
     const electronics = items.filter((item) => item.category === 'electronics') 
     const toys = items.filter((item) => item.category === 'toys') 
     const clothing = items.filter((item) => item.category === 'clothing') 

     setClothing(clothing)
     setElectonics(electronics)
     setToys(toys)
  }

useEffect(()=> {
  loadblockchainData()
},[])//[] is empty string

  return (
    <div>
      <Navigation account={account} setAccount={setAccount} ></Navigation>

      <h2>our best sellers</h2>
      {electronics && clothing && toys &&(
        <>
        <Section title ={"clothing & Jewelry"} items={clothing} togglePop={togglePop}/>
        <Section title ={"electronics"} items={electronics} togglePop={togglePop}/>
        <Section title ={"Toys"} items={toys} togglePop={togglePop}/>
        </>
      )}
      {/* <p>{account}</p>
       */}

    </div>
  );
}

export default App;
