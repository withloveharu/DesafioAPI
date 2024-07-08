const express = require('express');
const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const session = require('express-session');

const app = express();

app.use(session({
  secret: 'Billy142536!!',
  resave: false,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new GitHubStrategy({
    clientID: 'Ov23liHau8hvCLqjYjLa',
    clientSecret: 'd793cff81e6fafcfee251b9e70654e36a26339d0',
    callbackURL: 'http://localhost:3000/auth/github/callback'
  },
  function(accessToken, refreshToken, profile, done) {
    return done(null, profile);
  }
));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});

app.get('/', (req, res) => {
  res.send('<a href="/auth/github">Logar com GitHub</a>');
});

app.get('/auth/github',
  passport.authenticate('github', { scope: ['user:email'] })
);

app.get('/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/perfil');
  }
);

app.get('/perfil', (req, res) => {
  if (!req.isAuthenticated()) {
    return res.redirect('/');
  }

  res.send(`<h1>Olá ${req.user.username}</h1>`);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor está rodando em http://localhost:${PORT}`);
});