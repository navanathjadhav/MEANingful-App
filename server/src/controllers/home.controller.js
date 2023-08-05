const getHome = (req, res) => {
  // Pass dynamic data to the Handlebars template
  const data = {
    title: "MEANingful",
    message: "What's added",
    ul: {
      li1: "Good to Know Libraries",
      li2: {
        ul: {
          li1: "passport",
          li2: "passport-jwt",
          li3: "pm2",
          li4: "bcryptjs",
          li5: "jsonwebtoken",
          li6: "validator",
          li7: "moment",
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
