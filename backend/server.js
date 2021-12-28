const PORT = 9999
const userSchema = require('./models/userSchema')
const mongoose = require('mongoose')
const cors = require('cors')
const express = require('express')
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))




app.listen(PORT, (err) => { if (err) throw err; console.log(`Working on PORT ${PORT}`) })
