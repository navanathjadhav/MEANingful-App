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
          li: ["Module System"],
        },
      },
    };

    callback(200, message);
  },
};

module.exports = routes;
