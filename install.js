require("dotenv").config();
const express = require("express");
const sqlite3 = require("sqlite3").verbose();

//Ansluta
const db = new sqlite3.Database(process.env.SQLITE_DB);

//Skapa tabell med användare
db.serialize(() => {
    //Drop table if exists
    db.run("DROP TABLE IF EXISTS users");

    db.run(`CREATE TABLE users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        created DATETIME DEFAULT CURRENT_TIMESTAMP
        )`);
        console.log("Tabellen är skapad!");
});