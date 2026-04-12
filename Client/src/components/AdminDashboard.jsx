import { useState, useEffect } from 'react'
import Sidebar from './Sidebar'
import './AdminDashboard.css'

function AdminDashboard() {
  const [stats, setStats] = useState({
    totalSales: 0,
    totalOrders: 0,
    totalProducts: 0,
    totalUsers: 0
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      const token = localStorage.getItem('token')
      try {
        const [ordersRes, productsRes, usersRes] = await Promise.all([
          fetch('http://localhost:5000/api/orders', {
            headers: { 'Authorization': `Bearer ${token}` }
          }),
          fetch('http://localhost:5000/api/products'),
          fetch('http://localhost:5000/api/users', {
            headers: { 'Authorization': `Bearer ${token}` }
          })
        ])

        const orders = ordersRes.ok ? await ordersRes.json() : []
        const products = productsRes.ok ? await productsRes.json() : []
        const users = usersRes.ok ? await usersRes.json() : []

        const calculatedSales = Array.isArray(orders) 
          ? orders.reduce((sum, order) => sum + (order.totalPrice || 0), 0) 
          : 0

        setStats({
          totalSales: calculatedSales,
          totalOrders: Array.isArray(orders) ? orders.length : 0,
          totalProducts: Array.isArray(products) ? products.length : 0,
          totalUsers: Array.isArray(users) ? users.length : 0
        })
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
    fetchStats()
  }, [])

  return (
    <div className='admin-container'>
      <Sidebar />
      <main className='admin-main'>
        <div className='admin-header'>
          <p className='admin-eyebrow'>
            <span className='admin-eyebrow-line'></span>
            MANAGEMENT
          </p>
          <h1 className='admin-title-solid'>ADMIN</h1>
          <h1 className='admin-title-ghost'>DASHBOARD.</h1>
        </div>

        <div className='stats-grid'>
          <div className='stat-card'>
            <p className='stat-label'>TOTAL SALES</p>
            <h2 className='stat-value'>RS. {stats.totalSales.toLocaleString()}</h2>
          </div>
          <div className='stat-card'>
            <p className='stat-label'>ORDERS</p>
            <h2 className='stat-value'>{stats.totalOrders}</h2>
          </div>
          <div className='stat-card'>
            <p className='stat-label'>PRODUCTS</p>
            <h2 className='stat-value'>{stats.totalProducts}</h2>
          </div>
          <div className='stat-card'>
            <p className='stat-label'>USERS</p>
            <h2 className='stat-value'>{stats.totalUsers}</h2>
          </div>
        </div>

        <div className='recent-activity'>
          <h3 className='section-title'>RECENT STATUS</h3>
          <p style={{ color: '#888', fontSize: '12px', letterSpacing: '2px' }}>
            {loading ? 'ACCESSING SECURE DATA...' : 'SYSTEM ONLINE — ALL SERVICES FUNCTIONAL'}
          </p>
        </div>
      </main>
    </div>
  )
}

export default AdminDashboard