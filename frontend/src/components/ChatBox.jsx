import { useState } from 'react'
import axios from 'axios'

function ChatBox() {
  const [description, setDescription] = useState('')
  const [department, setDepartment] = useState('ICU')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const classifyWaste = async () => {
    if (!description.trim()) {
      setError('Please describe the waste first.')
      return
    }
    setError('')
    setLoading(true)
    setResult(null)
    try {
      const res = await axios.post(
        'http://localhost:5000/api/ai/classify',
        { description }
      )
      setResult(res.data.result)

      const category = res.data.result
        .split('\n')
        .find(line => line.startsWith('CATEGORY:'))
        ?.replace('CATEGORY:', '')
        .trim() || 'Unknown'

      await axios.post(
        'http://localhost:5000/api/waste/log',
        {
          department: department,
          description: description,
          category: category,
          quantity_kg: 1
        }
      )

    } catch (err) {
      console.error(err)
      setError('Error: ' + (err.response?.data?.error || err.message))
    }
    setLoading(false)
  }

  const handleClear = () => {
    setDescription('')
    setResult(null)
    setError('')
  }

  return (
    <div style={{
      maxWidth: '680px',
      margin: '40px auto',
      padding: '24px',
      background: 'white',
      borderRadius: '12px',
      boxShadow: '0 2px 12px rgba(0,0,0,0.08)'
    }}>

      <h2 style={{ marginBottom: '8px', color: '#1e40af' }}>
        BioWaste AI Classifier
      </h2>

      <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '20px' }}>
        Describe the biomedical waste — get instant CPCB disposal guidance.
      </p>

      <select
        value={department}
        onChange={(e) => setDepartment(e.target.value)}
        style={{
          width: '100%',
          padding: '10px',
          fontSize: '14px',
          border: '1px solid #d1d5db',
          borderRadius: '8px',
          marginBottom: '10px',
          outline: 'none',
          background: 'white'
        }}
      >
        <option>ICU</option>
        <option>Emergency</option>
        <option>Surgery Ward</option>
        <option>Laboratory</option>
        <option>Pharmacy</option>
        <option>General Ward</option>
        <option>Maternity Ward</option>
        <option>Pathology</option>
      </select>

      <textarea
        rows={4}
        style={{
          width: '100%',
          padding: '12px',
          fontSize: '14px',
          border: '1px solid #d1d5db',
          borderRadius: '8px',
          resize: 'vertical',
          outline: 'none'
        }}
        placeholder="e.g. Used syringes and needles from the ICU ward..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      {error && (
        <p style={{ color: '#dc2626', fontSize: '13px', marginTop: '8px' }}>
          {error}
        </p>
      )}

      <div style={{ display: 'flex', gap: '10px', marginTop: '12px' }}>
        <button
          onClick={classifyWaste}
          disabled={loading}
          style={{
            padding: '10px 24px',
            background: loading ? '#93c5fd' : '#1e40af',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: loading ? 'not-allowed' : 'pointer',
            fontSize: '14px',
            fontWeight: '500'
          }}
        >
          {loading ? 'Classifying...' : 'Classify Waste'}
        </button>

        <button
          onClick={handleClear}
          style={{
            padding: '10px 24px',
            background: 'transparent',
            color: '#6b7280',
            border: '1px solid #d1d5db',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '14px'
          }}
        >
          Clear
        </button>
      </div>

      {result && (
        <div style={{
          marginTop: '24px',
          padding: '16px',
          background: '#f0fdf4',
          borderRadius: '8px',
          border: '1px solid #86efac'
        }}>
          <h3 style={{
            fontSize: '14px',
            fontWeight: '600',
            color: '#166534',
            marginBottom: '10px'
          }}>
            AI Classification Result
          </h3>
          <pre style={{
            whiteSpace: 'pre-wrap',
            fontSize: '13px',
            color: '#1a1a2e',
            lineHeight: '1.8'
          }}>
            {result}
          </pre>
          <p style={{
            marginTop: '10px',
            fontSize: '12px',
            color: '#166534'
          }}>
            ✅ Waste log saved to database!
          </p>
        </div>
      )}

    </div>
  )
}

export default ChatBox
