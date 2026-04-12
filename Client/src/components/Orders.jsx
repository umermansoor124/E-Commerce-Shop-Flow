import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Orders.css'

function Orders() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchMyOrders = async () => {
      const token = localStorage.getItem('token')

      if (!token) {
        navigate('/login')
        return
      }

      try {
        const response = await fetch('http://localhost:5000/api/orders/myorders', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })

        const data = await response.json()

        if (response.ok) {
          setOrders(data)
        }
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }

    fetchMyOrders()
  }, [navigate])

  const handleDeleteOrder = async (id) => {
    if (window.confirm("Are you sure you wish to delete the order?")) {
      const token = localStorage.getItem('token')
      try {
        const response = await fetch(`http://localhost:5000/api/orders/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })

        if (response.ok) {
          setOrders(orders.filter(order => order._id !== id))
        }
      } catch (error) {
        console.log(error)
      }
    }
  }

  if (loading) {
    return (
      <div className='orders' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <h1 className='orders-title-solid'>LOADING...</h1>
      </div>
    )
  }

  return (
    <div className='orders'>
      <div className='orders-header'>
        <div className='orders-header-left'>
          <p className='orders-eyebrow'>
            <span className='orders-eyebrow-line'></span>
            MY ORDERS
          </p>
          <h1 className='orders-title-solid'>ORDER</h1>
          <h1 className='orders-title-ghost'>HISTORY.</h1>
        </div>
        <div className='orders-header-right'>
          <p className='orders-total-count'>{orders.length} ORDERS</p>
        </div>
      </div>

      <div className='orders-list'>
        <div className='orders-list-header'>
          <span>ORDER ID</span>
          <span>DATE</span>
          <span>PRODUCTS</span>
          <span>TOTAL</span>
          <span>STATUS & ACTION</span>
        </div>

        {orders.map((order) => (
          <div key={order._id} className='order-row'>
            <span className='order-id'>#{order._id.substring(0, 8)}</span>
            <span className='order-date'>{new Date(order.createdAt).toLocaleDateString()}</span>
            <span className='order-items'>
              {order.orderItems && order.orderItems.length > 0 ? (
                order.orderItems.map((item, idx) => (
                  <span key={idx}>
                    {item.name}{idx !== order.orderItems.length - 1 ? ', ' : ''}
                  </span>
                ))
              ) : (
                "NO ITEMS"
              )}
            </span>
            <span className='order-total'>RS. {order.totalPrice ? order.totalPrice.toLocaleString() : 0}</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <span className={`order-status ${order.status ? order.status.toLowerCase() : 'pending'}`}>
                {order.status || 'PENDING'}
              </span>
              <button 
                onClick={() => handleDeleteOrder(order._id)}
                className='order-delete-btn'
              >
                DELETE
              </button>
            </div>
          </div>
        ))}
      </div>

      {orders.length === 0 && (
        <div className='orders-empty'>
          <h2 className='orders-empty-title'>NO ORDERS YET.</h2>
          <p className='orders-empty-sub'>You haven't placed any orders yet.</p>
          <Link to='/products' className='orders-empty-btn'>SHOP NOW →</Link>
        </div>
      )}
    </div>
  )
}

export default Orders