//IMPORTS
const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const jwt = require('jsonwebtoken')
const productModel = require('./models/productModel')

//SERVER
const app = express()
const port = process.env.PORT || 5000
app.use(express.json())


//Variables de ambiente
dotenv.config()

//Conexion DB
const mongoURL = process.env.MONGO_URL

mongoose.connect(mongoURL).then(() =>{
    console.log("DB is connected")   
}).catch((error) => console.log(error))

//Middleware
function authenticateToken(req, res, next){
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if(token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, user) => {
        if (error) return res.sendStatus(403)
        req.user = user
    next()
    })
}

//API

//GETS

app.get("/get", authenticateToken, (req, res)=>{
    const exampleUsers = [
        {
            username: "Sergio",
            title: 'Post 1'
        },
        {
            username: "Andres",
            title: 'Post 2'
        }
    ]
    res.json(exampleUsers.filter(post => post.username === req.user.name))
})

app.post('/login', (req,res) => {
    //Auth

    //ACCESS TOKEN
    const username = req.body.username
    const user = {name: username}
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
    res.json({accessToken: accessToken})
})


app.get("/getProducts", async(req, res) => {
    try {
        const productData = await productModel.find();
        // console.log(productData)
        res.json(productData)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
});



app.get("/getProduct/:id", async(req, res) => {
    try {
        const {id} = req.params
        const productData = await productModel.findById(id);
        console.log(productData)
        res.json(productData)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
});



//POSTS
app.post('/addProduct', async (req, res)=>{
    try {
        const newProduct = await productModel.create(req.body)
        console.log(req.body)
        res.status(200).json(newProduct)
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message: error.message})
    }
})

//PUT
app.put('/updateProduct/:id', async (req,res)=>{
    try {
        const {id} = req.params
        const productData = await productModel.findByIdAndUpdate(id, req.body);
        if(! productData){
            return res.status(404).json({message: 'There is no product'})
        }
        res.status(200).json(productData)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

//DELETE
app.delete('/deleteProduct/:id', async (req, res) => {
    try {
        const {id} = req.params
        const productData = await productModel.findByIdAndDelete(id);
        if(! productData){
            return res.status(404).json({message: 'There is no product to delete'})
        }
        res.status(200).json(productData)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

//Iniciar server
app.listen(port, ()=> {console.log("Server started in port "+ port)})