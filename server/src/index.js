const http = require("http");
const { parse } = require("url");
const { StringDecoder } = require("string_decoder");
const routes = require("./routes");
const EventEmitter = require("events");
const eventEmitter = new EventEmitter();

const server = http.createServer((req, res) => {
  const parsedUrl = parse(req.url, true);
  const path = parsedUrl.pathname.replace(/^\/+|\/+$/g, "");
  const method = req.method.toLowerCase();
  const queryParams = parsedUrl.query;

  const body = [];
  req.on("data", (chunk) => {
    body.push(chunk);
  });

  req.on("end", () => {
    const buffer = Buffer.concat(body);
    const data = {
      path,
      method,
      queryParams,
      payload: buffer,
    };

    eventEmitter.emit("request", data);

    const requestHandler = routes[path] || routes.default;
    requestHandler(data, (statusCode, responsePayload) => {
      statusCode = typeof statusCode === "number" ? statusCode : 200;
      responsePayload =
        typeof responsePayload === "object" ? responsePayload : {};

      const response = JSON.stringify(responsePayload);

      res.setHeader("Content-Type", "application/json");
      res.writeHead(statusCode);
      res.end(response);
    });
  });
});

// Start the server
// Get the port from the environment process object or use a default value
const port = process.env.PORT || 3000;

eventEmitter.on("request", (data) => {
  console.log(`Received request for path: ${data.path}`);
});

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
