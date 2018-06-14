const router = require('express').Router();
const pool = require('../modules/pool');

// Get all characters from the database
// Only get own characters when logged in
router.get('/', (req, res) => {
  console.log('GET /api/character')
  let query = `
    SELECT "c"."id", "c"."name", "c"."alias", "c"."description", "c"."bio", "c"."date_created"
    FROM "characters" AS "c"
    JOIN "worlds" AS "w"
    ON "c"."world_id" = "w"."id"
    JOIN "users" AS "u"
    ON "u"."id" = "w"."user_id"
  `;
  let params = [];
  if (req.isAuthenticated()) {
    query = query + ` WHERE "u"."id" = $1;`;
    params.push(req.user.id);
  } else {
    query = query + ` 
      WHERE "c"."is_private" = false
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

// Gets all characters that match given search criteria in a general search
router.get('/search/general', (req, res) => {
  console.log('GET /api/location/search/general');
  let query = `
    SELECT "c"."id", "c"."name", "c"."description", "c"."bio", "c"."date_created"
    FROM "characters" AS "c"
    JOIN "worlds" AS "w" 
    ON "c"."world_id" = "w"."id"
    JOIN "users" AS "u"
    ON "w"."user_id" = "u"."id"
    WHERE (UPPER("c"."name") LIKE UPPER($1)
          OR UPPER("c"."description") LIKE UPPER($1)
          OR UPPER("c"."bio") LIKE UPPER($1))
  `;
  let params = [`%${req.query.searchQuery}%`];
  if (req.isAuthenticated()) {
    query = query + ` AND "w"."user_id" = $2`;
    params.push(req.user.id);
  } else {
    query = query + `
      AND "c"."is_private" = false
      AND "u"."content_private" = false; 
    `;
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

// Get detailed info on character
// Only sends private notes if owner is logged in
router.get('/:id', (req, res) => {
  console.log('GET /api/character/id')
  let query = `
    SELECT "c"."id", "c"."name", "c"."alias", "c"."eye_color", "c"."hair_color", "c"."skin_color", "c"."birth_date", "c"."death_date", "c"."age", "c"."height", "c"."gender", "l"."name" as "home", "l"."id" as "home_id", "c"."description", "c"."bio", "c"."img_url", "w"."name" as "world", "c"."world_id", "c"."date_created", "c"."is_private",
    CASE WHEN "w"."user_id" = $1
         THEN "c"."private_notes"
         ELSE NULL
         END AS "private_notes",
    CASE WHEN "w"."user_id" = $1
         THEN true
         ELSE false
         END AS "is_owner"
    FROM "characters" AS "c"
    LEFT JOIN "locations" AS "l"
    ON "l"."id" = "c"."home"
    JOIN "worlds" AS "w"
    ON "w"."id" = "c"."world_id"
    JOIN "users" AS "u"
    ON "u"."id" = "w"."user_id"
    WHERE "c"."id" = $2
  `;
  let userId = null;
  if (req.isAuthenticated()) {
    userId = req.user.id;
  } else {
    query = query + `
      AND "c"."is_private" = false
      AND "u"."content_private" = false; 
  `;  }
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

// Gets all characters in the given world
router.get('/inWorld/:id', (req, res) => {
  console.log('GET /api/character/inWorld/id')
  let query = `
    SELECT "c"."id", "c"."name", "c"."alias", "c"."description", "c"."bio", "c"."date_created"
    FROM "characters" AS "c"
    JOIN "worlds" AS "w"
    ON "c"."world_id" = "w"."id"
    JOIN "users" AS "u"
    ON "u"."id" = "w"."user_id"
    WHERE "w"."id" = $1
  `;
  if (!req.isAuthenticated()) {
    query = query + `
      AND "c"."is_private" = false
      AND "u"."content_private" = false; 
    `;
  }
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

// Gets all characters in the given story
router.get('/inStory/:id', (req, res) => {
  console.log('GET /api/character/inStory/id')
  let query = `
    SELECT "c"."id", "c"."name", "c"."alias", "c"."description", "c"."bio", "c"."date_created"
    FROM "characters" AS "c"
    JOIN "characters_stories_junction" AS "cs"
    ON "cs"."character_id" = "c"."id"
    JOIN "worlds" AS "w"
    ON "w"."id" = "c"."world_id"
    JOIN "users" AS "u"
    ON "u"."id" = "w"."user_id"
    WHERE "cs"."story_id" = $1
  `;
  let params = [req.params.id];
  if (!req.isAuthenticated()) {
    query = query + `
      AND "c"."is_private" = false
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

// Gets all the characters connected to the given location
router.get('/location/:id', (req, res) => {
  console.log('GET /api/character/location/id')
  let query = `
    SELECT "c"."id", "c"."name", "c"."alias", "c"."description", "c"."bio", "c"."date_created"
    FROM "characters" AS "c"
    JOIN "characters_locations_junction" AS "cl"
    ON "cl"."character_id" = "c"."id"
    JOIN "worlds" AS "w"
    ON "w"."id" = "c"."world_id"
    JOIN "users" AS "u"
    ON "u"."id" = "w"."user_id"
    WHERE "cl"."location_id" = $1
  `;
  let params = [req.params.id];
  if (!req.isAuthenticated()) {
    query = query + `
      AND "c"."is_private" = false
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

// Gets all characters whose home is a given location
router.get('/homeIs/:id', (req, res) => {
  console.log('GET /api/character/homeIs/id')
  let query = `
    SELECT "c"."id", "c"."name", "c"."alias", "c"."description", "c"."bio", "c"."date_created"
    FROM "characters" AS "c"
    JOIN "worlds" AS "w"
    ON "w"."id" = "c"."world_id"
    JOIN "users" AS "u"
    ON "u"."id" = "w"."user_id"
    WHERE "home" = $1
  `; 
  let params = [req.params.id];
  if(!req.isAuthenticated()) {
    query = query + `
      AND "c"."is_private" = false
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

// Gets all character who were at a given event
router.get('/event/:id', (req, res) => {
  console.log('GET /api/character/event/id');
  let query = `
    SELECT "c"."id", "c"."name", "c"."alias", "c"."description", "c"."bio", "c"."date_created", "c"."is_private"
    FROM "characters" AS "c"
    JOIN "characters_events_junction" AS "ce"
    ON "ce"."character_id" = "c"."id"
    JOIN "worlds" AS "w"
    ON "w"."id" = "c"."world_id"
    JOIN "users" AS "u"
    ON "u"."id" = "w"."user_id"
    WHERE "ce"."event_id" = $1
  `;
  let params = [req.params.id];
  if (!req.isAuthenticated()) {
    query = query + `
      AND "c"."is_private" = false
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

// Gets all characters related to the given character
router.get('/relationships/:id', (req, res) => {
  console.log('GET /api/character/relationships/id')
  let query = `
    SELECT "c"."id", "c"."name", "r"."relationship"
    FROM "relationships" AS "r"
    JOIN "characters" AS "c"
    ON "r"."first_character_id" = "c"."id"
    OR "r"."second_character_id" = "c"."id"
    JOIN "worlds" AS "w"
    ON "w"."id" = "c"."world_id"
    JOIN "users" AS "u"
    ON "u"."id" = "w"."user_id"
    WHERE ("r"."first_character_id" = $1
    OR "r"."second_character_id" = $1)
    AND "c"."id" != $1
  `;
  let params = [req.params.id];
  if (!req.isAuthenticated()) {
    query = query + `
      AND "c"."is_private" = false
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

// Adds a new character to the database
router.post('/', (req, res) => {
  console.log('POST /api/character')
  if (req.isAuthenticated()) {
    const character = req.body;
    console.log(character);
    let query = `
    INSERT INTO "characters" (
      "name",
      "alias",
      "eye_color", 
      "hair_color",
      "skin_color",
      "birth_date",
      "death_date",
      "age",
      "height",
      "gender",
      "home",
      "description",
      "bio",
      "img_url",
      "private_notes",
      "world_id",
      "is_private"
    )
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17)
    RETURNING "id";
  `;
    let params = [
      character.name,
      character.alias,
      character.eye_color,
      character.hair_color,
      character.skin_color,
      character.birth_date,
      character.death_date,
      character.age,
      character.height,
      character.gender,
      character.home_id,
      character.description,
      character.bio,
      character.img_url,
      character.private_notes,
      character.world_id,
      character.is_private
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

// Edits an existing character in the database
// Only owning user may edit
router.put('/:id', (req, res) => {
  console.log('PUT /api/character/id')
  if (req.isAuthenticated()) {
    const update = req.body;
    let query = `
    UPDATE "characters" 
    SET "name" = $1,
        "alias" = $2,
        "eye_color" = $3, 
        "hair_color" = $4,
        "skin_color" = $5,
        "birth_date" = $6,
        "death_date" = $7,
        "age" = $8,
        "height" = $9,
        "gender" = $10,
        "home" = $11,
        "description" = $12,
        "bio" = $13,
        "img_url" = $14,
        "private_notes" = $15,
        "is_private" = $16
    WHERE "id" = $17
    AND EXISTS (SELECT 1
                FROM "characters" AS "c"
                JOIN "worlds" AS "w"
                ON "w"."id" = "c"."world_id"
                WHERE "c"."id" = $17
                AND "w"."user_id" = $18);
  `;
    let params = [
      update.name,
      update.alias,
      update.eye_color,
      update.hair_color,
      update.skin_color,
      update.birth_date,
      update.death_date,
      update.age,
      update.height,
      update.gender,
      update.home_id,
      update.description,
      update.bio,
      update.img_url,
      update.private_notes,
      update.is_private,
      req.params.id,
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

// Deletes an existing character from the database
// Only owning user may delete
router.delete('/:id', (req, res) => {
  console.log('DELETE /api/character/id')
  if (req.isAuthenticated()) {
    let query = `
      DELETE FROM "characters"
      WHERE "id" = $1
      AND EXISTS (SELECT 1
                  FROM "characters" AS "c"
                  JOIN "worlds" AS "w"
                  ON "c"."world_id" = "w"."id"
                  WHERE "c"."id" = $1
                  AND "w"."user_id" = $2);
    `;
    let params = [req.params.id, req.user.id];
    pool.query(query, params)
      .then(() => {
        res.sendStatus(202);
      })
      .catch((error) => {
        res.sendStatus(500);
        console.log(500);
      })
  } else {
    res.sendStatus(403);
  }
})

module.exports = router;