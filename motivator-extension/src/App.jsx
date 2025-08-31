import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [quote,setQuote]=useState(null);
  const [allQuotes,setAllQuotes]=useState([])
  const [fav,setFav]=useState([])
  const [toast,setToast]=useState('')

 

  useEffect(()=>{
    fetch("http://localhost:3000/quotes")
    .then((res)=>res.json())
    .then((data)=>setAllQuotes(data))
    .catch(()=>{
      setAllQuotes([{text: "Keep going, you are doing great! ✨"}]);
    })

    const savedFavourites=localStorage.getItem("fav");
    if(savedFavourites){
      setFav(JSON.parse(savedFavourites))
    }
  },[])

  useEffect(()=>{
    localStorage.setItem("fav",JSON.stringify(fav));
  },[fav])

  function getWeightedrandom(quotes,favourites){
    const weightedList=[];

    quotes.forEach((q)=>{
        const isFav=favourites.some((fav)=>fav.text===q.text);
        const weight=isFav ? 3 : 1;
        for (let i =0;i<weight;i++){
          weightedList.push(q);
        }
    })
    const randomIndex = Math.floor(Math.random() * weightedList.length);
    return weightedList[randomIndex];
  }

  const getQuote=()=>{
    if(allQuotes.length==0) return;
    const randomQuote=getWeightedrandom(allQuotes,fav);
    setQuote(randomQuote)
  }

  const addToFavourites=()=>{
    if(!quote) return;

    if (!fav.some((f) => f.text === quote.text)) {
      const updated = [...fav, quote];
      setFav(updated);
      setToast("✅ Added to favourites!");
      setTimeout(() => setToast(""), 2000); 
    }
  };
  

  return (
    <>
      <div className="style">
        <h1>🌟 Your Daily Motivation 🌟</h1>

        {quote ? <p>"{quote.text}"</p> : <p>Click below to get a quote</p>}

        <button onClick={getQuote}>✨ Get Quote</button>

        {quote && (
          <button onClick={addToFavourites} style={{ marginLeft: "10px" }}>
            ❤️
          </button>
        )}

        {toast && <div className="toast">{toast}</div>}
      </div>
    </>
  )
}


export default App
