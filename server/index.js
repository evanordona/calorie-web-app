const express = require('express');
const authRoutes = require('./routes/auth-routes');
const apiRoutes = require('./routes/api-routes');
const passportSetup = require('./config/passport-setup')
const mongoose = require('mongoose')
const keys = require('./config/keys')
const expressSession = require('express-session')
const bodyParser = require('body-parser')
const passport = require('passport')
const app = express();
const helmet = require('helmet')
const cors = require('cors')
const port = process.env.PORT || 5000;


// connect to mongodb
// TODO: hide URI
mongoose.connect(keys.mongodb.dbURI)

// parses the text as url encoded data
app.use(bodyParser.urlencoded({ extended: true }));

// parses the text as json
app.use(bodyParser.json());

// set up cors
app.use(cors({ origin: "http://localhost:5173", credentials: true }))

app.use(helmet())
app.use(express.json())

// set up express session cookie
app.use(expressSession({
  maxAge: 1000 * 60 * 60 * 24,
  secret: keys.session.cookieKey,
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 24 * 60 * 60 * 1000, // sets the maxAge to 1 day (in milliseconds)
  },
}))

// initialize passport
app.use(passport.initialize())
app.use(passport.session())

// set up routes
app.use('/auth', authRoutes);
// set up routes
app.use('/api', apiRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/home', (req, res) => {
  res.send({ test: 'test' });
})



app.listen(port, () => {
  console.log(`app listening on port ${port}!`);
});