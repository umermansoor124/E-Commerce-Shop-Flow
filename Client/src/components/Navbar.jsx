import { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext' 
import './Navbar.css'

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useContext(AuthContext)

  const handleLogout = () => {
    setMenuOpen(false); 
    logout();           
    navigate('/login'); 
  }

  return (
    <>
      <nav className='navbar'>
        <div className='navbar-left'>
          <Link to='/' className='navbar-logo'>
            SHOPFLOW
            <span className='navbar-logo-sub'>PREMIUM STORE</span>
          </Link>
        </div>

        <div className='navbar-center'>
          <Link to='/' className='nav-link'>HOME</Link>
          {isLoggedIn ? (
            <>
              <Link to='/products' className='nav-link'>PRODUCTS</Link>
              <Link to='/cart' className='nav-link'>CART</Link>
              <Link to='/orders' className='nav-link'>ORDERS</Link>
              <button className='nav-link-btn' onClick={handleLogout}>LOGOUT</button>
            </>
          ) : (
            <>
              <Link to='/login' className='nav-link'>LOGIN</Link>
              <Link to='/register' className='nav-link special-link'>JOIN SHOPFLOW</Link>
            </>
          )}
        </div>

        <div className='navbar-right'>
          <button className='navbar-hamburger' onClick={() => setMenuOpen(true)}>
            <span className='hamburger-line'></span>
            <span className='hamburger-line'></span>
            <span className='hamburger-line'></span>
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div className='mobile-menu'>
          <div className='mobile-menu-top'>
            <span className='mobile-menu-logo'>SHOPFLOW</span>
            <button className='mobile-menu-close' onClick={() => setMenuOpen(false)}>
              CLOSE ✕
            </button>
          </div>

          <ul className='mobile-menu-links'>
            <li>
              <span className='mobile-menu-num'>01</span>
              <Link to='/' onClick={() => setMenuOpen(false)}>HOME</Link>
            </li>
            {isLoggedIn && (
              <>
                <li>
                  <span className='mobile-menu-num'>02</span>
                  <Link to='/products' onClick={() => setMenuOpen(false)}>PRODUCTS</Link>
                </li>
                <li>
                  <span className='mobile-menu-num'>03</span>
                  <Link to='/cart' onClick={() => setMenuOpen(false)}>CART</Link>
                </li>
                <li>
                  <span className='mobile-menu-num'>04</span>
                  <Link to='/orders' onClick={() => setMenuOpen(false)}>ORDERS</Link>
                </li>
              </>
            )}
            {!isLoggedIn && (
              <>
                <li>
                  <span className='mobile-menu-num'>02</span>
                  <Link to='/login' onClick={() => setMenuOpen(false)}>LOGIN</Link>
                </li>
                <li>
                  <span className='mobile-menu-num'>03</span>
                  <Link to='/register' onClick={() => setMenuOpen(false)}>JOIN SHOPFLOW</Link>
                </li>
              </>
            )}
            {isLoggedIn && (
              <li>
                <span className='mobile-menu-num'>05</span>
                <button className='mobile-logout-btn' onClick={handleLogout}>LOGOUT</button>
              </li>
            )}
          </ul>

          <p className='mobile-menu-footer'>© 2026 SHOPFLOW WORLDWIDE</p>
        </div>
      )}
    </>
  )
}

export default Navbar