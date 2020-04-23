const path = require("path")
const express = require('express');
const hbs = require('hbs');

const app = express()
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

app.use(express.static(path.join(__dirname,'..','/public')))
const partialPath = path.join(__dirname,'../src/templates/partials');


app.set('view engine','hbs')
app.set('views',path.join(__dirname,'..','/src/templates/views'))
hbs.registerPartials(partialPath);


app.get('',(req,res)=> {
    res.render('index',{
        title:"Weather",
        name:"Sumanth K V"
    })
})

app.get('/about',(req,res)=> {
    res.render('about',{
        title:"About",
        name:"Sumanth K V"
    });
})

app.get('/help',(req,res)=> {
    res.render('help',{
        title:"Help",
        message:"Currently we were on holidays",
        name:"Sumanth k v"
    })
})

app.get('/weather',(req,res)=> {

    if(!req.query.address) {
        return res.send({
            error:"Please provide the address"
        })
    }

    geocode(req.query.address,(error,{latitude,longitude,location} = {})=> {
        if(error) {
           return res.send({
               error:"Error"
           })
        }     
        else {
           forecast(latitude,longitude,(error,data)=> {
               return res.send({
                   info:data,
                   location: location
               })
               
           })
        }

})

app.get('/products',(req,res)=> {

    if(!req.query.search) {
      return  res.send({
            error:"You must provide  search term"
        })
    }

})

})

app.get('/help/*',(req,res)=> {

    res.render("help404",{
        title:"HELP 404 NOT FOUND",
        name:"Sumanth K V",
        message:"Help article not found"
    })
})

app.get('*',(req,res)=> {
    res.render('error404',{
        title:"ERROR 404 NOT FOUND",
        name:"SUMANTH K V",
        message:"PAGE NOT FOUND"
    })
})


app.listen(3000,()=> {
    console.log("Server is up on port 8080");
})