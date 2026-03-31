import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function Dashboard() {
  const [logs, setLogs] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    axios.get('https://biowaste-ai-backend.onrender.com/api/waste/logs')
      .then(res => {
        setLogs(res.data)
        setLoading(false)
      })
      .catch(() => {
        setLogs([])
        setLoading(false)
      })
  }, [])

  return (
    <div>
      <nav>
        <h1>BioWaste AI</h1>
        <div>
          <button onClick={() => navigate('/')}>Home</button>
          <button onClick={() => navigate('/dashboard')}>Dashboard</button>
        </div>
      </nav>

      <div style={{ padding: '30px', maxWidth: '900px', margin: 'auto' }}>
        <h2 style={{ marginBottom: '20px', color: '#1e40af' }}>
          Waste Log Dashboard
        </h2>

        {loading ? (
          <p style={{ color: '#6b7280' }}>Loading logs...</p>
        ) : logs.length === 0 ? (
          <div style={{
            padding: '40px',
            textAlign: 'center',
            background: 'white',
            borderRadius: '12px',
            color: '#6b7280',
            fontSize: '15px'
          }}>
            No waste logs yet. Go to Home and classify some waste first!
          </div>
        ) : (
          <table style={{
            width: '100%',
            borderCollapse: 'collapse',
            background: 'white',
            borderRadius: '12px',
            overflow: 'hidden',
            boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
          }}>
            <thead>
              <tr style={{ background: '#1e40af', color: 'white' }}>
                <th style={{ padding: '12px 16px', textAlign: 'left' }}>Department</th>
                <th style={{ padding: '12px 16px', textAlign: 'left' }}>Description</th>
                <th style={{ padding: '12px 16px', textAlign: 'left' }}>Category</th>
                <th style={{ padding: '12px 16px', textAlign: 'left' }}>Qty (kg)</th>
                <th style={{ padding: '12px 16px', textAlign: 'left' }}>Date</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log, index) => (
                <tr key={index} style={{
                  borderBottom: '1px solid #f0f0f0',
                  background: index % 2 === 0 ? 'white' : '#f9fafb'
                }}>
                  <td style={{ padding: '12px 16px', fontSize: '14px' }}>{log.department}</td>
                  <td style={{ padding: '12px 16px', fontSize: '14px' }}>{log.description}</td>
                  <td style={{ padding: '12px 16px', fontSize: '14px' }}>
                    <span style={{
                      padding: '3px 10px',
                      borderRadius: '12px',
                      fontSize: '12px',
                      fontWeight: '500',
                      background:
                        log.category === 'Yellow' ? '#fef9c3' :
                        log.category === 'Red' ? '#fee2e2' :
                        log.category === 'Blue' ? '#dbeafe' : '#f0fdf4',
                      color:
                        log.category === 'Yellow' ? '#854d0e' :
                        log.category === 'Red' ? '#991b1b' :
                        log.category === 'Blue' ? '#1e40af' : '#166534'
                    }}>
                      {log.category}
                    </span>
                  </td>
                  <td style={{ padding: '12px 16px', fontSize: '14px' }}>{log.quantity_kg}</td>
                  <td style={{ padding: '12px 16px', fontSize: '14px' }}>
                    {new Date(log.date).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}

export default Dashboard
