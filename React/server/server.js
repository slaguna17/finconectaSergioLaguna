//IMPORTS
const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')

//SERVER
const app = express()
const port = process.env.PORT || 5000

//Variables de ambiente
dotenv.config()

//Conexion DB
const mongoURL = process.env.MONGO_URL

mongoose.connect(mongoURL).then(() =>{
    console.log("DB is connected")   
}).catch((error) => console.log(error))

const productSchema = new mongoose.Schema({
    name: String,
    price: Number
})

const productModel = mongoose.model('Product', productSchema);


app.get("/getProducts", async(req, res) => {
    const productData = await productModel.find();
    // const productData = {"users": ["userOne"]}
    console.log(productData)
    res.json(productData)
});

//API
app.get("/get", (req, res)=>{
    res.json({"users": ["userOne","userTwo", "userThree"]})
})

//Iniciar server
app.listen(port, ()=> {console.log("Server started in port "+ port)})