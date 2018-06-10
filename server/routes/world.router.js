const router = require('express').Router();
const pool = require('../modules/pool');

// Gets all worlds in the database
// If logged in, only gets your own worlds
router.get('/', (req, res) => {
  console.log('GET /api/world/');
  let query = `
    SELECT "id", "name", "description", "date_created"
    FROM "worlds"
   `;
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

// Gets all worlds matching the given search criteria
router.get('/search/general', (req, res) => {
  console.log('GET /api/world/search/general');
  let query = `
    SELECT "id", "name", "description"
    FROM "worlds"
    WHERE (UPPER("name") LIKE UPPER($1)
          OR UPPER("description") LIKE UPPER($1))
  `;
  let params = [`%${req.query.searchQuery}%`];
  if (req.isAuthenticated()) {
    query = query + ` AND "user_id" = $2`;
    params.push(req.user.id);
  };
  
  pool.query(query, params)
    .then((results) => {
      res.send(results.rows);
    })
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    })
})

// adds a new world to the database
router.post('/', (req, res) => {
  console.log('POST /api/world/');
  if (req.isAuthenticated()) {
    const world = req.body;
    let query = `
    INSERT INTO "worlds" ("name", "description", "img_url", "private_notes", "user_id")
    VALUES ($1, $2, $3, $4, $5);
  `;
    let params = [world.name, world.description, world.img_url, world.private_notes, req.user.id];
    pool.query(query, params)
      .then(() => {
        res.sendStatus(201);
      })
      .catch((error) => {
        res.sendStatus(500);
        console.log(error);
      })
  } else {
    res.sendStatus(403);
  }
})

// Gets details for a given world
// Only shares private notes if belongs to logged in user
router.get('/:id', (req, res) => {
  console.log('GET /api/world/id');
  const query = `
    SELECT "w"."id", "w"."name", "w"."description", "w"."img_url", "w"."date_created",
    CASE WHEN "u"."id" = $1
         THEN "w"."private_notes"
         ELSE NULL
         END AS "private_notes",
    CASE WHEN "u"."id" = $1
         THEN true
         ELSE false
         END AS "is_owner"
    FROM "worlds" as "w"
    JOIN "users" as "u"
    ON "u"."id" = "w"."user_id"
    WHERE "w"."id" = $2;
  `;
  let userId = null;
  if (req.isAuthenticated()) {
    userId = req.user.id
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

// Edits the given world
// Only owning user can edit
router.put('/:id', (req, res) => {
  console.log('PUT /api/world/id');
  if (req.isAuthenticated()) {
    const update = req.body;
    const query = `
    UPDATE "worlds"
    SET "name" = $1,
        "description" = $2,
        "img_url" = $3,
        "private_notes" = $4
    WHERE "id" = $5
    AND "user_id" = $6;
  `;
    const params = [update.name, update.description, update.img_url, update.private_notes, req.params.id, req.user.id];
    pool.query(query, params)
      .then((results) => {
        console.log(results);
        res.sendStatus(202)
      })
      .catch((error) => {
        res.sendStatus(500);
        console.log(error);
      })
  } else {
    res.sendStatus(403);
  }
})

// Deletes the given world from the database
// Only owning user can delete
router.delete('/:id', (req, res) => {
  console.log('DELETE /api/world/:id');
  if (req.isAuthenticated()) {
    const query = `
    DELETE FROM "worlds"
    WHERE "id" = $1
    AND "user_id" = $2;
  `;
    const params = [req.params.id, req.user.id];
    pool.query(query, params)
      .then(() => {
        res.sendStatus(204);
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
