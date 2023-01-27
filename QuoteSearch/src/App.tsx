import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'

interface Quote{
  content:string,
  author:string
};

function App() {
  const [quote, setQuote] = useState<Quote>({content:'',author:''})
  const [quotes, setQuotes] = useState<Quote[]>([])
  async function getRandomQuote(){
    const result = await fetch("https://usu-quotes-mimic.vercel.app/api/random");
    setQuote(await result.json())
  }

  useEffect(() =>{
    getRandomQuote()
  }, [])

  async function getQuote(search: string){
    const result = await fetch("https://usu-quotes-mimic.vercel.app/api/random/"+search);
    setQuotes(await result.json())
  }

  
  return (
    <div className="App">
      <h2>Quotes</h2>
      <form onSubmit={(event) => event.preventDefault()}>
        <input type='text' placeholder='Search for a quote...'/>
        <button>Enter</button>
      </form>
      <div>
        {quote.content}
      </div>
    </div>
  )
}

export default App