const express = require('express');
const app = express();
const bodyParser = require('body-parser');
//importing user auth module.
const authUser = require('./routes/api');
// importing DB module.
const db = require('./sql/database');

//Test connection
db
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

//Middlewares

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));


app.use('/api/user', authUser);

//Start server
const PORT = process.env.PORT || 3010;

app.listen(PORT, () => console.log(`server started at port ${PORT}`));