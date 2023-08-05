const getHome = (req, res) => {
  // Pass dynamic data to the Handlebars template
  const data = {
    title: "MEANingful",
    message: "What's added",
    ul: {
      li1: "Directory structure",
      li2: {
        ul: {
          li1: "config",
          li2: "models",
          li3: "controllers",
          li4: "routes",
          li5: "service",
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
