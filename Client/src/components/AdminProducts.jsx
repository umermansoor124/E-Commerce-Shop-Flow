import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Sidebar from './Sidebar'
import './AdminDashboard.css'

function AdminProducts() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/products')
        const data = await response.json()
        if (response.ok) {
          setProducts(data)
        }
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])

  const handleDelete = async (id) => {
    if (window.confirm("Delete this product?")) {
      const token = localStorage.getItem('token')
      try {
        const response = await fetch(`http://localhost:5000/api/products/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        if (response.ok) {
          setProducts(products.filter(p => p._id !== id))
        }
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <div className='admin-container'>
      <Sidebar />
      
      <main className='admin-main'>
        <div className='admin-header' style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div>
            <p className='admin-eyebrow'>
              <span className='admin-eyebrow-line'></span>
              INVENTORY
            </p>
            <h1 className='admin-title-solid'>MANAGE</h1>
            <h1 className='admin-title-ghost'>PRODUCTS.</h1>
          </div>
          <Link to='/admin/products/add' className='admin-add-btn'>+ ADD NEW PRODUCT</Link>
        </div>

        <div className='admin-list-wrapper'>
          <div className='admin-list-header'>
            <span>IMAGE</span>
            <span>NAME</span>
            <span>PRICE</span>
            <span>STOCK</span>
            <span>ACTIONS</span>
          </div>

          {loading ? (
            <div className='admin-loading'>LOADING PRODUCTS...</div>
          ) : (
            products.map(product => (
              <div key={product._id} className='admin-list-row'>
                <img src={product.image} alt={product.name} className='admin-product-img' />
                <span className='admin-product-name'>{product.name}</span>
                <span className='admin-product-price'>RS. {product.price.toLocaleString()}</span>
                <span className='admin-product-stock'>{product.stock} IN STOCK</span>
                <div className='admin-action-btns'>
                  <button className='admin-edit-btn'>EDIT</button>
                  <button onClick={() => handleDelete(product._id)} className='admin-delete-btn'>DELETE</button>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  )
}

export default AdminProducts