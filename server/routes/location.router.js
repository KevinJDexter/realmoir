const router = require('express').Router();
const pool = require('../modules/pool');

router.get('/', (req, res) => {
  console.log('GET /api/location');
  let query = `
    SELECT "locations".* 
    FROM "locations"
    JOIN "worlds"
    ON "locations"."world_id" = "worlds"."id"
  `;
  let params = [];
  if ( req.isAuthenticated() ) {
    query = query + ` WHERE "worlds"."user_id" = $1;`
    params.push(req.user.id);
  }
  pool.query(query, params)
    .then((results) => {
      res.send(results.rows);
    })
    .catch((error) => {
      res.sendStatus(500);
      console.log(error);
    })
})

module.exports = router;