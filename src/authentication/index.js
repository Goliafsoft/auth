const passport = require('passport');
const LocalStrategy = require('passport-local');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const User = require('@local/models/User');

function authenticationMiddleware(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.status(401).end();
}

function init(app) {
  const authStrategy = new LocalStrategy({
    session: true,
  }, async (username, password, done) => {
    const user = new User();
    try {
      await user.findOne(username);
      const isValid = await user.verifyPassword(password);
      if (!isValid) return done(null, false);
      return done(null, user.user);
    } catch (error) {
      return done(error);
    }
  });

  passport.use(authStrategy);
  app.use(session({
    store: new RedisStore({
      host: '127.0.0.1',
      port: 6379,
    }),
    secret: 'bla',
    resave: true,
    saveUninitialized: true,
    cookie: { httpOnly: true },
  }));

  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser((user, done) => {
    done(null, {});
  });

  passport.deserializeUser((id, done) => {
    done(null, {});
  });

  app.post('/login', passport.authenticate('local', { session: true }), (req, res) => {
    res.status(200).json({ username: req.user.username });
  });

  app.post('/logout', (req, res) => {
    req.logout();
    res.status(200).end();
  });
}

module.exports = {
  init,
  authenticationMiddleware,
};
