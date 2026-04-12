import { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Login.css'
import { AuthContext } from '../context/AuthContext'

function Login() {
  const { login } = useContext(AuthContext)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        login();

        if (data.user.role === 'admin') {
          console.log("Admin detected!");
          navigate('/admin/dashboard');
        } else {
          navigate('/');
        }
      }
    } catch (err) {
      setError('Server error. Check connection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='login'>
      <div className='login-left'>
        <div className='login-logo'>
          SHOPFLOW
          <span>PREMIUM STORE</span>
        </div>

        <div className='login-left-mid'>
          <p className='login-tag'>
            <span className='login-tag-line'></span>
            WELCOME BACK
          </p>
          <h1 className='login-solid'>SIGN</h1>
          <h1 className='login-ghost'>IN.</h1>
        </div>

        <div className='login-left-footer'>
          <div className='login-progress'>
            <span className='login-step-label'>STEP 1 OF 1</span>
            <div className='login-progress-bar'>
              <div className='login-progress-fill'></div>
            </div>
          </div>
          <p className='login-tagline'>Your account. Your orders. Your style.</p>
        </div>
      </div>

      <div className='login-right'>
        <Link to='/register' className='login-have-account'>
          NO ACCOUNT? →
        </Link>

        <div className='login-form-wrap'>
          <p className='login-step'>— SIGN IN TO CONTINUE</p>
          <h2 className='login-heading-solid'>WELCOME</h2>
          <h2 className='login-heading-ghost'>BACK.</h2>

          {error && <p style={{ color: '#ff3333', fontFamily: 'Space Grotesk', fontSize: '11px', letterSpacing: '2px', marginBottom: '20px' }}>{error}</p>}

          <form className='login-form' onSubmit={handleSubmit}>
            <div className='login-field'>
              <label>EMAIL ADDRESS</label>
              <input
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className='login-field'>
              <label>PASSWORD</label>
              <input
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type='submit' className='login-btn' disabled={loading}>
              {loading ? 'PROCESSING...' : 'CONTINUE →'}
            </button>
          </form>

          <p className='login-switch'>
            NEW HERE? <Link to='/register'>CREATE ACCOUNT →</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login