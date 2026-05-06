/**
 * Routes som berör registrering och inloggning
 */

const express = require("express");
const router = express.Router();

//Lägga till ny användare
router.post("/register", async (req, res) => {
    try {
        const { username, password } = req.body;

        //Validera input
if (!username || !password) {
    return res.status(400).json({ errror: "Invalid input"});
}
//Korrekt - spara användare
res.status(201).json({ message: "Användare skapad"});

    } catch (error) {
        res.status(500).json({ error: "Servererror" });
    }
});

//Logga in användare
router.post("/login", async (req, res) => {
try {
const { username, password } = req.body;

        //Validera input
if (!username || !password) {
    return res.status(400).json({ errror: "Invalid input"});
}

//Kontrollera credentials
if(username === "Elin" && password === "1234") {
    res.status(200).json({ message: "Inloggning lyckades"});
} else {
    res.status(401).json({ error: "Ogiltigt användarnamn eller lösenord"});
}

} catch (error) {
    res.status(500).json({ error: "Servererror"});
}
});

module.exports = router;