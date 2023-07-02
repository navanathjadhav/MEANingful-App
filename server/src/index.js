const http = require("http");
const { parse } = require("url");
const { StringDecoder } = require("string_decoder");

const server = http.createServer((req, res) => {
  const parsedUrl = parse(req.url, true);
  const path = parsedUrl.pathname.replace(/^\/+|\/+$/g, "");
  const method = req.method.toLowerCase();
  const queryParams = parsedUrl.query;

  const decoder = new StringDecoder("utf-8");
  let buffer = "";

  req.on("data", (data) => {
    buffer += decoder.write(data);
  });

  req.on("end", () => {
    buffer += decoder.end();

    const requestHandler = routes[path] || routes.default;
    const data = {
      path,
      method,
      queryParams,
      payload: buffer,
    };

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

// Define your routes
const routes = {
  hello: (data, callback) => {
    const message = { message: "Hello, World!" };
    callback(200, message);
  },
  users: (data, callback) => {
    const users = [
      { id: 1, name: "Navanath Jadhav" },
      { id: 2, name: "Akshay Gudhate" },
    ];
    callback(200, users);
  },
  default: (data, callback) => {
    const message = {
      h2: "What's added",
      ul: {
        li: "Node Basics",
        ul: {
          li: ["Process Object"],
        },
      },
    };

    callback(200, message);
  },
};

// Start the server
// Get the port from the environment process object or use a default value
const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
