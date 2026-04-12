import { useState, useContext } from 'react' 
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { removeFromCart, increaseQty, decreaseQty, clearCart } from '../redux/slices/cartSlice'
import { AuthContext } from '../context/AuthContext'
import './Cart.css'

function Cart() {
  const { items, totalPrice, totalQty } = useSelector(state => state.cart)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  const { isLoggedIn } = useContext(AuthContext)

  const [loading, setLoading] = useState(false)

  const handleCheckout = async () => {
    const token = localStorage.getItem('token') 

    if (!isLoggedIn) {
      alert("BHAI PEHLE LOGIN KARO!")
      navigate('/login')
      return
    }

    setLoading(true)

    try {
      const response = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify({
          orderItems: items,
          totalPrice: totalPrice
        }),
      })

      if (response.ok) {
        dispatch(clearCart())
        navigate('/orders')
      } else {
        alert("ORDER FAILED. TRY AGAIN.")
      }
    } catch (error) {
      alert("SERVER ERROR. CHECK YOUR INTERNET CONNECTION")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='cart'>

      <div className='cart-header'>
        <div className='cart-header-left'>
          <p className='cart-eyebrow'>
            <span className='cart-eyebrow-line'></span>
            MY CART
          </p>
          <h1 className='cart-title-solid'>CART</h1>
          <h1 className='cart-title-ghost'>ITEMS.</h1>
        </div>
        <div className='cart-header-right'>
          <p className='cart-count'>{totalQty} ITEMS</p>
        </div>
      </div>

      {items.length === 0 ? (
        <div className='cart-empty'>
          <h2 className='cart-empty-title'>CART IS EMPTY.</h2>
          <p className='cart-empty-sub'>Add some products to your cart.</p>
          <Link to='/products' className='cart-empty-btn'>SHOP NOW →</Link>
        </div>
      ) : (
        <div className='cart-body'>
          <div className='cart-items'>
            <div className='cart-items-header'>
              <span>PRODUCT</span>
              <span>PRICE</span>
              <span>QTY</span>
              <span>TOTAL</span>
              <span></span>
            </div>

            {items.map(item => (
              <div key={item._id} className='cart-item'>
                <div className='cart-item-name'>
                  <span className='cart-item-category'>{item.category}</span>
                  <h3>{item.name}</h3>
                </div>

                <span className='cart-item-price'>
                  RS. {item.price.toLocaleString()}
                </span>

                <div className='cart-item-qty'>
                  <button onClick={() => dispatch(decreaseQty(item._id))}>−</button>
                  <span>{item.qty}</span>
                  <button onClick={() => dispatch(increaseQty(item._id))}>+</button>
                </div>

                <span className='cart-item-total'>
                  RS. {item.itemTotal.toLocaleString()}
                </span>

                <button
                  className='cart-item-remove'
                  onClick={() => dispatch(removeFromCart(item._id))}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          <div className='cart-summary'>
            <div className='cart-summary-top'>
              <p className='cart-summary-label'>
                <span className='cart-summary-line'></span>
                ORDER SUMMARY
              </p>
            </div>

            <div className='cart-summary-row'>
              <span>SUBTOTAL</span>
              <span>RS. {totalPrice.toLocaleString()}</span>
            </div>

            <div className='cart-summary-row'>
              <span>DELIVERY</span>
              <span>FREE</span>
            </div>

            <div className='cart-summary-divider'></div>

            <div className='cart-summary-total'>
              <span>TOTAL</span>
              <span>RS. {totalPrice.toLocaleString()}</span>
            </div>

            <button
              className='cart-checkout-btn'
              onClick={handleCheckout}
              disabled={loading}
            >
              {loading ? 'PROCESSING...' : 'CHECKOUT →'}
            </button>

            <button
              className='cart-clear-btn'
              onClick={() => dispatch(clearCart())}
            >
              CLEAR CART
            </button>

            <Link to='/products' className='cart-continue'>
              ← CONTINUE SHOPPING
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}

export default Cart