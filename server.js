var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");

mongoose.Promise = Promise;

var PORT = process.env.PORT || 3000;

// Initialize Express
var app = express();

// Configure middleware

// Use morgan logger for logging requests
app.use(logger("dev"));
// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));

// Connect to the Mongo DB
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/scraperDemo";
// mongoose.Promise = Promise;

mongoose.connect(MONGODB_URI);

var dbc = mongoose.connection;
dbc.on("error", function(error) {
  console.log("Mongoose Error:", error);
});
//if logged correctly tell user connnection sucessful
dbc.once("open", function() {
  console.log("Mongoose connection successful.");
});

require("./routes/html-routes")(app);
require("./routes/api-routes")(app);

// Handlebars Setup
var exphbs = require("express-handlebars");

app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

// Start the server
app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});
