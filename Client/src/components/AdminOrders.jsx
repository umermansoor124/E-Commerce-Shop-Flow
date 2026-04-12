import { useState, useEffect } from 'react'
import Sidebar from './Sidebar'
import './AdminDashboard.css'

function AdminOrders() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchAllOrders = async () => {
    const token = localStorage.getItem('token')
    try {
      const response = await fetch('http://localhost:5000/api/orders', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      const data = await response.json()
      if (response.ok) {
        setOrders(data)
      }
    } catch (error) {
      console.log("Fetch Error:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAllOrders()
  }, [])


  const handleStatusChange = async (id, newStatus) => {
    const token = localStorage.getItem('token')
    try {
      const response = await fetch(`http://localhost:5000/api/orders/${id}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      })

      if (response.ok) {
        setOrders(prevOrders => 
          prevOrders.map(order => 
            order._id === id ? { ...order, status: newStatus } : order
          )
        )
      } else {
        const errorData = await response.json()
        alert(errorData.message || "Status update fail ho gaya (403 Forbidden?)")
      }
    } catch (error) {
      console.log("Update Error:", error)
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm('Bhai, pakka order delete karna hai?')) {
      const token = localStorage.getItem('token')
      try {
        const response = await fetch(`http://localhost:5000/api/orders/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.ok) {
          alert("Order Delete Ho Gaya!");
          setOrders(prevOrders => prevOrders.filter(order => order._id !== id));
        } else {
          const data = await response.json();
          alert(data.message || "Delete fail ho gaya");
        }
      } catch (err) {
        console.error("Delete failed:", err);
      }
    }
  };

  return (
    <div className='admin-container'>
      <Sidebar />
      
      <main className='admin-main'>
        <div className='admin-header'>
          <p className='admin-eyebrow'>
            <span className='admin-eyebrow-line'></span>
            MANAGEMENT
          </p>
          <h1 className='admin-title-solid'>ORDER</h1>
          <h1 className='admin-title-ghost'>LIST.</h1>
        </div>

        <div className='admin-list-wrapper'>
          <div className='admin-list-header'>
            <span>ORDER ID</span>
            <span>DATE</span>
            <span>ITEMS</span>
            <span>TOTAL</span>
            <span>STATUS</span>
            <span>ACTION</span>
          </div>

          {loading ? (
            <div className='admin-loading'>ACCESSING DATABASE...</div>
          ) : (
            orders.map(order => (
              <div key={order._id} className='admin-list-row' style={{ gridTemplateColumns: '120px 1fr 2fr 1fr 1.2fr 0.8fr' }}>
               
                <span className='admin-product-name' style={{ fontSize: '14px', color: '#fff' }}>
                  #{order._id ? order._id.slice(-6).toUpperCase() : 'N/A'}
                </span>
                
                <span className='admin-product-price'>
                  {new Date(order.createdAt).toLocaleDateString('en-GB')}
                </span>
                
                <span className='admin-product-stock' style={{ fontSize: '11px', color: '#999' }}>
                  {order.orderItems?.map((item, i) => (
                    <div key={i}>{item.name} (x{item.qty})</div>
                  ))}
                </span>
                
                <span className='admin-product-price' style={{ color: '#fff', fontWeight: 'bold' }}>
                  RS. {order.totalPrice?.toLocaleString()}
                </span>
                
                <select 
                  className='admin-status-dropdown'
                  value={order.status || 'Pending'}
                  onChange={(e) => handleStatusChange(order._id, e.target.value)}
                  style={{
                    background: '#111',
                    color: order.status === 'Delivered' ? '#00ff00' : '#ffaa00',
                    border: '1px solid #333',
                    padding: '5px',
                    fontSize: '11px',
                    cursor: 'pointer'
                  }}
                >
                  <option value="Pending">PENDING</option>
                  <option value="Processing">PROCESSING</option>
                  <option value="Shipped">SHIPPED</option>
                  <option value="Delivered">DELIVERED</option>
                </select>

                <div className='admin-action-btns'>
                  <button 
                    onClick={() => handleDelete(order._id)} 
                    className='admin-delete-btn'
                    style={{ color: '#ff3333', cursor: 'pointer', background: 'none', border: 'none', fontSize: '11px', letterSpacing: '1px' }}
                  >
                    DELETE
                  </button>
                </div>
              </div>
            ))
          )}
          {orders.length === 0 && !loading && (
            <p style={{ textAlign: 'center', color: '#666', marginTop: '20px' }}>NO ORDERS FOUND IN SYSTEM.</p>
          )}
        </div>
      </main>
    </div>
  )
}

export default AdminOrders