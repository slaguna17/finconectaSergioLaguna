//IMPORTS
const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

//MODELS
const productModel = require('./models/productModel')
const userModel = require('./models/userModel')

//SERVER
const app = express()
const port = process.env.PORT || 5000
app.use(express.json())
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
//PRODUCTS
app.get("/getProducts", async(req, res) => {
    try {
        const productData = await productModel.find();
        res.json(productData)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
});

app.get("/getProductID", async(req, res) => {
    try {
        const name = req.params.name
        const price = req.params.price
        console.log(name);
        const productData = await productModel.find({name: name});
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

app.delete('/deleteProduct/:id', async (req, res) => {
    try {
        const {id} = req.params
        console.log(id);
        const productData = await productModel.findByIdAndDelete(id);
        console.log(productData);
        if(! productData){
            return res.status(404).json({message: 'There is no product to delete'})
        }
        res.status(200).send({message: 'Se elemino correctamente el producto', id})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

//USER AND AUTH
app.get("/get", authenticateToken, async (req, res)=>{
    const u = await userModel.find({name: req.user.name})
    res.json(u)
})

app.post('/login', async (req,res) => {
    const user = await userModel.findOne({name: req.body.name, email: req.body.email})
    console.log(user);
    if(user != null){
        if (await bcrypt.compare(req.body.password, user.password)){
            const accessToken = jwt.sign(JSON.stringify(user), process.env.ACCESS_TOKEN_SECRET)
            console.log(accessToken);
            res.status(200).json({accessToken: accessToken, message : 'Correct Password'})
            console.log('token creado para', user.name);
        } else {
         console.log('Wrong Password');
         res.status(403).send()
        }
    } else {
        console.log('Usuario no encontrado');
        res.status(404).send()
    }
})

app.post('/signup', async (req, res) => {
    try{
        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(req.body.password, salt)
        const newUser = {name: req.body.name, email: req.body.email, password: hashedPassword}
        console.log(newUser);
        await userModel.create(newUser)
        res.status(201).json({message: 'User created correctly'})
    } catch {
        res.status(500).send()
    }
    
})

//Iniciar server
app.listen(port, ()=> {console.log("Server started in port "+ port)})