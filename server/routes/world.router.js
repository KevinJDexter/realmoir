const router = require('express').Router();
const pool = require('../modules/pool');

// Gets all worlds in the database
// If logged in, only gets your own worlds
router.get('/', (req, res) => {
  console.log('GET /api/world/');
  let query = `
    SELECT "w"."id", "w"."name", "w"."description", "w"."date_created"
    FROM "worlds" AS "w"
    JOIN "users" AS "u"
    ON "u"."id" = "w"."user_id"
   `;
  let params = [];
  if (req.isAuthenticated()) {
    query = query + ` WHERE "u"."id" = $1;`;
    params.push(req.user.id);
  } else {
    query = query + `
      WHERE "w"."is_private" = false
      AND "u"."content_private" = false;
    `;
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
    SELECT "w"."id", "w"."name", "w"."description"
    FROM "worlds" AS "w"
    JOIN "users" AS "u"
    ON "u"."id" = "w"."user_id"
    WHERE (UPPER("name") LIKE UPPER($1)
          OR UPPER("description") LIKE UPPER($1))
  `;
  let params = [`%${req.query.searchQuery}%`];
  if (req.isAuthenticated()) {
    query = query + ` AND "u"."id" = $2`;
    params.push(req.user.id);
  } else {
    query = query + `
      AND "w"."is_private" = false
      AND "u"."content_private" = false;
    `;
  }
  
  pool.query(query, params)
    .then((results) => {
      res.send(results.rows);
    })
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    })
})

// Gets details for a given world
// Only shares private notes if belongs to logged in user
router.get('/:id', (req, res) => {
  console.log('GET /api/world/id');
  let query = `
    SELECT "w"."id", 
           "w"."name", 
           "w"."description", 
           "w"."img_url", 
           "w"."date_created", 
           "w"."last_updated",
           "w"."is_private", 
           "u"."content_private" as "user_private",
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
    WHERE "w"."id" = $2
  `;
  let userId = null;
  if (req.isAuthenticated()) {
    userId = req.user.id
  } else {
    query = query + `
      AND "w"."is_private" = false
      AND "u"."content_private" = false;
    `;
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

// adds a new world to the database
router.post('/', (req, res) => {
  console.log('POST /api/world/');
  if (req.isAuthenticated()) {
    const world = req.body;
    let query = `
    INSERT INTO "worlds" (
      "name", 
      "description", 
      "img_url", 
      "private_notes", 
      "is_private",
      "user_id"
    )
    VALUES ($1, $2, $3, $4, $5, $6);
  `;
    let params = [
      world.name,
      world.description, 
      world.img_url, 
      world.private_notes, 
      world.is_private, 
      req.user.id
    ];
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
        "private_notes" = $4,
        "is_private" = $5,
        "last_updated" = NOW()
    WHERE "id" = $6
    AND "user_id" = $7;
  `;
    const params = [
      update.name, 
      update.description, 
      update.img_url, 
      update.private_notes, 
      update.is_private, 
      req.params.id, 
      req.user.id
    ];
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
