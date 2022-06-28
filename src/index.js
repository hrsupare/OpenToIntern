const express = require('express')
const route = require('./route/route')
const mongoose = require('mongoose')
const bodyparser = require('body-parser')
const app = express();

app.use(bodyparser.json())

mongoose.connect("mongodb+srv://anik2310:anik123@cluster0.tby9aun.mongodb.net/group28Database",{
    useNewUrlParser:true
})
.then( ()=> console.log("Mongodb is connected"))
.catch(err => console.log(err))

app.use('/', route)

const PORT = (process.env.PORT || 3000)
app.listen(PORT, function(){
    console.log(`Express app on running ${PORT}`)
});