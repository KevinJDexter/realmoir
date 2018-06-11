const router = require('express').Router();
const pool = require('../modules/pool');

// Posts a new entry into the location-story-junction table
router.post('/locationStory', (req, res) => {
  console.log('POST /api/junction/locationStory');
  if (req.isAuthenticated()) {
    const query = `
      INSERT INTO "locations_stories_junction" ("location_id", "story_id")
      VALUES ($1, $2)
    `;
    let params = [req.body.location_id, req.body.story_id];
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

// Deletes all entries in the location-story-junction table associated with the given location
router.delete('/locationStory/location/:id', (req, res) => {
  console.log('DELETE /api/junction/locationStory/location/:id');
  if (req.isAuthenticated) {
    let query = `
      DELETE FROM "locations_stories_junction"
      WHERE "location_id" = $1
      AND EXISTS (SELECT 1
                  FROM "locations_stories_junction" as "ls"
                  JOIN "locations" AS "l"
                  ON "l"."id" = "ls"."location_id"
                  JOIN "worlds" AS "w"
                  ON "w"."id" = "l"."world_id"
                  WHERE "ls"."location_id" = $1
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
      })
  } else {
    res.sendStatus(403);
  }
})

// Deletes all entries in the location-story-junction table associated with the given story
router.delete('/locationStory/story/:id', (req, res) => {
  console.log('DELETE /api/junction/locationStory/story/:id');
  if (req.isAuthenticated) {
    let query = `
      DELETE FROM "locations_stories_junction"
      WHERE "story_id" = $1
      AND EXISTS (SELECT 1
                  FROM "locations_stories_junction" as "ls"
                  JOIN "stories" AS "s"
                  ON "s"."id" = "ls"."story_id"
                  JOIN "worlds" AS "w"
                  ON "w"."id" = "s"."world_id"
                  WHERE "ls"."story_id" = $1
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
      })
  } else {
    res.sendStatus(403);
  }
})

// Posts a new entry into the neighboring-locations table
router.post('/neighboringLocations/', (req, res) => {
  console.log('POST /api/junction/neighboringLocations');
  if (req.isAuthenticated()) {
    const query = `
      INSERT INTO "neighboring_locations" ("first_location", "second_location", "is_contained_in")
      VALUES ($1, $2, $3)
    `;
    const params = [req.body.first_location, req.body.second_location, req.body.contained_in];
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

// Deletes all entries in the neighboring-locations table associated with the given location
router.delete('/neighboringLocations/:id', (req, res) => {
  console.log('DELETE /api/junction/neighboringLocations');
  if (req.isAuthenticated()) {
    const query = `
    DELETE FROM "neighboring_locations"
    WHERE ("first_location" = $1
    OR "second_location" = $1)
    AND EXISTS (SELECT 1
                FROM "locations" AS "l"
                JOIN "worlds" AS "w"
                ON "w"."id" = "l"."world_id"
                WHERE "l"."id" = $1
                AND "w"."user_id" = $2);
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

// Adds a new entry into the character-location-junction table
router.post('/characterLocation', (req, res) => {
  console.log('POST /api/junction/characterLocation');
  if (req.isAuthenticated()) {
    let query = `
      INSERT INTO "characters_locations_junction" ("character_id", "location_id")
      VALUES ($1, $2);
    `;
    let params = [req.body.character_id, req.body.location_id];
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

// Deletes all entries in the character-location-junction table associated with the given character
router.delete('/characterLocation/character/:id', (req, res) => {
  console.log('DELETE /api/junction/characterLocation/character/id');
  if (req.isAuthenticated()) {
    let query = `
      DELETE FROM "characters_locations_junction"
      WHERE "character_id" = $1
      AND EXISTS (SELECT 1
                  FROM "characters" AS "c"
                  JOIN "worlds" AS "w"
                  ON "w"."id" = "c"."world_id"
                  WHERE "c"."id" = $1
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
        })
  } else {
    res.sentStatus(403);
  }
}) 

// Deletes all entries in the character-location-junction table associated with the given location
router.delete('/characterLocation/location/:id', (req, res) => {
  console.log('DELETE /api/junction/characterLocation/location/id');
  if (req.isAuthenticated()) {
    let query = `
      DELETE FROM "characters_locations_junction"
      WHERE "location_id" = $1
      AND EXISTS (SELECT 1
                  FROM "locations" AS "l"
                  JOIN "worlds" AS "w"
                  ON "w"."id" = "l"."world_id"
                  WHERE "l"."id" = $1
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
        })
  } else {
    res.sentStatus(403);
  }
})

// Adds a new entry into the character-story-junction table
router.post('/characterStory', (req, res) => {
  console.log('POST /api/junction/characterStory');
  if (req.isAuthenticated()) {
    const query = `
      INSERT INTO "characters_stories_junction" ("character_id", "story_id")
      VALUES ($1, $2)
    `;
    let params = [req.body.character_id, req.body.story_id];
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

// Deletes all entries in the character-story-junction table associated with the given character
router.delete('/characterStory/character/:id', (req, res) => {
  console.log('DELETE /api/junction/characterStory/character/:id');
  if (req.isAuthenticated) {
    let query = `
      DELETE FROM "characters_stories_junction"
      WHERE "character_id" = $1
      AND EXISTS (SELECT 1
                  FROM "characters" AS "c"
                  JOIN "worlds" AS "w"
                  ON "w"."id" = "c"."world_id"
                  WHERE "c"."id" = $1
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
      })
  } else {
    res.sendStatus(403);
  }
})

// Deletes all entries in the character-story-junction table associated with the given character
router.delete('/characterStory/story/:id', (req, res) => {
  console.log('DELETE /api/junction/characterStory/story/:id');
  if (req.isAuthenticated) {
    let query = `
      DELETE FROM "characters_stories_junction"
      WHERE "story_id" = $1
      AND EXISTS (SELECT 1
                  FROM "stories" AS "s"
                  JOIN "worlds" AS "w"
                  ON "w"."id" = "s"."world_id"
                  WHERE "s"."id" = $1
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
      })
  } else {
    res.sendStatus(403);
  }
})

// Adds a new entry to the character relationships table
router.post('/characterRelationships', (req, res) => {
  console.log('POST /api/junction/characterRelationships')
  if (req.isAuthenticated()) {
    let query = `
      INSERT INTO "relationships" ("first_character_id", "second_character_id", "relationship")
      VALUES ($1, $2, $3)
    `;
    let params = [req.body.first_character, req.body.second_character, req.body.relationship];
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

// Deletes all entries in the character relationships table associated with the given character
router.delete('/characterRelationships/:id', (req, res) => {
  console.log('DELETE /api/junction/characterRelationships/id');
  if (req.isAuthenticated()) {
    let query = `
      DELETE FROM "relationships"
      WHERE ("first_character_id" = $1
      OR "second_character_id" = $1)
      AND EXISTS (SELECT 1
                  FROM "characters" AS "c"
                  JOIN "worlds" AS "w"
                  ON "w"."id" = "c"."world_id"
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
          console.log(error);
        })
  } else {
    res.sendStatus(403);
  }
})

module.exports = router;