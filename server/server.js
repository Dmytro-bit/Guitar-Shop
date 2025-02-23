// Server-side global vars


require(`dotenv`).config({ path: `./config/.env` });
// Database
require(`./config/db`)

// Express

const express = require('express');
const cors = require(`cors`);
const app = express();
const MEDIA_DIR = "./media";

module.exports = {MEDIA_DIR};

app.use(cors());
app.use(require(`body-parser`).json())
// app.use(cors({ origin: process.env.LOCAL_HOST, credentials: true }));


const createHttpError = require("http-errors");


const port = process.env.PORT || 5001;
// Port
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})

// Routers

app.use(`/api/users`, require('./routes/users'));

// error-handling

app.use((req, res, next) => {next(createHttpError(404))});

const errorHandler = (err, req, res, next) =>
{
    if (!err.statusCode)
    {
        err.statusCode = 500
    }

    // check that all required parameters are not empty in any route
    if (err instanceof ReferenceError)
    {
        err.statusCode = 400
        err.message = "Cannot reference a variable that has not been declared. This can be caused in run-time if the user did not input a parameter that is required by a router"
    }

    // Server-side error details
    console.log("Error Details...",err.message)

    res.status(err.statusCode).send(err.message)
}
app.use(errorHandler);