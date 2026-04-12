import { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext' 
import './Home.css'

function Home() {
  const [openItem, setOpenItem] = useState(0)
  
  const { isLoggedIn } = useContext(AuthContext)

  const features = [
    { num: '01', title: 'SIGNATURE AESTHETIC', desc: 'Handcrafted luxury and cinematic designs. Every piece is engineered for those who demand the absolute best.' },
    { num: '02', title: 'RUTHLESS SPEED', desc: 'Order today, dominate tomorrow. Lightning-fast shipping that matches your pace.' },
    { num: '03', title: 'IRONCLAD SECURITY', desc: 'Bank-grade encryption for every transaction. Your privacy is our highest priority.' },
    { num: '04', title: 'ZERO COMPROMISE', desc: '30-day seamless returns. We back our quality, so you can shop with absolute authority.' },
  ]

  return (
    <div className='home'>

      <section className='home-hero'>
        <div className='home-left'>
          <div className='home-tag'>
            <span className='tag-line'></span>
            {/* <span>EST. 2026 — THE UMER COLLECTION</span> */}
          </div>
          <h1 className='home-title'>
            <span className='title-outline'>OWN</span>
            <span className='title-solid'>THE.</span>
            <span className='title-outline'>VIBE</span>
            <span className='title-solid'>NOW.</span>
          </h1>
          <div className='home-bottom-row'>
            <p className='home-desc'>
              No filters. No shortcuts.<br />
              Just pure cinematic excellence.
            </p>
            
            {isLoggedIn ? (
              <Link to='/products' className='home-cta'>ENTER THE VAULT</Link>
            ) : (
              <Link to='/login' className='home-cta'>EXPLORE COLLECTION</Link>
            )}
            
          </div>
        </div>

        <div className='home-right'>
          <div className='home-number-grid'>
            <div className='home-stat'>
              <h2>10K<span>+</span></h2>
              <p>EXCLUSIVE DROPS</p>
            </div>
            <div className='stat-divider'></div>
            <div className='home-stat'>
              <h2>50K<span>+</span></h2>
              <p>ELITE CLIENTS</p>
            </div>
            <div className='stat-divider'></div>
            <div className='home-stat'>
              <h2>99<span>%</span></h2>
              <p>PERFECTION</p>
            </div>
            <div className='stat-divider'></div>
            <div className='home-stat'>
              <h2>5.0<span>★</span></h2>
              <p>TOP TIER RATING</p>
            </div>
          </div>
          <div className='home-marquee'>
            <p>UMER EXCLUSIVES &nbsp;—&nbsp; CINEMATIC LUXURY &nbsp;—&nbsp; UMER EXCLUSIVES &nbsp;—&nbsp; CINEMATIC LUXURY &nbsp;—&nbsp; UMER EXCLUSIVES &nbsp;—&nbsp; CINEMATIC LUXURY &nbsp;—&nbsp;</p>
          </div>
        </div>
      </section>

      <section className='home-features'>
        <div className='features-header'>
          <h2 className='features-title'>THE STANDARD</h2>
          <span className='features-count'>04 PILLARS</span>
        </div>

        {features.map((item, index) => (
          <div
            key={index}
            className={`feature-item ${openItem === index ? 'active' : ''}`}
            onClick={() => setOpenItem(openItem === index ? null : index)}
          >
            <div className='feature-item-top'>
              <span className='feature-num'>{item.num}</span>
              <h3 className='feature-title'>{item.title}</h3>
              <span className='feature-icon'>{openItem === index ? '✕' : '+'}</span>
            </div>
            {openItem === index && (
              <div className='feature-body'>
                <p className='feature-desc'>{item.desc}</p>
                <span className='feature-tag'>DISCOVER MORE →</span>
              </div>
            )}
          </div>
        ))}
      </section>

      <section className='home-stats-bar'>
        <div className='stat-bar-item'>
          <h2>10,000+</h2>
          <p>UNITS MOVED</p>
          <span>Global reach</span>
        </div>
        <div className='stat-bar-item'>
          <h2>500,000+</h2>
          <p>HOURS LOGGED</p>
          <span>In development</span>
        </div>
        <div className='stat-bar-item'>
          <h2>99%</h2>
          <p>PRECISION</p>
          <span>Flawless execution</span>
        </div>
        <div className='stat-bar-item'>
          <h2>5.0★</h2>
          <p>LEGACY</p>
          <span>Built on trust</span>
        </div>
      </section>

      <section className='home-cta-section'>
        <div className='cta-ghost-text'>ELEVATE</div>
        <div className='cta-content'>
          <div className='cta-left'>
            <span className='cta-eyebrow'>— NEXT LEVEL</span>
            <h2 className='cta-title'>STEP INTO<br />THE DARK.</h2>
            <p className='cta-sub'>FORGET THE ORDINARY. EMBRACE THE PREMIUM.</p>
          </div>
          <div className='cta-right'>
            
            {isLoggedIn ? (
              <Link to='/products' className='cta-btn-primary'>SHOP THE DROP</Link>
            ) : (
              <>
                <Link to='/login' className='cta-btn-primary'>UNLOCK ACCESS</Link>
                <Link to='/register' className='cta-btn-secondary'>JOIN THE ELITE</Link>
              </>
            )}

          </div>
        </div>
      </section>

      <div className='home-strip'>
        <span>GLOBAL SHIPPING</span>
        <span>/</span>
        <span>CINEMATIC QUALITY</span>
        <span>/</span>
        <span>IRONCLAD RETURNS</span>
        <span>/</span>
        <span>ENCRYPTED PAYMENTS</span>
      </div>

    </div>
  )
}

export default Home