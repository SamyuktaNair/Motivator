const express = require("express");
const cors = require("cors");
const quotes = require("./quotes.json");

const app=express()
app.use(cors())

app.get("/quotes",(req,res)=>{
//    const randomIndex=Math.floor(Math.random() * quotes.length);
//    const randomQuote=quotes[randomIndex]
   
   res.json(quotes)
})

app.listen(3000,()=>{
    console.log("YO")
})