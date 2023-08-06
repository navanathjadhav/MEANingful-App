const getHome = (req, res) => {
  // Pass dynamic data to the Handlebars template
  const data = {
    title: "MEANingful",
    message: "What's added",
    ul: {
      li1: "Real-Time Communication",
      li2: {
        ul: {
          li1: "socket.io",
          li2: "socket.io-client",
        },
      },
    },
  };

  // Render the template with the dynamic data
  res.render("index", data);
};

module.exports = {
  getHome,
};
