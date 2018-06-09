const router = require('express').Router();
const pool = require('../modules/pool');

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

module.exports = router;