const router = require('express').Router();
const pool = require('../modules/pool');

router.get('/', (req, res) => {
  console.log('GET /api/world/');
  let query = `SELECT * FROM "worlds"`;
  let params = [];
  if (req.isAuthenticated()) {
    query = query + ` WHERE "user_id" = $1;`;
    params.push(req.user.id);
  }

  pool.query(query, params)
    .then((results) => {
      res.send(results.rows)
    })
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    })
})

module.exports = router;
