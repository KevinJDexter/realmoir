const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

// Handles Ajax request for user information if user is authenticated
router.get('/', rejectUnauthenticated, (req, res) => {
  // Send back user object from database
  console.log('GET /api/user');
  let query = `
    SELECT "first_name", "last_name", "username", "email", "content_private"
    FROM "users"
    WHERE "id" = $1
  `;
  let params = [req.user.id];
  pool.query(query, params)
    .then(results => {
      res.send(results.rows[0])
    }) 
    .catch(error => {
      res.sendStatus(500);
      console.log(error);
    })
});

router.put('/', rejectUnauthenticated, (req, res) => {
  console.log('PUT /api/user');
  const update = req.body;
  let query = `
    UPDATE "users"
    SET "first_name" = $1,
        "last_name" = $2,
        "username" = $3,
        "email" = $4,
        "content_private" = $5
    WHERE "id" = $6
  `;
  let params = [update.firstName, update.lastName, update.userName, update.email, update.contentPrivate, req.user.id];
  pool.query(query, params)
    .then(() => {
      res.sendStatus(201);
    })
    .catch(error => {
      res.sendStatus(500);
      console.log(error);
    })
})

// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted
router.post('/register', (req, res, next) => {
  console.log('req: ', req.body);
  
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const username = req.body.username;
  const email = req.body.email;
  const password = encryptLib.encryptPassword(req.body.password);

  const queryText = 'INSERT INTO users (first_name, last_name, username, email, password) VALUES ($1, $2 ,$3, $4, $5) RETURNING id';
  pool.query(queryText, [firstName, lastName, username, email, password])
    .then(() => { res.sendStatus(201); })
    .catch((err) => { next(err); });
});

// Handles login form authenticate/login POST
// userStrategy.authenticate('local') is middleware that we run on this route
// this middleware will run our POST if successful
// this middleware will send a 404 if not successful
router.post('/login', userStrategy.authenticate('local'), (req, res) => {
  res.sendStatus(200);
});

// router.post('/login/google', userStrategy.authenticate('google'), (req, res) => {
//   res.sendStatus(200);
// })

// clear all server session information about this user
router.get('/logout', (req, res) => {
  // Use passport's built-in method to log out the user
  req.logout();
  res.sendStatus(200);
});

module.exports = router;
