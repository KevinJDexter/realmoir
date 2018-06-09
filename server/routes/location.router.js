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

router.get('/inWorld/:id', (req, res) => {
  console.log('GET /api/location/inWorld/id');
  let query = `
    SELECT *
    FROM "locations"
    WHERE "world_id" = $1;
  `;
  const params = [req.params.id];
  pool.query(query, params)
    .then((results) => {
      res.send(results.rows);
    })
    .catch((error) => {
      res.sendStatus(500);
      console.log(error);
    })
})

router.get('/inStory/:id', (req, res) => {
  console.log('GET /api/location/inStory/id');
  let query = `
    SELECT "l".*
    FROM "locations" AS "l"
    JOIN "locations_stories_junction" AS "ls"
    ON "ls"."location_id" = "l"."id"
    WHERE "ls"."story_id" = $1
  `;
  const params = [req.params.id];
  pool.query(query, params)
    .then((results) => {
      res.send(results.rows);
    })
    .catch((error) => {
      res.sendStatus(500);
      console.log(error);
    })
});

router.post('/', (req, res) => {
  console.log('POST /api/location');
  if (req.isAuthenticated()) {
    const location = req.body;
    let query = `
      INSERT INTO "locations" ("name", "description", "history", "climate", "img_url", "private_notes", "world_id")
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING "id";
    `;
    let params = [location.name, location.description, location.history, location.climate, location.img_url, location.private_notes, location.world_id];
    pool.query(query, params)
      .then((results) => {
        console.log(results);
        res.send(results.rows);
      })
      .catch((error) => {
        res.sendStatus(500);
        console.log(error);
      })
  } else {
    res.sendStatus(403);
  }
})

router.get('/:id', (req, res) => {
  console.log('GET /api/location/id');
  let query = `
    SELECT "l"."name", "l"."description", "l"."history", "l"."climate", "l"."img_url", "l"."world_id", "w"."name" as "world",
    CASE WHEN "u"."id" = $1
         THEN "l"."private_notes"
         ELSE NULL
         END AS "private_notes",
    CASE WHEN "u"."id" = $1
         THEN true
         ELSE false
         END AS "is_owner"
    FROM "locations" AS "l"
    JOIN "worlds" AS "w"
    ON "l"."world_id" = "w"."id"
    JOIN "users" AS "u"
    ON "u"."id" = "w"."user_id"
    WHERE "l"."id" = $2
  `;
  let userId = null;
  if (req.isAuthenticated()) {
    userId = req.user.id;
  }
  const params = [userId, req.params.id];
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