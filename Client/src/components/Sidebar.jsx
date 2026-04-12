import { Link } from 'react-router-dom'
import './AdminDashboard.css'

function Sidebar() {
  return (
    <aside className='admin-sidebar'>
      <div className='sidebar-logo'>
        <h2>SF<span>.</span></h2>
      </div>
      
      <nav className='sidebar-nav'>
        <Link to='/admin/dashboard' className='nav-item'>— OVERVIEW</Link>
        <Link to='/admin/products' className='nav-item'>— MANAGE PRODUCTS</Link>
        <Link to='/admin/orders' className='nav-item'>— ALL ORDERS</Link>
        <Link to='/admin/users' className='nav-item'>— USER LIST</Link>
        <Link to='/' className='nav-item return-store'>— EXIT STORE</Link>
      </nav>
    </aside>
  )
}

export default Sidebar