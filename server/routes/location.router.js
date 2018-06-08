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

router.get('/search/general', (req, res) => {
  console.log('GET /api/location/search/general');
  let query = `
    SELECT "l".*
    FROM "locations" AS "l"
    JOIN "worlds" AS "w" 
    ON "l"."world_id" = "w"."id"
    JOIN "users" AS "u"
    ON "u"."id" = "w"."user_id"
    WHERE (UPPER("l"."name") LIKE UPPER($1)
          OR UPPER("l"."description") LIKE UPPER($1)
          OR UPPER("l"."history") LIKE UPPER($1))
  `;
  let params = [`%${req.query.searchQuery}%`];
  if (req.isAuthenticated() ) {
    query = query + ` AND "u"."id" = $2`;
    params.push(req.user.id);
  };
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