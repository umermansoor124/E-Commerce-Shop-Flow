import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from './Sidebar'
import './AdminDashboard.css'

function AdminAddProduct() {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    stock: '',
    description: '',
    image: ''
  })
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const token = localStorage.getItem('token')

    try {
      const response = await fetch('http://localhost:5000/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        alert("Bhai, product add ho gaya!")
        navigate('/admin/products')
      } else {
        alert("Kuch error aa gaya bhai, check kar.")
      }
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='admin-container'>
      <Sidebar />
      
      <main className='admin-main'>
        <div className='admin-header'>
          <p className='admin-eyebrow'>
            <span className='admin-eyebrow-line'></span>
            INVENTORY
          </p>
          <h1 className='admin-title-solid'>ADD NEW</h1>
          <h1 className='admin-title-ghost'>PRODUCT.</h1>
        </div>

        <form className='admin-form' onSubmit={handleSubmit}>
          <div className='form-row'>
            <div className='form-group'>
              <label>PRODUCT NAME</label>
              <input type="text" name="name" required onChange={handleChange} placeholder="e.g. TITANIUM WATCH" />
            </div>
            <div className='form-group'>
              <label>CATEGORY</label>
              <input type="text" name="category" required onChange={handleChange} placeholder="e.g. ACCESSORIES" />
            </div>
          </div>

          <div className='form-row'>
            <div className='form-group'>
              <label>PRICE (RS)</label>
              <input type="number" name="price" required onChange={handleChange} placeholder="0" />
            </div>
            <div className='form-group'>
              <label>STOCK QUANTITY</label>
              <input type="number" name="stock" required onChange={handleChange} placeholder="0" />
            </div>
          </div>

          <div className='form-group'>
            <label>IMAGE URL</label>
            <input type="text" name="image" required onChange={handleChange} placeholder="https://unsplash.com/..." />
          </div>

          <div className='form-group'>
            <label>DESCRIPTION</label>
            <textarea name="description" rows="4" required onChange={handleChange} placeholder="Describe the product..."></textarea>
          </div>

          <button type="submit" className='admin-submit-btn' disabled={loading}>
            {loading ? 'ADDING...' : 'PUBLISH PRODUCT →'}
          </button>
        </form>
      </main>
    </div>
  )
}

export default AdminAddProduct