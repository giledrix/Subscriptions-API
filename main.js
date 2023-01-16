const express = require('express');
var cors = require('cors'); // import CORS model
const membersRouter = require('./routes/members');
const moviesRouter = require('./routes/movies');
const subscriptionsRouter = require('./routes/subscriptions');

var app = express();

app.use(cors()); // prevent blocks of CORS policy (block request from unknown domain)

require('./configs/database'); // run database.js on startup
require('./configs/initializeDbCollections'); // initialize database from Web Service when server startup


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/members', membersRouter);
app.use('/api/movies', moviesRouter);
app.use('/api/subscriptions', subscriptionsRouter);

app.listen(8000, () => console.log("Server is running and listening on port 8000...."));