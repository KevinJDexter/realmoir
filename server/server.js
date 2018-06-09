
const express = require('express');
require('dotenv').config();

const app = express();
const bodyParser = require('body-parser');
const sessionMiddleware = require('./modules/session-middleware');

const passport = require('./strategies/user.strategy');

// Route includes
const userRouter = require('./routes/user.router');
const storyRouter = require('./routes/story.router');
const worldRouter = require('./routes/world.router');
const genreRouter = require('./routes/genre.router');
const locationRouter = require('./routes/location.router');
const junctionRouter = require('./routes/junction.router');

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/api/user', userRouter);
app.use('/api/story', storyRouter);
app.use('/api/world', worldRouter);
app.use('/api/genre', genreRouter);
app.use('/api/location', locationRouter);
app.use('/api/junction', junctionRouter);

// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
