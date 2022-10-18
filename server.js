const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dbjs = require('./database');
const PORT = 7399;
const app = express();
const root = (__dirname+'/public');
const sodaRoute = require('./routes/soda.route');
const dinerRoute = require('./routes/diner.route');
mongoose.Promise = global.Promise
mongoose.connect(dbjs.DB,
    {
    useNewUrlParser: true,
    useUnifiedTopology: true
    }
    ).then (
    () => {
    console.log('Database is connected');
    },
    err => {
    console.log("No connection to the database " + err);
    }
);

app.use(express.static(root));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use('/sodaRoute', sodaRoute);
app.use('/dinerRoute', dinerRoute);

app.get('/', (req, res) => {
    res.sendFile(root + '/index.html' )
});

app.listen(PORT, ()=>{
    console.log(`Listening on port ${PORT}`);
});