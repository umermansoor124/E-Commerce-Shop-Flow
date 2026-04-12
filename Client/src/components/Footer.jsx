import { useState } from 'react'
import { Link } from 'react-router-dom'
import './Footer.css'

function Footer() {
  // Bhai, is 'isLoggedIn' ko baad mein apne actual Context API ya Redux se connect kar lena.
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className='footer'>

      {/* Left Side */}
      <div className='footer-left'>

        {/* Big Logo */}
        <div className='footer-logo'>
          <h1 className='footer-logo-solid'>SHOP</h1>
          <h1 className='footer-logo-ghost'>FLOW.</h1>
        </div>

        {/* Divider */}
        <div className='footer-divider'></div>

        {/* Links */}
        <ul className='footer-links'>
          <li><Link to='/'>— HOME</Link></li>
          
          {isLoggedIn ? (
            <>
              <li><Link to='/products'>— PRODUCTS</Link></li>
              <li><Link to='/cart'>— CART</Link></li>
              <li><Link to='/orders'>— ORDERS</Link></li>
            </>
          ) : (
            <>
              <li><Link to='/login'>— LOGIN</Link></li>
              <li><Link to='/register'>— REGISTER</Link></li>
            </>
          )}
        </ul>

      </div>

      {/* Right Side */}
      <div className='footer-right'>

        <p className='footer-tagline'>
          Built for those who refuse to quit. <br />
          Shop every trend. Dominate every goal.
        </p>

        <button className='footer-top-btn' onClick={scrollToTop}>
          BACK TO TOP ↑
        </button>

        <p className='footer-copy'>© 2026 SHOPFLOW. ALL RIGHTS RESERVED.</p>

      </div>

    </footer>
  )
}

export default Footer