const router = require('express').Router();
const pool = require('../modules/pool');

// Gets all locations currently stored in the database
// Only gets your own locations if you are logged in
router.get('/', (req, res) => {
  console.log('GET /api/location');
  let query = `
    SELECT "l"."id", "l"."name", "l"."description", "l"."history", "l"."climate", "l"."date_created"
    FROM "locations" AS "l"
    JOIN "worlds" AS "w"
    ON "l"."world_id" = "w"."id"
  `;
  let params = [];
  if (req.isAuthenticated()) {
    query = query + ` WHERE "w"."user_id" = $1;`
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

// Gets all locations that match given search criteria in a general search
router.get('/search/general', (req, res) => {
  console.log('GET /api/location/search/general');
  let query = `
    SELECT "l"."id", "l"."name", "l"."description", "l"."history", "l"."climate", "l"."date_created"
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
  if (req.isAuthenticated()) {
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

// Gets all locations that are in a given world
router.get('/inWorld/:id', (req, res) => {
  console.log('GET /api/location/inWorld/id');
  let query = `
    SELECT "id", "name", "description", "history", "climate"
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

// Gets all locations that are in a given story
router.get('/inStory/:id', (req, res) => {
  console.log('GET /api/location/inStory/id');
  let query = `
    SELECT "l"."id", "l"."name", "l"."description", "l"."history", "l"."climate"
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

// Gets all neighboring locations to a given location
router.get('/neighbors/:id', (req, res) => {
  console.log('GET api/location/neighbors/id')
  let query = `
    SELECT "l"."name", "l"."id", 
    CASE WHEN "nl"."first_location" = $1
         THEN "nl"."is_contained_in"
         ELSE false
         END AS "contained",
    CASE WHEN "nl"."second_location" = $1
         THEN "nl"."is_contained_in"
         ELSE false
         END AS "parent"
    FROM "locations" AS "l"
    JOIN "neighboring_locations" AS "nl"
    ON "nl"."first_location" = "l"."id"
    OR "nl"."second_location" = "l"."id"
    WHERE ("nl"."first_location" = $1
    OR "nl"."second_location" = $1)
    AND "l"."id" != $1;
  `;
  let params = [req.params.id];
  pool.query(query, params)
    .then((results) => {
      res.send(results.rows);
    })
    .catch((error) => {
      res.sendStatus(500);
      console.log(error);
    })
})

// Gets all locations relating to a given character
router.get('/character/:id', (req, res) => {
  console.log('GET /api/location/character/id');
  let query = `
    SELECT "l"."id", "l"."name", "l"."description", "l"."history", "l"."climate", "l"."date_created"
    FROM "locations" AS "l"
    JOIN "characters_locations_junction" AS "cl"
    ON "cl"."location_id" = "l"."id"
    WHERE "cl"."character_id" = $1;
  `;
  let params = [req.params.id];
  pool.query(query, params)
    .then((results) => {
      res.send(results.rows);
    })
    .catch((error) => {
      res.sendStatus(500);
      console.log(error);
    })
})

// Posts a new location to the database
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

// Gets detailed information about given location
// Conceals private notes if not the logged in user
router.get('/:id', (req, res) => {
  console.log('GET /api/location/id');
  let query = `
    SELECT "l"."id", "l"."name", "l"."description", "l"."history", "l"."climate", "l"."img_url", "l"."world_id", "w"."name" as "world", "l"."date_created",
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

// Deletes the given location from the database
// Only owning user can delete
router.delete('/:id', (req, res) => {
  console.log('DELETE /api/location/id');
  if (req.isAuthenticated()) {
    const query = `
      DELETE FROM "locations"
      WHERE "id" = $1
      AND EXISTS (SELECT 1
                  FROM "locations" AS "l"
                  JOIN "worlds" AS "w"
                  ON "w"."id" = "l"."world_id"
                  WHERE "l"."id" = $1 AND "w"."user_id" = $2)
    `;
    const params = [req.params.id, req.user.id];
    pool.query(query, params)
      .then(() => {
        res.sendStatus(202);
      })
      .catch((error) => {
        res.sendStatus(500);
        console.log(error);
      })
  } else {
    res.sendStatus(403);
  }
})

// Updates the locations data
// Only owning user can put 
router.put('/:id', (req, res) => {
  console.log('PUT /api/location/id');
  if (req.isAuthenticated()) {
    const update = req.body;
    const query = `
      UPDATE "locations"
      SET "name" = $1, 
          "description" = $2, 
          "history" = $3, 
          "climate" = $4, 
          "img_url" = $5, 
          "private_notes" = $6, 
          "world_id" = $7
      WHERE "id" = $8
      AND EXISTS (SELECT 1
                  FROM "locations" AS "l"
                  JOIN "worlds" AS "w"
                  ON "w"."id" = "l"."world_id"
                  WHERE "l"."id" = $8 AND "w"."user_id" = $9);
    `;
    const params = [update.name, update.description, update.history, update.climate, update.img_url, update.private_notes, update.world_id, req.params.id, req.user.id];
    pool.query(query, params)
      .then(() => {
        res.sendStatus(202);
      })
      .catch((error) => {
        res.sendStatus(500);
        console.log(error);
      })
  } else {
    res.sendStatus(403);
  }
})

module.exports = router;