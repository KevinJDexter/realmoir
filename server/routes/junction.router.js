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

module.exports = router;