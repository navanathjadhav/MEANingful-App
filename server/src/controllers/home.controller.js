const getHome = (req, res) => {
  // Pass dynamic data to the Handlebars template
  const data = {
    title: "MEANingful",
    message: "What's added",
    ul: {
      li1: "Testing",
      li2: {
        ul: {
          li1: "Unit Testing",
          ul: {
            li1: "Jest",
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
