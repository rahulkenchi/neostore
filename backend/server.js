const PORT = 9999
const db = "mongodb://localhost:27017/neostore"
const userSchema = require('./models/userSchema')
const bcrypt = require('bcrypt')
const saltRounds = 10
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


app.post("/login", (req, res) => {
    userSchema.findOne({ email: req.body.email }, (err, data) => {
        if (err) throw err;
        else if (data != null) {
            let bool = bcrypt.compareSync(req.body.password, data.password)
            if (bool) {
                let payload = {
                    firstname: data.firstname,
                    lastname: data.lastname,
                    email: data.email,
                    mobile: data.mobile,
                    gender: data.gender
                }
                const token = jwt.sign(payload, jwtSecret, { expiresIn: 3600000 })
                res.json({ err: 0, msg: "Login Successfully", token: token })
            }
            else {
                res.json({ err: 1, msg: "Password does not match." })
            }
        }
        else {
            res.json({ err: 2, msg: "User not found , please register first." })
        }
    })
})

app.post("/registration", (req, res) => {
    userSchema.findOne({ email: req.body.email }, (err, data) => {
        if (err) throw err;
        else if (data != null) {
            res.json({ err: 1, msg: "User already exists" })
        }
        else {
            let body = req.body
            const salt = bcrypt.genSaltSync(saltRounds)
            const hash = bcrypt.hashSync(body.password, salt)
            body.password = hash
            let tmp = new userSchema(body)
            tmp.save((err) => {
                if (err) {
                    res.json({ err: 2, msg: "Error registering user." })
                }
                else {
                    res.json({ err: 0 })
                }
            })
        }
    })
})

app.listen(PORT, (err) => { if (err) throw err; console.log(`Working on PORT ${PORT}`) })



//code to test token generation and authentication
// app.get("/", (req, res) => {
//     let payload = {
//         email: "random"
//     }
//     const token = jwt.sign(payload, jwtSecret, { expiresIn: 3600000 })
//     res.json({ "err": 0, "msg": "Login Success", "token": token })
// })

// app.get("/g", authenticationToken, (req, res) => {
//     res.json({ err: 0 })
// })
