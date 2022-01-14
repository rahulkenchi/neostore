const nodemailer = require("nodemailer");
const userSchema = require('../models/userSchema')
const subscribeSchema = require('../models/subscribeSchema')
const productSchema = require('../models/productSchema')
const colorSchema = require('../models/colorSchema')
const categoriesSchema = require('../models/categoriesSchema')
const orderSchema = require('../models/orderSchema')
const dotenv = require('dotenv')
const bcrypt = require('bcrypt')
const CryptoJS = require('crypto-js')
const jwt = require('jsonwebtoken')
const axios = require('axios')
const express = require('express')
const router = express.Router()
dotenv.config()

router.get("/", (req, res) => {
    let payload = {
        enpstd: process.env.encryptSecret
    }
    const token = jwt.sign(payload, process.env.jwtSecret, { expiresIn: 3600000 })
    res.json({ "err": 0, "msg": "Token generation Success", "token": token })
})

router.get("/getproducts", (req, res) => {
    productSchema.find().populate(['category_id', 'color_id']).then(data => {
        res.json(data)
    })
})

router.get("/getcategories", (req, res) => {
    categoriesSchema.find({}, (err, data) => {
        if (err) { res.json({ err: 1, msg: 'error fetching categories' }) }
        else if (data != null) {
            res.json({ err: 0, 'data': data })
        }
    })
})

router.get("/getcolors", (req, res) => {
    colorSchema.find({}, (err, data) => {
        if (err) {
            res.json({ err: 1, msg: 'error fetching colors' })
        }
        else if (data != null) {
            res.json({ err: 0, 'data': data })
        }
    })
})

router.get("/commonproducts", (req, res) => {
    productSchema.find(req.query, (err, data) => {
        if (err) {
            res.json({ err: 1, msg: 'Please inform this to technical team' });
        }
        else if (data != null) {
            res.json({ err: 0, 'data': data })
        }
    })
})

router.get("/defaultTopRatingProduct", (req, res) => {
    productSchema.find({}).sort({ product_rating: -1 }).limit(6).populate(['category_id', 'color_id'])
        .then(response => res.json(response))
        .catch(err => res.send({ 'err': 1, msg: err }))
})

router.get("/getAllCategories", (req, res) => {
    productSchema.find({}, "product_image").sort({ product_rating: -1 }).limit(6)
        .then(response => res.json(response))
        .catch(err => res.send({ 'err': 1, msg: err }))
})

