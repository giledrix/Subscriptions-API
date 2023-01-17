const express = require('express');
var cors = require('cors'); // import CORS model
const membersRouter = require('./routes/members');
const moviesRouter = require('./routes/movies');
const subscriptionsRouter = require('./routes/subscriptions');
const mongoose = require('mongoose')
const CONNECTION_URL = 'mongodb+srv://test_user123:test_user123@cluster0.kfrdiz3.mongodb.net/SubscriptionsDB?retryWrites=true&w=majority';
const PORT = process.env.PORT || 8000;

var app = express();

app.use(cors()); // prevent blocks of CORS policy (block request from unknown domain)

// require('./configs/database'); // run database.js on startup
require('./configs/initializeDbCollections'); // initialize database from Web Service when server startup


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/members', membersRouter);
app.use('/api/movies', moviesRouter);
app.use('/api/subscriptions', subscriptionsRouter);

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log('Server is running and listening on port 8000..')))
    .catch((error) => console.log(error.message));

mongoose.set('useFindAndModify', false);

// app.listen(8000, () => console.log("Server is running and listening on port 8000...."));