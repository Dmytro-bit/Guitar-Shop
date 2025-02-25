const MEDIA_DIR = "./media";


// Server-side global vars
require(`dotenv`).config({path: `./config/.env`});
// Database
require(`./config/db`)

// Express
const express = require('express');

const cors = require(`cors`);
const app = express();
app.use(cors({credentials: true, origin: process.env.LOCAL_HOST}));
app.use(express.json())

const port = process.env.DB_PORT || 5000;
// Port
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})

// Routers

app.use(require(`./routes/users`))

app.use(`/api/users`, require('./routes/users'));
app.use(``, require(`./routes/shoppingCart`))
app.use(``, require(`./routes/order`))
app.use(``, require(`./routes/product`))

module.exports = {MEDIA_DIR};