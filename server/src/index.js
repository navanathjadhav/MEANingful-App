const routes = require("./routes");
const EventEmitter = require("events");
const eventEmitter = new EventEmitter();
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

// Body parser
app.use(bodyParser.json());

// Log the requests
app.use((req, res) => {
  eventEmitter.emit("request", req);
  req.next();
});

// Use route here
app.use("/", routes);

// Start the server
// Get the port from the environment process object or use a default value
const port = process.env.PORT || 3000;

// Catch the event
eventEmitter.on("request", (data) => {
  console.log(`Received request for path: ${data.path}`);
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
