const router = require('express').Router();
const pool = require('../modules/pool');

router.get('/', (req, res) => {
  console.log('GET /api/world/');
  let query = `SELECT * FROM "worlds"`;
  let params = [];
  if (req.isAuthenticated()) {
    query = query + ` WHERE "user_id" = $1;`;
    params.push(req.user.id);
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

router.post('/', (req, res) => {
  console.log('POST /api/world/');
  if (req.isAuthenticated()) {
    const world = req.body;
    let query = `
    INSERT INTO "worlds" ("name", "description", "img_url", "private_notes", "user_id")
    VALUES ($1, $2, $3, $4, $5);
  `;
    let params = [world.name, world.description, world.img_url, world.private_notes, req.user.id];
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
