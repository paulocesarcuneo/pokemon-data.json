const jsonServer  = require('json-server')
const path = require("path")
const auth = require('json-server-auth')
const express = require("express")
const cors = require('cors')

const server = jsonServer.create()
server.use(cors({
    origin: 'http://localhost:5173', 
    methods: ['GET'],
    allowedHeaders: ['Content-Type', 'Authorization']}))
server.use(auth)
server.use('/images', express.static(path.join(__dirname, 'images')))
server.use(jsonServer.router({
        items: require("./items.json"),
        moves: require("./moves.json"),
        pokedex: require("./pokedex.json"),
        types: require("./types.json")
    }))
const dbRouter = jsonServer.router("db.json")
server.db = dbRouter.db
server.listen(3000)