const router = require('express').Router();
const pool = require('../modules/pool');

// Gets all events from database
// Only gets logged in users events if logged in
router.get('/', (req, res) => {
  console.log('GET /api/event')
  let query = `
    SELECT "e"."id", "e"."name", "e"."description", "e"."date_created"
    FROM "events" AS "e"
    JOIN "worlds" AS "w"
    ON "e"."world_id" = "w"."id"
    JOIN "users" AS "u"
    ON "u"."id" = "w"."user_id"
  `;
  let params = [];
  if (req.isAuthenticated()) {
    query = query + ` WHERE "u"."id" = $1;`;
    params.push(req.user.id);
  } else {
    query = query + `
      WHERE "e"."is_private" = false
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
});

// Gets events matching given search criteria
router.get('/search/general', (req, res) => {
  console.log('GET /api/event/search/general');
  let query = `
    SELECT "e"."id", "e"."name", "e"."description", "e"."date_created"
    FROM "events" AS "e"
    JOIN "worlds" AS "w"
    ON "e"."world_id" = "w"."id"
    JOIN "users" AS "u"
    ON "u"."id" = "w"."user_id"
    WHERE (UPPER("e"."name") LIKE UPPER($1)
           OR UPPER("e"."description") LIKE UPPER($1))
  `;
  let params = [`%${req.query.searchQuery}%`];
  if (req.isAuthenticated()) {
    query = query + ` AND "u"."id" = $2`;
    params.push(req.user.id);
  } else {
    query = query + `
      AND "e"."is_private" = false
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
    });
});

// Get details info on event
// Only sends private notes if user is logged in
router.get('/:id', (req, res) => {
  console.log('GET /api/event/id')
  let query = `
    SELECT "e"."id", 
           "e"."name", 
           "e"."description", 
           "e"."date_of_event", 
           "e"."world_id", 
           "w"."name" as "world", 
           "e"."date_created", 
           "e"."last_updated",
           "e"."img_url", 
           "e"."is_private", 
           "w"."is_private" as "world_private", 
           "u"."content_private" as "user_private",
    CASE WHEN "u"."id" = $1
         THEN "e"."private_notes"
         ELSE NULL
         END AS "private_notes",
    CASE WHEN "u"."id" = $1
         THEN true
         ELSE false
         END AS "is_owner",
    CASE WHEN ("l"."is_private" = false
               OR "u"."id" = $1)
         THEN "l"."name"
         ELSE NULL
         END AS "location",
    CASE WHEN ("l"."is_private" = false
               OR "u"."id" = $1)
         THEN "l"."id"
         ELSE NULL
         END AS "location_id"
    FROM "events" AS "e"
    LEFT JOIN "locations" AS "l"
    ON "l"."id" = "e"."location"
    JOIN "worlds" AS "w"
    ON "w"."id" = "e"."world_id"
    JOIN "users" AS "u"
    ON "u"."id" = "w"."user_id"
    WHERE "e"."id" = $2
  `;
  let userId = null;
  if (req.isAuthenticated ()) {
    userId = req.user.id;
  } else {
    query = query + `
      AND "e"."is_private" = false
      AND "w"."is_private" = false
      AND "u"."content_private" = false;
    `;
  }
  let params = [userId, req.params.id]
  pool.query(query, params)
    .then((results) => {
      res.send(results.rows);
    })
    .catch((error) => {
      res.sendStatus(500);
      console.log(error);
    })
});

// Gets all events in a given world
router.get('/inWorld/:id', (req, res) => {
  console.log('GET /api/event/inWorld/id');
  let query = `
    SELECT "e"."id", "e"."name", "e"."description", "e"."date_created"
    FROM "events" AS "e"
    JOIN "worlds" AS "w"
    ON "w"."id" = "e"."world_id"
    JOIN "users" AS "u"
    ON "u"."id" = "w"."user_id"
    WHERE "w"."id" = $1
  `;
  let params = [req.params.id];
  if (!req.isAuthenticated()) {
    query = query + `
      AND "e"."is_private" = false
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
    });
});

// Gets all events in a given story
router.get('/inStory/:id', (req, res) => {
  console.log('GET /api/event/inStory/id');
  let query = `
    SELECT "e"."id", "e"."name", "e"."description", "e"."date_created"
    FROM "events" AS "e"
    JOIN "events_stories_junction" AS "es"
    ON "e"."id" = "es"."event_id"
    JOIN "worlds" AS "w"
    ON "w"."id" = "e"."world_id"
    JOIN "users" AS "u"
    ON "u"."id" = "w"."user_id"
    WHERE "es"."story_id" = $1
  `;
  let params = [req.params.id];
  if (!req.isAuthenticated()) {
    query = query + `
      AND "e"."is_private" = false
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
    });
});

