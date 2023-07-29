require("dotenv").config();
const routes = require("./routes");
const express = require("express");
const bodyParser = require("body-parser");
const handlebars = require("express-handlebars");
const app = express();
const morgan = require("morgan");
const logger = require("./logger");

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
app.use("/", routes);

// Start the server
// Get the port from the environment process object or use a default value
const port = process.env.PORT || 3000;

app.listen(port, () => {
  logger.info(`Server listening on port ${port}`);
});
