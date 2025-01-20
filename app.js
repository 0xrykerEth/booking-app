const http = require('http');
const express  = require('express');
const bodyParse = require('body-parser');
const formRoute = require('./routes/form.js');
const form = require('./models/data.js')
const save = require('./models/data.js')


const app = express();
app.use(bodyParse.urlencoded({extended: false}));
app.use(express.json());
const sequelize = require('./utils/database.js');

app.use(formRoute);
app.use(save);

app.use((req,res) => {
    res.status(404).send(`<h1>Page Not Found</h1>`)
})

const server = http.createServer(app);

sequelize.sync()
.then(result => {
    console.log(form);
    server.listen(3000);
})
.catch(err => {console.log(err)})