router.post("/sentotp", async (req, res) => {
    let otp = Math.floor(100000 + Math.random() * 900000);
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        secure: false,
        auth: {
            user: process.env.user, // generated ethereal user
            pass: process.env.pass, // generated ethereal password
        },
    });
    let info = await transporter.sendMail({
        from: process.env.user, // sender address
        to: req.body.email, // list of receivers 
        subject: "Reset your NeoStore Password.", // Subject line
        html: `<h3>Hello ${req.body.email} ,</h3>
            <p>
            Somebody requested a new password for your <span style="font-weight:bold;font-size:large">Neo<span style="color:red;">Store</span></span> account associated with ${req.body.email}.
            No changes have been made to your account yet.
            </p>
            <p>
            You can reset your password by using OTP <span style="font-weight:bold;font-size:large">${otp}</span>
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
    userSchema.findOneAndUpdate({ email: req.body.email }, { 'otp': otp })
        .then(response => {
            setTimeout(() => { userSchema.findOneAndUpdate({ email: req.body.email }, { 'otp': 'NO' }).then(r => console.log("CALLED")) }, 180000)
            //above code sets otp value after 3 mins
            let payload = {
                enpstd: process.env.encryptSecret
            }
            const token = jwt.sign(payload, process.env.jwtSecret, { expiresIn: 3600000 })
            res.json({ "err": 0, "msg": "Token generation Success", "token": token })
        }
        )

})

router.post("/login", (req, res) => {
    let bytes = CryptoJS.AES.decrypt(req.body.data, process.env.encryptSecret);
    let decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
    console.log(decryptedData)
    if (decryptedData._provider != undefined && decryptedData._profile != undefined) {
        userSchema.findOne({ email: decryptedData._profile.email }, (err, data) => {
            if (err) throw err;
            else if (data != null) {
                const jwt_decode = require('jwt-decode')
                console.log(jwt_decode(decryptedData._token.idToken), decryptedData)
                res.json({ err: 0, msg: 'Login successfull' })
            }
            else {
                res.json({ err: 3, msg: "User not found , please register first." })
            }
        })
        // console.log(decryptedData)
    }
    else {
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
                        gender: data.gender,
                    }
                    const token = jwt.sign(payload, process.env.jwtSecret, { expiresIn: 3600000 })
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
    }
})

router.post("/registeration", (req, res) => {
    console.log('IN resgisteration')
    let bytes = CryptoJS.AES.decrypt(req.body.data, process.env.encryptSecret);
    let decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
    console.log(decryptedData)
    userSchema.findOne({ email: decryptedData.email }, (err, data) => {
        if (err) throw err;
        else if (data != null) {
            res.json({ err: 1, msg: "User already exists" })
        }
        else {
            if (decryptedData._provider != undefined && decryptedData._profile != undefined) {
                axios.get(`https://www.googleapis.com/oauth2/v3/tokeninfo?access_token=${decryptedData._token.accessToken}`)
                    .then(response => {
                        console.log(response.data, response.data.error)
                        if (response.data.error != undefined) {
                            res.json({ err: 3, msg: `${decryptedData._provider} says ${response.data.error_description} ` })
                        }
                        else {
                            if (response.data.email == decryptedData._profile.email) {
                                let tmp = {
                                    'firstname': decryptedData._profile.firstName,
                                    'lastname': decryptedData._profile.lastName,
                                    'email': decryptedData._profile.email,
                                    'email_verified': response.data.email_verified,
                                    'profilePicURL': decryptedData._profile.profilePicURL,
                                    'sociallogin': {
                                        '_provider': decryptedData._provider
                                    }
                                }
                                console.log("Equaljwt_decode(decryptedData._token.idToken).email_verified,")
                                let datasave = new userSchema(tmp)
                                datasave.save(err => {
                                    if (err) {
                                        res.json({ err: 2, msg: "Error registering user." })
                                    }
                                    else {
                                        res.json({ err: 0, msg: 'Registeration' })
                                    }
                                })
                            }
                        }

                    })
            }
            else {
                console.log("OK NEW USER", decryptedData)
                let body = decryptedData
                const salt = bcrypt.genSaltSync(Number(process.env.saltRounds))
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
        }
    })
})

router.post("/changepassword", (req, res) => {
    let bytes = CryptoJS.AES.decrypt(req.body.data, process.env.encryptSecret);
    let decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
    console.log(decryptedData)
    userSchema.findOne({ email: decryptedData.email }, (err, data) => {
        if (err) throw err;
        else if (data != null) {
            const salt = bcrypt.genSaltSync(Number(process.env.saltRounds))
            const hash = bcrypt.hashSync(decryptedData.password, salt)
            userSchema.updateOne({ email: data.email }, { $set: { password: hash } }, (err) => {
                if (err) throw err;
                else res.json({ err: 0 })
            })
        }
    })
})

router.post("/recoverpassword", (req, res) => {
    let bytes = CryptoJS.AES.decrypt(req.body.data, process.env.encryptSecret);
    let decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8))

    userSchema.findOne({ email: decryptedData.email }, (err, data) => {
        if (err) throw err;
        else if (data != null) {
            if (data.otp == decryptedData.verificationcode) {
                const salt = bcrypt.genSaltSync(Number(process.env.saltRounds))
                const hash = bcrypt.hashSync(decryptedData.password, salt)
                userSchema.updateOne({ email: data.email }, { $set: { password: hash, 'otp': 'NO' } }, (err) => {
                    if (err) throw err;
                    else res.json({ err: 0 })
                })
            }
            else {
                res.json({ err: 1, msg: 'OTP does not match' })
            }
        }
    })
})

router.post("/subscribe", (req, res) => {
    let tmp = new subscribeSchema({ email: req.body.email })
    tmp.save((err) => { if (err) { res.json({ err: 0 }) } else { res.json({ err: 1 }) } })
})

