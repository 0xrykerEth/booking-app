const express = require('express');
const router = express.Router();
const Product = require('../models/data.js');

// Fetch and display products
router.get('/save', async (req, res) => {
    try {
        const tasks = await Product.findAll();
        const html = tasks.map((task) => `
            <div id="task-${task.id}">
                <h3>Username: ${task.username}</h3>
                <p>Email: ${task.email}</p>
                <p>Phone: ${task.phone}</p>
                <button type="button" onclick="deleteTask(${task.id})">Delete</button>
                <button type="button" onclick="showEditForm(${task.id}, '${task.username}', '${task.email}', '${task.phone}')">Edit</button>
            </div>
        `).join('');
        res.send(`
            <html>
                <body>
                    <h1>Product Data</h1>
                    ${html}
                    <div id="edit-form" style="display:none;">
                        <h3>Edit Product</h3>
                        <input type="text" id="edit-username" placeholder="Username" />
                        <input type="text" id="edit-email" placeholder="Email" />
                        <input type="text" id="edit-phone" placeholder="Phone" />
                        <button type="button" onclick="submitEdit()">Save</button>
                        <button type="button" onclick="cancelEdit()">Cancel</button>
                    </div>
                    <script>
                        let editingId = null;

                        function showEditForm(id, username, email, phone) {
                            editingId = id;
                            document.getElementById('edit-username').value = username;
                            document.getElementById('edit-email').value = email;
                            document.getElementById('edit-phone').value = phone;
                            document.getElementById('edit-form').style.display = 'block';
                        }

                        function cancelEdit() {
                            editingId = null;
                            document.getElementById('edit-form').style.display = 'none';
                        }

                        async function submitEdit() {
                            const username = document.getElementById('edit-username').value;
                            const email = document.getElementById('edit-email').value;
                            const phone = document.getElementById('edit-phone').value;

                            try {
                                const response = await fetch('/save/' + editingId, {
                                    method: 'PUT',
                                    headers: {
                                        'Content-Type': 'application/json',
                                    },
                                    body: JSON.stringify({ username, email, phone }),
                                });

                                if (response.ok) {
                                    alert('Product updated successfully');
                                    location.reload(); // Reload the page to see updated data
                                } else {
                                    console.error('Error updating task:', await response.text());
                                }
                            } catch (error) {
                                console.error('Error:', error.message);
                            }
                        }
                    </script>
                </body>
            </html>
        `);
    } catch (error) {
        console.error('Error fetching data:', error.message);
        res.status(500).send('Error fetching data');
    }
});

// Delete a product
router.delete('/save/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const result = await Product.destroy({ where: { id } });
        if (result) {
            res.status(200).send('Product deleted successfully');
        } else {
            res.status(404).send('Product not found');
        }
    } catch (error) {
        console.error('Error deleting product:', error.message);
        res.status(500).send('Error deleting product');
    }
});

// Update a product
router.put('/save/:id', async (req, res) => {
    try {
        const { username, email, phone } = req.body;
        const id = req.params.id;

        const result = await Product.update(
            { username, email, phone },
            { where: { id } }
        );

        if (result[0]) {
            res.status(200).send('Product updated successfully');
        } else {
            res.status(404).send('Product not found');
        }
    } catch (error) {
        console.error('Error updating product:', error.message);
        res.status(500).send('Error updating product');
    }
});

module.exports = router;
