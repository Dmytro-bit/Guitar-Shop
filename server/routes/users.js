const router = require("express").Router();

const usersModel = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const JWT_PRIVATE_KEY = fs.readFileSync(process.env.JWT_PRIVATE_KEY, "utf8");

router.post(`/register`, async (req, res) => {
    try{
        const { name, email, password, phone } = req.body;

        let user =  await usersModel.findOne({email: email}, undefined, undefined);
        if(user){ return res.json({errorMessage: `User already exists`})}
        const hashedPassword = await bcrypt.hash(password, parseInt(process.env.SALT_ROUNDS));
        user = new usersModel({name, email, password:hashedPassword, phone});
        await user.save();
        const {accessLevel} = user;
        const token = jwt.sign({email:email, accessLevel:accessLevel}, JWT_PRIVATE_KEY, {algorithm:'HS256',expiresIn: process.env.JWT_EXPIRY})

        res.json({name, token, accessLevel})

    }catch(err){
        console.log(err);
        res.status(500).json({error:err})
    }
})

router.post("/login", async (req, res) => {
    try{
        const { email, password } = req.body;
        let user = await usersModel.findOne({email: email}, undefined, undefined);
        if(user){
            const result = await bcrypt.compare(password, user.password);

            if(result){
                const token = jwt.sign({email:email, accessLevel:user.accessLevel}, JWT_PRIVATE_KEY, {algorithm:'HS256',expiresIn: process.env.JWT_EXPIRY});

                res.json({name: user.name, accessLevel:user.accessLevel, token:token})
            } else {
                console.log("Invalid Credentials")

                res.status(401).json({error:"Invalid Credentials"});
            }
        } else {
            console.log("not found in db")

            res.status(401).json({error:"Not found in db"});
        }

    } catch(err){
        console.log(err);
        res.status(500).json({error:err})
    }
})

module.exports = router;