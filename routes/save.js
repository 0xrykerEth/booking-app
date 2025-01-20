const express = require('express');
const router = express.Router();
const Product = require('../models/data.js');


router.get('/save', async(req, res) => {
    try {
        const tasks = await Product.findAll();

        const html = tasks.map((task) => `
            <div>
                <h3>Username: ${task.username}</h3>
                <p>Email: ${task.email}</p>
                <p>Phone: ${task.phone}</p>
                <button type='submit'>edit</button>
                <button type='submit'>delete</button>
            </div>
        `).join('');
        res.send(`
            <html>
                <body>
                    <h1>Product Data</h1>
                    ${html}
                </body>
            </html>
        `);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('Error fetching data');
    }
});

module.exports = router;
