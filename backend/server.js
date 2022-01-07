const PORT = 9999
const db = "mongodb://localhost:27017/neostore"
const userSchema = require('./models/userSchema')
const subscribeSchema = require('./models/subscribeSchema')
const productSchema = require('./models/productSchema')
const colorSchema = require('./models/colorSchema')
const categoriesSchema = require('./models/categoriesSchema')
const bcrypt = require('bcrypt')
const CryptoJS = require('crypto-js')
const saltRounds = 10
const jwt = require('jsonwebtoken')
const jwtSecret = "randomtext"
const encryptSecret = "randomtext"
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
// connectDB()


app.post("/login", (req, res) => {
    let bytes = CryptoJS.AES.decrypt(req.body.data, encryptSecret);
    let decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
    // console.log(decryptedData)
    userSchema.findOne({ email: decryptedData.email }, (err, data) => {
        if (err) throw err;
        else if (data != null) {
            const bool = bcrypt.compareSync(decryptedData.password, data.password)
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
    let bytes = CryptoJS.AES.decrypt(req.body.data, encryptSecret);
    let decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
    userSchema.findOne({ email: decryptedData.email }, (err, data) => {
        if (err) throw err;
        else if (data != null) {
            res.json({ err: 1, msg: "User already exists" })
        }
        else {
            let body = decryptedData
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

app.post("/changepassword", (req, res) => {
    let bytes = CryptoJS.AES.decrypt(req.body.data, encryptSecret);
    let decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
    console.log(decryptedData)
    // userSchema.findOne({ email: decryptedData.email }, (err, data) => {
    //     if (err) throw err;
    //     else if (data != null) {
    //         const salt = bcrypt.genSaltSync(saltRounds)
    //         const hash = bcrypt.hashSync(decryptedData.password, salt)
    //         userSchema.updateOne({ email: data.email }, { $set: { password: hash } }, (err) => {
    //             if (err) throw err;
    //             else res.json({ err: 0 })
    //         })
    //     }
    // })
    res.end()
})

app.post("/recoverpassword", (req, res) => {
    let bytes = CryptoJS.AES.decrypt(req.body.data, encryptSecret);
    let decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
    //implement otp verification
    console.log(decryptedData)
    // userSchema.findOne({ email: decryptedData.email }, (err, data) => {
    //     if (err) throw err;
    //     else if (data != null) {
    //         const salt = bcrypt.genSaltSync(saltRounds)
    //         const hash = bcrypt.hashSync(decryptedData.password, salt)
    //         userSchema.updateOne({ email: data.email }, { $set: { password: hash } }, (err) => {
    //             if (err) throw err;
    //             else res.json({ err: 0 })
    //         })
    //     }
    // })
    res.end()
})

app.post("/subscribe", (req, res) => {
    let tmp = new subscribeSchema({ email: req.body.email })
    tmp.save((err) => { if (err) { res.json({ err: 0 }) } else { res.json({ err: 1 }) } })
})

app.get("/getproducts", (req, res) => {
    console.log(req.params)
    productSchema.find().populate(['category_id', 'color_id']).then(data => {
        res.json(data)
    })
})

app.get("/sentotp", (req, res) => {
    const nodemailer = require("nodemailer");
    async function main() {
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            secure: false,
            auth: {
                user: 'nstcoders@gmail.com', // generated ethereal user
                pass: 'nstcoders1234', // generated ethereal password
            },
        });
        let info = await transporter.sendMail({
            from: 'nstcoders@gmail.com', // sender address
            to: "rahulskenchi0@gmail.com", // list of receivers
            subject: "Reset your NeoStore Password.", // Subject line
            html: `<h3>Hello ${0} ,</h3>
            <p>
            Somebody requested a new password for your <span style="font-weight:bold;font-size:large">Neo<span style="color:red;">Store</span></span> account associated with ${'email'}.
            No changes have been made to your account yet.
            </p>
            <p>
            You can reset your password by using OTP <span style="font-weight:bold;font-size:large">${'123456'}</span>
            </p>
            <br/>
            <p>
            If you did not request a new password, please let us know immediately by replying to this email. <br/>           
            Yours,<br/>
            The NeoStore team
            </p>`, // plain text body
            // html body
        });
        console.log("Message sent: %s", info.messageId);
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    }

    // main().catch(console.error);
    res.json({ err: 0 })
})

app.listen(PORT, (err) => { if (err) throw err; console.log(`Working on PORT ${PORT}`) })


//code to test token generation and authentication
// app.get("/", (req, res) => {
//     let payload = {
//         enpstd: encryptSecret
//     }
//     const token = jwt.sign(payload, jwtSecret, { expiresIn: 3600000 })
//     res.json({ "err": 0, "msg": "Login Success", "token": token })
// })

// app.get("/g", authenticationToken, (req, res) => {
//     res.json({ err: 0 })
// })

