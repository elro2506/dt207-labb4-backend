/**
 * Routes som berör registrering och inloggning
 */
require("dotenv").config();
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

//Anslut till databas
mongoose.set("strictQuery", false);
mongoose.connect(process.env.DATABASE).then(() => {
    console.log("Ansluten till MongoDB");
}).catch((error) => {
    console.log(error);
});

//User model
const User = require("../models/User");



//Lägga till ny användare
router.post("/register", async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ error: "Invalid input, send username and password" });
        }

        const user = new User({ username, password });
        await user.save();

        res.status(201).json({ message: "User created" });

    } catch (error) {

        //Om användaren redan finns (såg errorkod 1100 i Thunder client när jag försökte lägga till användare två gånger)
        if (error.code === 11000) {
            return res.status(500).json({ error: "Användarnamn är upptaget" });
        }

        res.status(500).json({ error: error.message });
    }
});


//Logga in användare
router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;

        //Validera input
        if (!username || !password) {
            return res.status(400).json({ error: "Invalid input" });
        }

        //Finns användaren?
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ error: "Ogiltigt användarnamn eller lösenord" });
        }

        //Kolla lösenord
        const isPasswordMatch = await user.comparePassword(password);
        if (!isPasswordMatch) {
            return res.status(401).json({ error: "Ogiltigt användarnamn eller lösenord" });
        } else {
            //Skapa JWT
            const payload = { username: username };
            const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: '5h' });
            const response = {
                message: "User logged in!",
                token: token
            };
            res.status(200).json({ response });
        }
            
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
});

module.exports = router;