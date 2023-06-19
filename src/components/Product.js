import { useEffect, useState } from 'react'
import { ethers } from 'ethers'

// Components
import Rating from './Rating'

import close from '../assets/close.svg'

const Product = ({ item, provider, account, D3clothes, togglePop }) => {
  const [order, setOrder] = useState(null)
  const [hasBought, setHasBought] = useState(false)

  const fetchDetails = async () => {
    const events = await D3clothes.queryFilter("Buy")
    const orders = events.filter(
      (event) => event.args.buyer === account && event.args.itemId.toString() === item.id.toString()
    )

    if (orders.length === 0) return

    const order = await D3clothes.orders(account, orders[0].args.orderId)
    setOrder(order)
  }



  const buyHandler = async () => {
    const signer = await provider.getSigner()

    // Buy item...
    let transaction = await D3clothes.connect(signer).buy(item.id, { value: item.cost })
    await transaction.wait()

    setHasBought(true)
  }

  
  useEffect(() => {
    fetchDetails()
  }, [hasBought])


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
     <h2> {ethers.utils.formatUnits(item.cost.toString(), 'ether')} ETH</h2>

      <hr />
      <h2>Overview</h2>
      <p>
        {item.description}
        lorem
        
      </p></div>
      <div className="product__order">
       <h1>{ethers.utils.formatUnits(item.cost.toString(), 'ether')} ETH</h1>
       <p>
        FREE DELIVERY <br />
        <strong>
          {new Date(Date.now()+3456000).toLocaleDateString(undefined, { weekday : 'long', month : 'long', day: 'numeric'})}
        </strong>
       </p>
       {
        item.stock > 0 ? (
          <p>in stock.</p>
        ) : (
          <p>out of stock.</p>
        )
       }
       <button className='product__buy' onClick={buyHandler}>
        Buy now
       </button>

       <p><small>Ships from</small>d3clothes</p>
       <p><small>SOld by</small>d3clothes</p>

       {order && (
        <div className="product__bought">
          Item bought on <br />
          <strong>
            {new Date(Number(order.time.toString()+'ooo')).toLocaleDateString(
              undefined,
              {
                weekday : 'long',
                hour : 'numeric',
                minute : 'numeric',
                second : 'numeric'
              }
            )}
          </strong>
        </div>
       )}

    </div>
    <button onClick={togglePop} className="product__close">
      <img src={close} alt="close" />
    </button>
    </div>
</div>
  );
}

export default Product;