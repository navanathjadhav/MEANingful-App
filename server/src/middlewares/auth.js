const passport = require("passport");
const passportJWT = require("passport-jwt");
const User = require("../models/user.model");
const JwtStrategy = passportJWT.Strategy;
const ExtractJwt = passportJWT.ExtractJwt;

// Configure the JWT strategy for passport
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

passport.use(
  new JwtStrategy(jwtOptions, async (jwtPayload, done) => {
    const user = await User.findById(jwtPayload.sub);
    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  })
);

// Middleware function to authenticate incoming requests using JWT token
const auth = (req, res, next) => {
  // Use passport.authenticate with "jwt" strategy to validate the token
  passport.authenticate("jwt", { session: false }, (err, user, info) => {
    if (err) {
      return next(err);
    }

    if (!user) {
      // If the token is invalid or user not found, return an unauthorized response
      return res.status(401).json({ error: "Unauthorized" });
    }

    // If the token is valid and user is found, store the user object in the request for later use
    req.user = user;
    return next();
  })(req, res, next);
};

module.exports = auth;
