const PORT = 9999
const db = "mongodb://localhost:27017/neostore"
const userSchema = require('./models/userSchema')
const jwt = require('jsonwebtoken')
const jwtSecret = "randomtext"
const mongoose = require('mongoose')
const cors = require('cors')
const express = require('express')
const app = express()
const connectDB = async () => {
    try {
        await mongoose.connect(db, { useNewUrlParser: true })
        console.log(`Database connect at ${db}`)
    }
    catch (err) {
        console.log(err.message)
    }
}

function authenticationToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) {
        res.json({ err: 1, msg: "Token not found" })
    }
    else {
        jwt.verify(token, jwtSecret, (err, data) => {
            if (err) { res.json({ err: 1, msg: "Token incorrect" }) }
            else {
                console.log("Token match")
                next();
            }
        })
    }

}
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
connectDB()

app.get("/", (req, res) => {
    let payload = {
        email: "random"
    }
    const token = jwt.sign(payload, jwtSecret, { expiresIn: 3600000 })
    res.json({ "err": 0, "msg": "Login Success", "token": token })
})

app.get("/g", authenticationToken, (req, res) => {
    res.json({ err: 0 })
})

app.listen(PORT, (err) => { if (err) throw err; console.log(`Working on PORT ${PORT}`) })
