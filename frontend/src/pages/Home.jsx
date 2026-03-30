import { useNavigate } from 'react-router-dom'
import ChatBox from '../components/ChatBox'

function Home() {
  const navigate = useNavigate()

  return (
    <div>
      <nav>
        <h1>BioWaste AI</h1>
        <div>
          <button onClick={() => navigate('/')}>Home</button>
          <button onClick={() => navigate('/dashboard')}>Dashboard</button>
        </div>
      </nav>

      <div style={{ padding: '20px' }}>
        <ChatBox />
      </div>
    </div>
  )
}

export default Home