router.post("/getsearch", (req, res) => {
    productSchema.find({ product_name: { $regex: req.body.data, $options: '$i' } }, "product_name").populate(['category_id', 'color_id'])
        .then(response => {
            res.json(response)
        })
})

router.post("/getproductdetail", (req, res) => {
    productSchema.findOne({ _id: req.query.id }).populate(["category_id", "color_id"])
        .then(data => {
            if (data != null) {
                res.json(data)
            }
            else {
                res.json({ err: 1, msg: "No such item found" })
            }
        })
})

router.post("/profile", (req, res) => {
    userSchema.findOne({ email: req.body.email }, (err, data) => {
        if (err) throw err;
        else if (data != null) {
            let tmp = {
                'firstname': data.firstname,
                'lastname': data.lastname,
                'email': data.email,
                'gender': data.gender,
                'mobile': data.mobile,
            }
            res.json({ err: 0, 'data': tmp })
        }
        else {
            res.json({ err: 1, msg: 'User not found' })
        }
    })
})

router.post("/updateprofile", (req, res) => {
    let email = req.body.data.email
    let tmp = req.body.data
    delete tmp.email
    userSchema.findOneAndUpdate({ email: email }, tmp, (err) => {
        if (err) res.json({ err: 1, msg: 'Updation err' });
        else {
            res.json({ err: 0, msg: 'Success' })
        }
    })
})

router.post("/addaddress", (req, res) => {
    let email = req.body.data.email
    let tmp = req.body.data
    delete tmp.email
    // console.log(tmp)
    userSchema.findOneAndUpdate({ email: email }, { $push: { address: tmp } }, (err) => {
        if (err) res.json({ err: 1, msg: 'Updation err' });
        else {
            res.json({ err: 0, msg: 'Success' })
        }
    })
})

router.post("/getaddress", (req, res) => {
    userSchema.findOne({ email: req.body.email }, (err, data) => {
        if (err) throw err;
        else if (data != null) {
            res.json({ err: 0, 'address': data.address, msg: 'Fetch success' })
        }
    })
})

router.post("/setaddress", (req, res) => {
    userSchema.findOneAndUpdate({ email: req.body.email }, { $set: { address: req.body.address } }, (err) => {
        if (err) res.json({ err: 1 })
        else {
            res.json({ err: 0, msg: 'Address modified' })
        }
    })
})

router.post("/getcart", (req, res) => {
    userSchema.findOne({ email: req.body.email }, (err, data) => {
        if (err) res.json({ err: 1, msg: "Error fetch cart in database" })
        else {
            userSchema.findOneAndUpdate({ email: req.body.email }, { $set: { cart: [] } }).then()
            res.json({ err: 0, 'cart': data.cart })
        }
    })
})

router.post("/setcart", (req, res) => {
    userSchema.findOneAndUpdate({ email: req.body.email }, { $set: { cart: req.body.cart } }, (err) => {
        if (err) res.json({ err: 1, msg: "Error fetch cart in database" })
        else {
            res.json({ err: 0, 'msg': 'Cart set' })
        }
    })
})

router.post("/addrating", (req, res) => {
    productSchema.findOne({ _id: req.body._id }, (err, data) => {
        if (err) throw err;
        else if (data != null) {
            data.rating_count += 1
            data.product_rating = (data.product_rating + req.body.rating) / data.rating_count
            productSchema.updateOne({ _id: req.body._id }, { $set: { 'product_rating': data.product_rating, 'rating_count': data.rating_count } }, (err) => {
                if (err) throw err;
                else {
                    res.json({ err: 0, msg: 'Rating success' })
                }
            })
        }
        else {
            res.json({ err: 1, msg: 'Product not found' })
        }
    })
})

router.post("/orderaddress", (req, res) => {
    let tmp = new orderSchema(req.body)
    tmp.save(err => {
        if (err) throw err;
        else {
            res.json({ err: 0 })
        }
    })
})

router.post("/getorder", (req, res) => {
    orderSchema.find({ email: req.body.email }, (err, data) => {
        if (err) throw err;
        console.log(data)
        res.json({ err: 0, 'order': data })
    })
})

module.exports = router