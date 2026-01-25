import { useState } from 'react'
import './App.css'

function App() {
  const [eur, setEur] = useState<string>('')
  const [sek, setSek] = useState<number | null>(null)

  const fetchConversion = async (eurAmount: number): Promise<number> => {
    const apiUrl = import.meta.env.VITE_API_URL
    
    const response = await fetch(`${apiUrl}/api/convert/amount`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        amount: eurAmount,
        from: 'EUR',
        to: 'SEK'
      }),
    })
    
    if (!response.ok) {
      throw new Error(`Conversion failed: ${response.status}`)
    }

    const data = await response.json()
    return data.amount
  }

  const convert = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const eurAsNumber = parseFloat(eur)
    
    if (isNaN(eurAsNumber) || eur.trim() === '') {
      alert('Please enter a valid number')
      return
    }

    try {
      const result = await fetchConversion(eurAsNumber)
      setSek(result)
    } catch (error) {
      alert(`Failed to convert currency: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  return (
    <div id="container">
      <h1>Currency calculator</h1>
      <form onSubmit={convert}>
        <div>
          <label htmlFor="eur-input">EUR</label>
          <input id="eur-input" type="number" value={eur} onChange={(e) => setEur(e.target.value)} />
        </div>
        <div>
          <label htmlFor="sek-output">SEK</label>
          <output id="sek-output">{sek !== null ? sek.toFixed(2) : ''}</output>
        </div>
        <div className='buttons'>
          <button type="submit">Convert</button>  
        </div>
      </form>
    </div>
  )
}

export default App
