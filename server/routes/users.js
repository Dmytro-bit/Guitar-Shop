const router = require("express").Router();

const usersModel = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");
// const JWT_PRIVATE_KEY = fs.readFileSync(process.env.JWT_PRIVATE_KEY, "utf8");

router.post(`/register`, async (req, res) => {
    try{
        const { name, email, password, phone } = req.body;
        let user =  await usersModel.findOne({email: email}, undefined, undefined);
        if(user){ return res.json({errorMessage: `User already exists`})}
        const hashedPassword = await bcrypt.hash(password, parseInt(process.env.SALT_ROUNDS));
        user = new usersModel({name, email, password:hashedPassword, phone});
        await user.save();

        res.status(200).json({message:"Register successfully"});
    }catch(err){
        console.log(err);
        res.status(500).json({error:err})
    }
})

module.exports = router;