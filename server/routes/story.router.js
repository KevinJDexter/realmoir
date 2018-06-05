const router = require('express').Router();
const pool = require('../modules/pool');

router.get('/', (req, res) => {
  console.log('GET /api/story');
  let query = `
    SELECT "stories".* 
    FROM "stories" 
    JOIN "worlds" 
    ON "stories"."world_id" = "worlds"."id"
  `;
  let params = [];
  if (req.isAuthenticated()) {
    query = query + ` WHERE "worlds"."user_id" = $1`;
    params.push(req.user.id);
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

router.get('/inWorld/:id', (req, res) => {
  console.log('GET /api/story/inWorld/id');
  if (req.isAuthenticated() ) {
    const query = `
      SELECT *
      FROM "stories"
      WHERE "world_id" = $1
    `;
    const params = [req.params.id];
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

module.exports = router;