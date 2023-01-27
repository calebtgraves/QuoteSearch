import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'

interface Quote{
  _id:number
  content:string,
  author:string
};

function App() {
  const [quote, setQuote] = useState<Quote>({_id:0,content:'',author:''})
  const [quotes, setQuotes] = useState<Quote[]>([])
  async function getRandomQuote(){
    const result = await fetch("https://usu-quotes-mimic.vercel.app/api/random");
    setQuote(await result.json())
  }

  useEffect(() =>{
    getRandomQuote()
  }, [])

  async function getQuotes(search: string){
    const result = await fetch("https://usu-quotes-mimic.vercel.app/api/search?query="+search)
    .then((response) => response.json())
    .then((data) => data.results);

    setQuotes(result)
    console.log(result)
  }

  const submitSearch = (event) =>{
    event.preventDefault()
    getQuotes(event.target.quoteSearch.value)
  }

  return (
    <div className="App">
      <h2>Quotes</h2>
      <form onSubmit={submitSearch}>
        <input name='quoteSearch' type='text' placeholder='Search for a quote...'/>
        <button>Enter</button>
      </form>
      <div>
        {quote.content}
        <p className = 'author'>-{quote.author}</p>
      </div>
      <div>
        {
          quotes.map((quote) =>(
            <div key={quote._id}>
              {quote.content}
              -{quote.author}
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default App