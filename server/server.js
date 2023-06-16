require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const productRoutes = require('./routes/products')
const cors = require('cors')
const app = express()
const path = require('path');


//middleware
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

app.use(cors({
    origin: '*'
}));
app.use(express.static(path.join(__dirname, "../client/build")))
app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "../client/build/index.html"))
)



//routes
app.use('/api/products', productRoutes)

//connect to database 
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT || 4000, () => {
            console.log('connected to database and listening on port', process.env.PORT)
        })
    })
    .catch((error) => {
        console.log(error)
    })


