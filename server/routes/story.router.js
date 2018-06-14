const router = require('express').Router();
const pool = require('../modules/pool');

// Gets all stories on the database
router.get('/', (req, res) => {
  console.log('GET /api/story');
  let query = `
    SELECT "s"."id", "s"."title", "s"."synopsis", "s"."genre_id", "s"."world_id", "s"."date_created"
    FROM "stories" AS "s"
    JOIN "worlds" AS "w"
    ON "s"."world_id" = "w"."id"
    JOIN "users" AS "u"
    ON "u"."id" = "w"."user_id"
  `;
  let params = [];
  if (req.isAuthenticated()) {
    query = query + ` WHERE "w"."user_id" = $1`;
    params.push(req.user.id);
  } else {
    query = query + `
      WHERE "s"."is_private" = false
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

// Get all stories that match the given search parameters 
router.get('/search/general', (req, res) => {
  console.log('GET /api/story/search/general');
  let query = `
    SELECT "s"."id", "s"."title", "s"."synopsis", "s"."genre_id", "s"."world_id", "g"."name" as "genre", "s"."date_created"
    FROM "stories" AS "s"
    LEFT JOIN "genres" AS "g"
    ON "s"."genre_id" = "g"."id"
    JOIN "worlds" AS "w"
    ON "s"."world_id" = "w"."id"
    JOIN "users" AS "u"
    ON "u"."id" = "w"."user_id"
    WHERE (UPPER("s"."title") LIKE UPPER($1) 
          OR UPPER("s"."synopsis") LIKE UPPER($1) )
  `;
  let params = [`%${req.query.searchQuery}%`];
  if (req.isAuthenticated()) {
    query = query + ` AND "u"."id" = $2;`;
    params.push(req.user.id);
  } else {
    query = query + `
      AND "s"."is_private" = false
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

// Get all stories contained in a given world
router.get('/inWorld/:id', (req, res) => {
  console.log('GET /api/story/inWorld/id');
  let query = `
      SELECT "s"."id", "s"."title", "s"."synopsis", "s"."genre_id", "s"."world_id"
      FROM "stories" AS "s"
      JOIN "worlds" AS "w"
      ON "w"."id" = "s"."world_id"
      JOIN "users" AS "u"
      ON "u"."id" = "w"."user_id"
      WHERE "w"."id" = $1
    `;
  const params = [req.params.id];
  if (!req.isAuthenticated()) {
    query = query + `
      AND "s"."is_private" = false
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

// Get details about a given story
// Private notes are only given to the owning user
router.get('/:id', (req, res) => {
  console.log('GET /api/story/id');
  let query = `
    SELECT "s"."id", "s"."title", "s"."synopsis", "s"."img_url", "s"."genre_id", "w"."name" as "world", "s"."world_id", "g"."name" as "genre", "s"."date_created", "s"."is_private",
    CASE WHEN "u"."id" = $1
         THEN "s"."private_notes"
         ELSE NULL
         END AS "private_notes",
    CASE WHEN "u"."id" = $1
         THEN true
         ELSE false
         END AS "is_owner"
    FROM "stories" as "s"
    LEFT JOIN "genres" as "g"
    ON "s"."genre_id" = "g"."id"
    JOIN "worlds" as "w"
    ON "s"."world_id" = "w"."id"
    JOIN "users" as "u"
    ON "w"."user_id" = "u"."id"
    WHERE "s"."id" = $2
  `;
  let userId = null;
  if (req.isAuthenticated()) {
    userId = req.user.id
  } else {
    query = query + `
      AND "s"."is_private" = false
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

// Get all stories with the given location inside
router.get('/withLocation/:id', (req, res) => {
  console.log('GET /api/story/withLocation/:id');
  let query = `
    SELECT "s"."id", "s"."title", "s"."synopsis", "s"."genre_id", "s"."world_id", "s"."date_created"
    FROM "stories" AS "s"
    JOIN "locations_stories_junction" AS "ls"
    ON "s"."id" = "ls"."story_id"
    JOIN "worlds" AS "w"
    ON "w"."id" = "s"."world_id"
    JOIN "users" AS "u"
    ON "u"."id" = "w"."user_id"
    WHERE "ls"."location_id" = $1
  `;
  let params = [req.params.id];
  if (!req.isAuthenticated()) {
    query = query + `
      AND "s"."is_private" = false
      AND "w"."is_private" = false
      AND "u"."content_private" = false;
    `;
  }
  pool.query(query, params)
    .then((results) => {
      res.send(results.rows);
    })
    .catch((error) => {
      res.send(500);
      console.log(error);
    })
})

// Get all stories with the given character
router.get('/withCharacter/:id', (req, res) => {
  console.log('GET /api/story/withCharacter/:id');
  let query = `
    SELECT "s"."id", "s"."title", "s"."synopsis", "s"."genre_id", "s"."world_id", "s"."date_created"
    FROM "stories" AS "s"
    JOIN "characters_stories_junction" AS "cs"
    ON "s"."id" = "cs"."story_id"
    JOIN "worlds" AS "w"
    ON "w"."id" = "s"."world_id"
    JOIN "users" AS "u"
    ON "u"."id" = "w"."user_id"
    WHERE "cs"."character_id" = $1
  `;
  let params = [req.params.id];
  if (!req.isAuthenticated()) {
    query = query + `
      AND "s"."is_private" = false
      AND "w"."is_private" = false
      AND "u"."content_private" = false;
    `;
  }
  pool.query(query, params)
    .then((results) => {
      res.send(results.rows);
    })
    .catch((error) => {
      res.send(500);
      console.log(error);
    }) 
})

// Get all stories with the given event
router.get('/withEvent/:id', (req, res) => {
  console.log('/api/story/withEvent/id');
  let query = `
    SELECT "s"."id", "s"."title", "s"."synopsis", "s"."genre_id", "s"."world_id", "s"."date_created"
    FROM "stories" AS "s"
    JOIN "events_stories_junction" AS "es"
    ON "s"."id" = "es"."story_id"
    JOIN "worlds" AS "w"
    ON "w"."id" = "s"."world_id"
    JOIN "users" AS "u"
    ON "u"."id" = "w"."user_id"
    WHERE "es"."event_id" = $1
  `;
  let params = [req.params.id];
  if (!req.isAuthenticated()) {
    query = query + `
      AND "s"."is_private" = false
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

// Posts a new story to the database
router.post('/', (req, res) => {
  console.log('POST /api/story/');
  if (req.isAuthenticated()) {
    let story = req.body;
    const query = `
      INSERT INTO "stories" (
        "title", 
        "synopsis", 
        "genre_id", 
        "img_url", 
        "private_notes", 
        "world_id", 
        "is_private"
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING "id";
    `;
    const params = [
      story.title, 
      story.synopsis, 
      story.genre_id, 
      story.img_url, 
      story.private_notes, 
      story.world_id, 
      story.is_private
    ];
    pool.query(query, params)
      .then((results) => {
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

// Updates a given story in the database
// Only owning user can edit
router.put('/:id', (req, res) => {
  console.log('PUT /api/story/id');
  if (req.isAuthenticated()) {
    const update = req.body;
    const query = `
    UPDATE "stories"
    SET "title" = $1,
        "synopsis" = $2,
        "genre_id" = $3,
        "img_url" = $4,
        "private_notes" = $5,
        "world_id" = $6,
        "is_private" = $7
    WHERE "id" = $8
    AND EXISTS (SELECT 1 
                FROM "stories"
                JOIN "worlds" ON "worlds"."id" = "stories"."world_id"
                JOIN "users" ON "worlds"."user_id" = "users"."id"
                WHERE "stories"."id" = $8 AND "users"."id" = $9) ;
  `;
    const params = [update.title, update.synopsis, update.genre_id, update.img_url, update.private_notes, update.world_id, update.is_private, req.params.id, req.user.id];
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

// Deletes the given story from the database
// Only owning user can delete
router.delete('/:id', (req, res) => {
  console.log('DELETE /api/story/:id');
  if (req.isAuthenticated()) {
    const query = `
    DELETE FROM "stories"
    WHERE "id" = $1
    AND EXISTS (SELECT 1 
                FROM "stories"
                JOIN "worlds" ON "worlds"."id" = "stories"."world_id"
                JOIN "users" ON "worlds"."user_id" = "users"."id"
                WHERE "stories"."id" = $1 AND "users"."id" = $2) ;
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