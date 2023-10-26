const express = require('express')
const user = require("./mangodb")
const app = express()
const path = require('path')
const PORT = process.env.PORT || 3500;
const hbs = require('hbs')



app.use(express.json())
app.set("view engine","hbs")
app.use(express.urlencoded({extended:false}))
app.use('/',express.static(path.join(__dirname,'./public')))


app.get("^/$|login(.html)?",(req,res) => {
    res.render("login")
})

app.get("/signup(.html)?",(req,res) => {
    res.render("signup")
})

app.post("/signup(.html)?", async (req,res) => {
    const data = {
        email:req.body.email,
        password:req.body.password
    }
    console.log(data)
    await user.insertMany([data]);
    res.render("login")
})

app.post("/login(.html)?", async (req,res) => {
   try{
      const check = await user.findOne({email:req.body.email})
      if(check.password === req.body.password) {
        res.render("home")
      } else {
        res.send("Wrong Password")
      }
   }
   catch{
       res.send("wrong details")
   }
    
})
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));