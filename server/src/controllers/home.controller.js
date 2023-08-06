const getHome = (req, res) => {
  // Pass dynamic data to the Handlebars template
  const data = {
    title: "MEANingful",
    message: "What's added",
    ul: {
      li1: "Features",
      li2: {
        ul: {
          li1: "Forgot password",
          li2: "Reset password",
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
