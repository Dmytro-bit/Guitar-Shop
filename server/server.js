// Server-side global vars


require(`dotenv`).config({path: `./config/.env`});
// Database
require(`./config/db`)

// Express

const express = require('express');
const cors = require(`cors`);
const app = express();
const MEDIA_DIR = "./uploads";

module.exports = {MEDIA_DIR};

app.use(cors());
app.use(require(`body-parser`).json())


const createHttpError = require("http-errors");
const path = require("path");


const port = process.env.PORT || 5000;
// Port
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})

// Routers
const {router: authRoutes} = require("./routes/auth");
app.use(`/auth`, authRoutes);
app.use(``, require('./routes/product'));
app.use(`/user`, require('./routes/user'));
app.use(`/getProfile`, require('./routes/user'));
app.use('/editAddress', require('./routes/user'));
app.use('/shopping-cart', require('./routes/shoppingCart'));
app.use('/order', require('./routes/order'));
app.use('/categories', require('./routes/category'));// app.use(`/getUserAddress`, require('./routes/user'));
// const orderRoutes = require('./routes/order');
// app.use('/order', orderRoutes);

// uploading files
const appPath = path.join(__dirname, "..", "client/build")

app.use(express.static(path.join(appPath)))
app.use('/uploads', express.static('uploads'));

// error-handling

app.use((req, res, next) => {
    next(createHttpError(404))
});

const errorHandler = (err, req, res, next) => {
    if (!err.statusCode) {
        err.statusCode = 500
    }

    // check that all required parameters are not empty in any route
    if (err instanceof ReferenceError) {
        err.statusCode = 400
        err.message = "Cannot reference a variable that has not been declared. This can be caused in run-time if the user did not input a parameter that is required by a router"
    }

    // Server-side error details
    console.log("Error Details...", err.message)

    res.status(err.statusCode).send(err.message)
}
app.use(errorHandler);