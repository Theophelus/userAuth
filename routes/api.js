//import router
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
//import DB model 
const db = require('../model/users');

//Define a post router to register users
router.post('/register', async (req, res) => {
    // Check if all the fields are filled
    if (!req.body.first_name || !req.body.last_name || !req.body.email || !req.body.password)
        return res.status(400).send('Please complete all fields');

    //Check if user already in the database
    const emailExists = await db.findOne({
        where: {
            email: req.body.email
        }
    });
    if (emailExists) return res.status(400).send('email already exists!');

    //Hash password before going to the DB
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);


    //Create new user
    const user = await db.create({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: hashedPassword
    });


    //Save user
    try {
        const saveUser = await user.save();
        return res.status(200).send(saveUser);

    } catch (error) {
        console.log(`Catched ${error}`);

        res.status(404).send(error);
    }
});

//Define a route for logins
router.post('/login', async (req, res) => {

    // Check if all the fields are filled
    if (!req.body.email || !req.body.password)
        return res.status(400).send('Please complete all fields');

    //Check if user already user doesn't exists
    const user = await db.findOne({
        where: {
            email: req.body.email
        }
    });
    
    if (!user) return res.status(400).send('email or password is wrong!');

    //Compare passowrd
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if(!validPass) return res.sendStatus(400).send('email or password is wrong!');

    res.send("You're logged in!");
    
})

module.exports = router;