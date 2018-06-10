const router = require('express').Router();
const pool = require('../modules/pool');

// Gets a list of all Genres
router.get('/', (req, res) => {
  console.log('GET /api/genre');
  const query = `SELECT * FROM "genres"`;

  pool.query(query)
    .then((results) => {
      res.send(results.rows);
    })
    .catch((error) => {
      res.sendStatus(500);
      console.log(error);
    })
})

module.exports = router;