const router = require('express').Router();
const pool = require('../modules/pool');

// Gets all public lore in the database
// If logged in, gets all your lore
router.get('/', (req, res) => {
  console.log('GET /api/lore');
  let query = `
    SELECT "l"."name", "l"."id", "l"."date_created"
    FROM "lore" AS "l"
    JOIN "worlds" AS "w"
    ON "w"."id" = "l"."world_id"
    JOIN "users" AS "u"
    ON "u"."id" = "w"."user_id"
  `;
  let params = [];
  if (req.isAuthenticated()) {
    query = query + ` WHERE "u"."id" = $1;`
    params.push(req.user.id);
  } else {
    query = query + `
      WHERE "l"."is_private" = false
      AND "w"."is_private" = false
      AND "u"."content_private" = false;
    `;
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

// Gets details about the given lore article
// If logged in, gives private information
router.get('/:id', (req, res) => {
  console.log('GET /api/lore/id');
  let query = `
    SELECT "l"."name", 
           "l"."id", 
           "l"."date_created", 
           "l"."synopsis", 
           "l"."description", 
           "l"."img_url", 
           "w"."world", 
           "l"."world_id", 
           "l"."last_updated",
    CASE WHEN "u"."id" = $1
         THEN "l"."private_notes"
         ELSE NULL
         END AS "private_notes",
    CASE WHEN "u"."id" = $1
         THEN true
         ELSE false
         END AS "is_owner"
    FROM "lore" AS "l"
    JOIN "worlds" AS "w"
    ON "w"."id" = "l"."world_id"
    JOIN "users" AS "u"
    ON "u"."id" = "w"."user_id"
    WHERE "l"."id" = $2
  `;
  let userId = null
  if (req.isAuthenticated()) {
    userId = req.user.id;
  } else {
    query = query + `
    AND "l"."is_private" = false
    AND "w"."is_private" = false
    AND "u"."content_private" = false;
  `;
  }
  let params = [userId, req.params.id];
  pool.query(query, params)
    .then((results) => {
      res.send(results.rows);
    })
    .catch((error) => {
      res.sendStatus(500);
      console.log(error);
    })
})

// Gets all public lore matching given search criteria
router.get('/search/general', (req, res) => {
  console.log('GET /api/lore/search/general');
  let query = `
    SELECT "l"."name", "l"."id", "l"."date_created", "l"."synopsis", "l"."description"
    FROM "lore" AS "l"
    JOIN "worlds" AS "w"
    ON "w"."id" = "l"."world_id"
    JOIN "users" AS "u"
    ON "u"."id" = "w"."user_id"
    WHERE (UPPER("l"."name") = UPPER($1)
           OR UPPER("l"."synopsis") = UPPER($1)
           OR UPPER("l"."description") = UPPER($1))
  `;
  let params = [`%${req.body.searchQuery}%`];
  if (req.isAuthenticated()) {
    query = query + ` AND "u"."id" = $2;`
    params.push(req.user.id);
  } else {
    query = query + `
      AND "l"."is_private" = false
      AND "w"."is_private" = false
      AND "u"."content_private" = false;
    `;
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

// Gets all public lore associated with the given world
router.get('/inWorld/:id', (req, res) => {
  console.log('GET /api/lore/inWorld/id');
  let query = `
    SELECT "l"."name", "l"."id", "l"."date_created"
    FROM "lore" AS "l"
    JOIN "worlds" AS "w"
    ON "w"."id" = "l"."world_id"
    JOIN "users" AS "u"
    ON "u"."id" = "w"."user_id"
    WHERE "w"."id" = $1
  `;
  let params = [req.params.id];
  if (!req.isAuthenticated()) {
    query = query + `
      AND "l"."is_private" = false
      AND "w"."is_private" = false
      AND "u"."content_private" = false;
    `;
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

// Adds a new lore article
router.post('/', (req, res) => {
  console.log('POST /api/lore/');
  if (req.isAuthenticated()) {
    let story = req.body;
    const query = `
        INSERT INTO "lore" (
          "title", 
          "synopsis", 
          "description", 
          "img_url", 
          "private_notes", 
          "world_id", 
          "is_private"
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7);
      `;
    const params = [
      story.title,
      story.synopsis,
      story.description,
      story.img_url,
      story.private_notes,
      story.world_id,
      story.is_private
    ];
    pool.query(query, params)
      .then((results) => {
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

// Updates given lore in database
router.put('/:id', (req, res) => {
  console.log('PUT /api/lore/id');
  if (req.isAuthenticated()) {
    const update = req.body;
    const query = `
    UPDATE "lore"
    SET "name" = $1,
        "synopsis" = $2,
        "description" = $3,
        "img_url" = $4,
        "private_notes" = $5,
        "world_id" = $6,
        "is_private" = $7,
        "last_updated" = NOW()
    WHERE "id" = $8
    AND EXISTS (SELECT 1 
                FROM "lore"
                JOIN "worlds" ON "worlds"."id" = "lore"."world_id"
                JOIN "users" ON "worlds"."user_id" = "users"."id"
                WHERE "lore"."id" = $8 AND "users"."id" = $9) ;
  `;
    const params = [update.title, update.synopsis, update.description, update.img_url, update.private_notes, update.world_id, update.is_private, req.params.id, req.user.id];
    pool.query(query, params)
      .then((results) => {
        console.log(results);
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

// Delete given lore from database
// Only owning user can delete
// Deletes the given story from the database
// Only owning user can delete
router.delete('/:id', (req, res) => {
  console.log('DELETE /api/lore/:id');
  if (req.isAuthenticated()) {
    const query = `
    DELETE FROM "lore"
    WHERE "id" = $1
    AND EXISTS (SELECT 1 
                FROM "lore"
                JOIN "worlds" ON "worlds"."id" = "lore"."world_id"
                JOIN "users" ON "worlds"."user_id" = "users"."id"
                WHERE "lore"."id" = $1 AND "users"."id" = $2) ;
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


