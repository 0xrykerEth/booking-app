const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const path = require('path');
const Product = require('../models/data.js')



router.get('/home',(req,res) =>{
    res.sendFile(path.join(__dirname,'../','views','form.html'));
})

router.post('/home', (req,res) => {
    const username = req.body.username;
    const phone = req.body.phone;
    const email = req.body.email;
    Product.create({
        username : username,
        phone : phone,
        email : email,
    })
    .then(result => {
        console.log(result)
    })
    .catch(err => {
        console.log(err);
    })
    const htmlContent = `
        <h1>Submitted Data</h1>
        <p><strong>Username:</strong> ${username}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Email:</strong> ${email}</p>
        <a href="/home">Go Back</a>
    `;

    res.redirect('/save'); 
})

module.exports = router;