// Server-side global vars
require(`dotenv`).config({ path: `./config/.env` });
// Database
require(`./config/db`)

// Express
const express = require('express');

const cors = require(`cors`);
const app = express();

app.use(cors());
app.use(require(`body-parser`).json())
// app.use(cors({ origin: process.env.LOCAL_HOST, credentials: true }));

const jwt = require(`jsonwebtoken`)
const port = process.env.PORT || 5001;
// Port
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})

// Routers

app.use(`/api/users`, require('./routes/users'));