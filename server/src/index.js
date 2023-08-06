require("dotenv").config();
const routes = require("./routes/index");
const express = require("express");
const bodyParser = require("body-parser");
const handlebars = require("express-handlebars");
const app = express();
const morgan = require("morgan");
const logger = require("./config/logger");
const cors = require("cors");
const { createSocketConnection } = require("./config/socket");

// enable cors
app.use(cors());
app.options("*", cors());

// Body parser
app.use(bodyParser.json());

// Used Morgan for HTTP request logging
app.use(
  morgan("combined", {
    stream: { write: (message) => logger.info(message.trim()) },
  })
);

// Set up Handlebars as the view engine
app.engine(".hbs", handlebars.engine({ extname: ".hbs" }));
app.set("view engine", ".hbs");
app.set("views", "./views");

// Use route here
app.use("/api", routes);

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  res.status(404).send("Not Found");
  next();
});

// Start the server
// Get the port from the environment process object or use a default value
const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  logger.info(`Server listening on port ${port}`);
});

createSocketConnection(server);
