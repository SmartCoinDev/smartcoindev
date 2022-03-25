// Require packages and set the port
const express = require('express');
const port = 3000;
const bodyParser = require('body-parser');
const routes = require('./routes/routes')
const app = express();
const cors = require('cors')

// Use Node.js body parsing middleware
app.use(express.json());
app.use(cors())
app.use(express.urlencoded({ extended: true }));

routes(app);

// Start the server
const server = app.listen(port, (error) => {
    if (error) return console.log(`Error: ${error}`);

    console.log(`The API server was started at the IP address 109.195.67.182:80`);
});