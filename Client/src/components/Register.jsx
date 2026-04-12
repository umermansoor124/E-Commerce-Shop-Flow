import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Register.css'

function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      })

      const data = await response.json()

      if (response.ok) {
        navigate('/login')
      } else {
        setError(data.message || 'REGISTRATION FAILED. TRY AGAIN.')
      }
    } catch (err) {
      setError('SERVER ERROR. CHECK YOUR CONNECTION.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='register'>
      <div className='register-left'>
        <div className='register-logo'>
          SHOPFLOW
          <span>PREMIUM STORE</span>
        </div>

        <div className='register-left-mid'>
          <p className='register-tag'>
            <span className='register-tag-line'></span>
            JOIN THE ELITE
          </p>
          <h1 className='register-solid'>BEGIN YOUR</h1>
          <h1 className='register-ghost'>JOURNEY.</h1>
        </div>

        <div className='register-left-footer'>
          <div className='register-progress'>
            <span className='register-step-label'>STEP 1 OF 2</span>
            <div className='register-progress-bar'>
              <div className='register-progress-fill'></div>
            </div>
          </div>
          <p className='register-tagline'>No shortcuts. No excuses. Just results.</p>
        </div>
      </div>

      <div className='register-right'>
        <Link to='/login' className='register-have-account'>
          HAVE ACCOUNT? →
        </Link>

        <div className='register-form-wrap'>
          <p className='register-step'>— STEP 01 — ACCOUNT</p>
          <h2 className='register-heading-solid'>CREATE</h2>
          <h2 className='register-heading-ghost'>ACCOUNT.</h2>

          {error && <p style={{ color: '#ff3333', fontFamily: 'Space Grotesk', fontSize: '11px', letterSpacing: '2px', marginBottom: '20px' }}>{error}</p>}

          <form className='register-form' onSubmit={handleSubmit}>
            <div className='register-field'>
              <label>FULL NAME</label>
              <input
                type='text'
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className='register-field'>
              <label>EMAIL ADDRESS</label>
              <input
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className='register-field'>
              <label>PASSWORD</label>
              <input
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type='submit' className='register-btn' disabled={loading}>
              {loading ? 'PROCESSING...' : 'CONTINUE →'}
            </button>
          </form>

          <p className='register-switch'>
            ALREADY A MEMBER? <Link to='/login'>SIGN IN →</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Register