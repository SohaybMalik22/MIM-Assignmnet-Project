const router = require("express").Router();
const { check, validationResult } = require("express-validator");
const JWT = require("jsonwebtoken")
const bcrypt = require('bcrypt');
const User = require("../models/user")
const Sender = require("../models/sender")

// SIGNUP
router.post("/signup", [
    check("email", "Please input a valid email")
        .isEmail(),
    check("password", "Please input a password with a min length of 6")
        .isLength({ min: 6 })
], async (req, res) => {
    const { balance, account, email, password, confirmpass } = req.body;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({
            errors: errors.array()
        })
    }

    const user = await User.findOne({ $or: [{ email }] })

    if (user) {
        return res.status(422).json({
            errors: [
                {
                    msg: "User already exists",
                }
            ]
        })
    }
    const newUser = await User.create({ balance, account, email,password, confirmpass })

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const token = await JWT.sign({ email }, "nfb32iur32ibfqfvi3vf932bg932g932", { expiresIn: 360000 });

    res.json({
        name: newUser.name, email: newUser.email, password: newUser.password, confirmpass: newUser.confirmpass, token
    })
})

// LOGIN
router.post('/login', async (req, res) => {
    const { email, password } = req.body

    const user = await User.findOne({ $or: [{ email, password }] })

    if (!user) {
        return res.status(422).json({
            errors: [
                {
                    msg: "No user find with this email",
                }
            ]
        })
    }

    if (password != user.password) {
        return res.status(404).json({
            errors: [
                {
                    msg: "Incorrect Password"
                }
            ]
        })
    }

    // Send JSON WEB TOKEN
    const token = await JWT.sign({ email }, "nfb32iur32ibfqfvi3vf932bg932g932", { expiresIn: 360000 })

    res.json({
        token, password: user.password, email: user.email
    })
})

router.post('/sendmoney', async (req, res) => {
    const user = new Sender({
        email: req.body.email,
        sender: req.body.sender,
        reciver: req.body.reciver,
        money: req.body.money
    })

    try {
        const u1 = await user.save()
        console.log("------", u1)
        res.json(u1)
    } catch (err) {
        res.send('Error')
    }
})

// ALL USER
router.get('/all', async (req, res) => {
    try {
        const users = await User.find()
        res.json(users)

    }
    catch (err) {
        res.send('Error', +err)
    }
})

//get transaction related to user
router.get('/singleUser', async (req, res) => {

    try {
        const singleuser = await Sender.find()
        res.json(singleuser)
    }
    catch (err) {
        res.send('Error', +err)
    }
})


module.exports = router