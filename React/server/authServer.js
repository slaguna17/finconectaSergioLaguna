//IMPORTS
const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const userModel = require('./models/userModel')

//SERVER
const app = express()
const port = process.env.AUTH_PORT || 4000
app.use(express.json())
dotenv.config()

//REFRESH TOKEN (More secure than regular auth token)

let refreshTokens = []
app.post('/token', (req,res) => {
    const refreshToken = req.body.token
    if(refreshToken == null) return res.sendStatus(401)
    if(!refreshTokens.includes(refreshToken)) return res.sendStatus(403)
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (error, user) => {
        if(error) return res.sendStatus(403)
        const accessToken = generateAccessToken({name : user.name})
        res.json({accessToken: accessToken})
    })
})

app.post('/loginRefresh', (req,res) => {
    //Auth

    //ACCESS TOKEN
    const username = req.body.username
    // const user = {name: username}
    const accessToken = generateAccessToken(user)
    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
    refreshTokens.push(refreshToken)
    res.json({accessToken: accessToken, refreshToken: refreshToken})
})
function generateAccessToken(user){
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '60s'})
}

app.delete('/logout', (req,res) => {
    refreshTokens = refreshTokens.filter(token => token !== req.body.token)
    res.sendStatus(204)
} )

//NOT SO SECURE AUTH TOKEN

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


app.get("/get", authenticateToken, async(req, res)=>{
    console.log(req.user);
    const u = await userModel.find({name: req.user.name})
    res.json(u)
})
app.post('/login', async (req,res) => {
    //Auth

    //ACCESS TOKEN

    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
    res.json({accessToken: accessToken})
})

//Iniciar server
app.listen(port, ()=> {console.log("Authentication Server started in port "+ port)})