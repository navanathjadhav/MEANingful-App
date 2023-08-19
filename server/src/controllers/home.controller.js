const getHome = (req, res) => {
  // Pass dynamic data to the Handlebars template
  const data = {
    title: "MEANingful",
    message: "What's added",
    ul: {
      li1: "MicroServices",
      li2: {
        ul: {
          li1: "Message-Broker",
          ul: {
            li1: "RabbitMQ",
          },
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
