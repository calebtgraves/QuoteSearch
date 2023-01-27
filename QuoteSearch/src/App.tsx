import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'

interface Quote{
  content:string,
  author:string
};

function App() {
  const [quote, setQuote] = useState<Quote[]>([{content:'',author:''}])
  async function getRandomQuote(){
    const result = await fetch("https://usu-quotes-mimic.vercel.app/api/random");

    setQuote(await result.json())
  }

  useEffect(() =>{
    getRandomQuote()
  }, [])

  return (
    <div className="App">
      <h2>Quotes</h2>
      <form onSubmit={(event) => event.preventDefault()}>
        <input type='text' placeholder='Search for a quote...'/>
        <button>Enter</button>
      </form>
      <div>
        {
          quote.map((data) =>{
              return(
                <p className = "randomQuote">{data.content}</p>
              )
            })
        }
      </div>
    </div>
  )
}

export default App