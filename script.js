const app_id = "62b8e9d0";
const app_key = "a0346239bb6b1dd70086069089a17bc7";


const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");

const app = express();

// allow frontend requests
app.use(cors());

// test route (optional but recommended)
app.get("/", (req, res) => {
    res.send("Backend is working");
});

// API route
app.get("/recipes", async (req, res) => {
    try {
        const query = req.query.q;

        const url = `https://api.edamam.com/search?q=${query.value}&app_id=${app_id}&app_key=${app_key}`;

        const response = await fetch(url);
        const data = await response.json();

        res.json(data);
    } catch (error) {
        res.status(500).json({ error: "Something went wrong" });
    }
});

app.listen(5000, () => {
    console.log("Server running on http://localhost:5000");
});
