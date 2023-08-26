const getHome = (req, res) => {
  // Pass dynamic data to the Handlebars template
  const data = {
    title: "MEANingful",
    message: "What's added",
    ul: {
      li1: "Design Patterns",
      li2: {
        ul: {
          li1: "Factory",
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
