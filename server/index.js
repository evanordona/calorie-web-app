const express = require('express');
const authRoutes = require('./routes/auth-routes');
const apiRoutes = require('./routes/api-routes');
const mongoose = require('mongoose')
const keys = require('./config/keys')
const expressSession = require('express-session')
const bodyParser = require('body-parser')
const passport = require('passport')
const app = express();
const cors = require('cors')
const port = process.env.PORT || 5000;


// Connect to mongodb
mongoose.connect(keys.mongodb.dbURI)

// Parses the text as url encoded data
app.use(bodyParser.urlencoded({ extended: true }));

// Parses the text as json
app.use(bodyParser.json());

// Set up cors
app.use(cors({ origin: "https://gainztracker.onrender.com", credentials: true }))

app.use(express.json())

app.enable('trust proxy')

// Set up express session cookie
app.use(expressSession({
  maxAge: 1000 * 60 * 60 * 24,
  secret: keys.session.cookieKey,
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: true,
    sameSite: 'none',
    maxAge: 24 * 60 * 60 * 1000, // Sets the maxAge to 1 day (in milliseconds)
  },
}))


// Initialize passport
app.use(passport.initialize())
app.use(passport.session())
 

// Set up routes
app.use('/auth', authRoutes);
app.use('/api', apiRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`app listening on port ${port}!`);
});
