const router = require("express").Router();

const usersModel = require("../models/users");

router.post(`/`, async (req, res) => {
    try{
        const data = await usersModel.create(req.body);
        res.json(data)
    }catch(err){
        res.status(500).json({error:err})
    }
})

module.exports = router;