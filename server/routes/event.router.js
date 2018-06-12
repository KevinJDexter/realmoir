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
  `;
  let params = [];
  if (req.isAuthenticated()) {
    query = query + ` WHERE "w"."user_id" = $1;`;
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
});

// Gets events matching given search criteria
router.get('/search/general', (req, res) => {
  console.log('GET /api/event/search/general');
  let query = `
    SELECT "e"."id", "e"."name", "e"."description", "e"."date_created"
    FROM "events" AS "e"
    JOIN "worlds" AS "w"
    ON "e"."world_id" = "w"."id"
    WHERE (UPPER("e"."name") LIKE UPPER($1)
           ON UPPER("e"."description") LIKE UPPER($1))
  `;
  let params = [req.body.searchQuery];
  if (req.isAuthenticated()) {
    query = query + ` AND "w"."user_id" = $2`;
    params.push(req.user.id);
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
    SELECT "e"."id", "e"."name", "e"."description", "l"."id" AS "location_id", "l"."name" as "location", "e"."world_id", "w"."name" as "world", "e"."date_created", "e"."img_url",
    CASE WHEN "w"."user_id" = $1
         THEN "e"."private_notes"
         ELSE NULL
         END AS "private_notes"
    CASE WHEN "w"."user_id" = $1
         THEN true
         ELSE false
         END AS "is_owner"
    FROM "events" AS "e"
    LEFT JOIN "locations" AS "l"
    ON "l"."id" = "e"."location"
    JOIN "worlds" AS "w"
    ON "w"."id" = "e"."world_id"
    WHERE "e"."id" = $2;
  `;
  let userId = null;
  if (req.isAuthenticated ()) {
    userId = req.user.id;
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
    SELECT "id", "name", "description", "date_created"
    FROM "events"
    WHERE "id" = $1
  `;
  let params = [req.params.id];
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
    JOIN "event_stories_junction" AS "es"
    ON "e"."id" = "es"."event_id"
    WHERE "es"."story_id" = $1
  `;
  let params = [req.params.id];
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
    SELECT "id", "name", "description", "date_created"
    FROM "events"
    WHERE "location" = $1
  `;
  let params = [req.params.id];
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
    WHERE "ce"."character_id" = $1
  `;
  let params = [req.params.id];
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
        "world_id"
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING "id";
    `;
    router.params = [
      event.name,
      event.description,
      event.location,
      event.date_of_event,
      event.img_url,
      event.private_notes,
      event.world_id
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
          "private_notes" = $6
      WHERE "id" = $7
      AND EXISTS (SELECT 1
                  FROM "events" AS "e"
                  JOIN "worlds" AS "w"
                  ON "w"."id" = "e"."world_id"
                  WHERE "e"."id" = $7
                  AND "w"."user_id" = $8);
    `;
    let params = [
      update.name,
      update.description,
      update.location,
      update.date_of_event,
      update.img_url,
      update.private_notes,
      update.id,
      req.user.id
    ]
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