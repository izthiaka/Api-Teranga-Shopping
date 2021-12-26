// Import express
let express = require('express');
// Import Body parser
let bodyParser = require('body-parser');
// Import Mongoose
let mongoose = require('mongoose');
// Initialise the app
let app = express();

// Load all routes
let apiRoutes = require("./Routes/record");
let authRoutes = require("./Routes/auth/auth.route");

// Configure bodyparser to handle post requests
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
// Connect to Mongoose and set connection variable
mongoose.connect('mongodb://localhost/teranga', { useNewUrlParser: true});
var db = mongoose.connection;

// Added check for DB connection
if(!db)
    console.log("Error connecting db")
else
    console.log("Db connected successfully")

// Setup server port
var port = process.env.PORT || 8080;

// Send message for default URL
app.get('/', (req, res) => res.send('Hello World with Express'));

// Use Auth Api routes in the App
app.use('/api', authRoutes);

// Use Api routes in the App
app.use('/api', apiRoutes);

// Error 404 Not Found
app.use((req, res, next) => {
    res.status(404).json({
        success: false,
        message: "Page Not Founded"
    })
});

// Launch app to listen to specified port
app.listen(port, function () {
    console.log("Running ApiTerangaShopping on port " + port);
});