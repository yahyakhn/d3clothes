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
const [account, setAccount] = useState(null) //this makes the site stateful (remembers the previous state)
const loadblockchainData = async() => {
  //connect to blockchain(we have to use ethers provider)
  const provider = new ethers.providers.Web3Provider(window.ethereum)
  setProvider(provider) 


  const network = await provider.getNetwork()
  console.log(network)
  //connect to smart contracts(load js versions)
  

  //load blockchain data
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