// Gets all events pertaining to the given location
router.get('/location/:id', (req, res) => {
  console.log('GET /api/event/location/:id');
  let query = `
    SELECT "e"."id", "e"."name", "e"."description", "e"."date_created"
    FROM "events" AS "e"
    JOIN "worlds" AS "w"
    ON "w"."id" = "e"."world_id"
    JOIN "users" AS "u"
    ON "u"."id" = "w"."user_id"
    WHERE "location" = $1
  `;
  let params = [req.params.id];
  if (!req.isAuthenticated()) {
    query = query + `
      AND "e"."is_private" = false
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
    });
});

//Gets all events a character has been involved with
router.get('/character/:id', (req, res) => {
  console.log('GET /api/event/character/id');
  let query = `
    SELECT "e"."id", "e"."name", "e"."description", "e"."date_created"
    FROM "events" AS "e"
    JOIN "characters_events_junction" AS "ce"
    ON "e"."id" = "ce"."event_id"
    JOIN "worlds" AS "w"
    ON "w"."id" = "e"."world_id"
    JOIN "users" AS "u"
    ON "u"."id" = "w"."user_id"
    WHERE "ce"."character_id" = $1
  `;
  let params = [req.params.id];
  if (!req.isAuthenticated()) {
    query = query + `
      AND "e"."is_private" = false
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
    });
});

// Posts a new event to the database
// Only possible if logged in
router.post('/', (req, res) => {
  console.log('POST /api/event');
  if (req.isAuthenticated()) {
    const event = req.body;
    let query = `
      INSERT INTO "events" (
        "name",
        "description",
        "location",
        "date_of_event",
        "img_url",
        "private_notes",
        "world_id",
        "is_private"
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING "id";
    `;
    let params = [
      event.name,
      event.description,
      event.location,
      event.date_of_event,
      event.img_url,
      event.private_notes,
      event.world_id,
      event.is_private
    ];
    pool.query(query, params)
    .then((results) => {
      res.send(results.rows);
    })
    .catch((error) => {
      res.sendStatus(500);
      console.log(error);
    }); 
  } else {
    res.sendStatus(403);
  }
});

// Edits an existing event
// Only possible if logged in user is owner
router.put('/:id', (req, res) => {
  console.log('PUT /api/event/id');
  if (req.isAuthenticated()) {
    const update = req.body;
    let query = `
      UPDATE "events"
      SET "name" = $1,
          "description" = $2,
          "location" = $3,
          "date_of_event" = $4,
          "img_url" = $5,
          "private_notes" = $6,
          "is_private" = $7,
          "last_updated" = NOW()
      WHERE "id" = $8
      AND EXISTS (SELECT 1
                  FROM "events" AS "e"
                  JOIN "worlds" AS "w"
                  ON "w"."id" = "e"."world_id"
                  WHERE "e"."id" = $8
                  AND "w"."user_id" = $9);
    `;
    let params = [
      update.name,
      update.description,
      update.location,
      update.date_of_event,
      update.img_url,
      update.private_notes,
      update.is_private,
      req.params.id,
      req.user.id
    ]
    console.log(params);
    pool.query(query, params)
    .then(() => {
      res.sendStatus(201);
    })
    .catch((error) => {
      res.sendStatus(500);
      console.log(error);
    });
  } else {
    res.sendStatus(403);
  }
});

// Deletes an existing event
// Only possible if logged in user is owner
router.delete('/:id', (req, res) => {
  console.log('DELETE /api/event/id');
  if (req.isAuthenticated()) {
    let query = `
      DELETE FROM "events"
      WHERE "id" = $1
      AND EXISTS (SELECT 1
                  FROM "events" AS "e"
                  JOIN "worlds" AS "w"
                  ON "w"."id" = "e"."world_id"
                  WHERE "e"."id" = $1
                  AND "w"."user_id" = $2)
    `;
    let params = [req.params.id, req.user.id];
    pool.query(query, params)
    .then(() => {
      res.sendStatus(202);
    })
    .catch((error) => {
      res.sendStatus(500);
      console.log(error);
    });
  }
});

module.exports = router;