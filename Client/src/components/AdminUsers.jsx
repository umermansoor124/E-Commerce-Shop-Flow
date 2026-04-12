import { useState, useEffect } from 'react'
import Sidebar from './Sidebar'
import './AdminDashboard.css'

function AdminUsers() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem('token')
      try {
        const response = await fetch('http://localhost:5000/api/users', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        const data = await response.json()
        if (response.ok) {
          setUsers(data)
        }
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }
    fetchUsers()
  }, [])

  const handleDeleteUser = async (id) => {
    if (window.confirm("Bhai, is user ko hamesha ke liye delete karna hai?")) {
      const token = localStorage.getItem('token')
      try {
        const response = await fetch(`http://localhost:5000/api/users/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        if (response.ok) {
          setUsers(users.filter(user => user._id !== id))
        }
      } catch (error) {
        console.log(error)
      }
    }
  }

  const handleToggleAdmin = async (id, currentRole) => {
    const token = localStorage.getItem('token')
    try {
      const response = await fetch(`http://localhost:5000/api/users/${id}/role`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ isAdmin: !currentRole })
      })

      if (response.ok) {
        setUsers(users.map(user => 
          user._id === id ? { ...user, isAdmin: !currentRole } : user
        ))
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='admin-container'>
      <Sidebar />
      
      <main className='admin-main'>
        <div className='admin-header'>
          <p className='admin-eyebrow'>
            <span className='admin-eyebrow-line'></span>
            COMMUNITY
          </p>
          <h1 className='admin-title-solid'>REGISTERED</h1>
          <h1 className='admin-title-ghost'>USERS.</h1>
        </div>

        <div className='admin-list-wrapper'>
          <div className='admin-users-header'>
            <span>ID</span>
            <span>NAME</span>
            <span>EMAIL</span>
            <span>ROLE</span>
            <span>ACTIONS</span>
          </div>

          {loading ? (
            <div className='admin-loading'>LOADING USERS...</div>
          ) : (
            users.map(user => (
              <div key={user._id} className='admin-users-row'>
                <span className='admin-product-name' style={{ fontSize: '14px', color: '#888' }}>
                  #{user._id.substring(0, 6)}
                </span>
                
                <span className='admin-product-name' style={{ fontSize: '18px' }}>
                  {user.name}
                </span>
                
                <span className='admin-product-price' style={{ textTransform: 'lowercase' }}>
                  {user.email}
                </span>
                
                <span className={`admin-role-badge ${user.isAdmin ? 'admin' : 'customer'}`}>
                  {user.isAdmin ? 'ADMIN' : 'CUSTOMER'}
                </span>

                <div className='admin-action-btns'>
                  <button 
                    onClick={() => handleToggleAdmin(user._id, user.isAdmin)} 
                    className='admin-edit-btn'
                  >
                    {user.isAdmin ? 'REMOVE ADMIN' : 'MAKE ADMIN'}
                  </button>
                  <button 
                    onClick={() => handleDeleteUser(user._id)} 
                    className='admin-delete-btn'
                  >
                    DELETE
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  )
}

export default AdminUsers