import { useEffect, useState } from 'react'
import { ethers } from 'ethers'

// Components
import Rating from './Rating'

import close from '../assets/close.svg'

const Product = ({ item, provider, account, d3clothes, togglePop }) => {

  return (
    <div className="product">
      <div className="product__details">
        <div className="product__image">
          <img src={item.image} alt="product" />
    </div >
    <div className="product__overview">
      <h1>{item.name}</h1>
      <Rating value={item.rating} />
      
      <hr />
      <p>{item.address}</p>
      <h2>{ethers.utils.formatUnits(item.cost.toString(), 'ehter')}ETH</h2>

      <hr />
      <h2>Overview</h2>
      <p>
        {item.description}
        lorem25
        
      </p>

    </div>
    </div>
    </div>
  );
}

export default Product;