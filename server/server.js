// Server-side global vars
require(`dotenv`).config({ path: `./config/.env` });
// Database
require(`./config/db`)

// Express
const express = require('express');

const cors = require(`cors`);
const app = express();
app.use(cors({credentials:true, origin: process.env.LOCAL_HOST}));
app.use(express.json())

const port = process.env.PORT || 5000;
// Port
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})

// Routers

app.use(require(`./routes/users`))

app.use(`/api/users`, require('./routes/users'));