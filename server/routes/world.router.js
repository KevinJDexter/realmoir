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

router.get('/:id', (req, res) => {
  console.log('GET /api/world/id');
  const query = `
    SELECT "id", "name", "description"
    FROM "worlds"
    WHERE "id" = $1;
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
})

router.put('/:id', (req, res) => {
  console.log('PUT /api/world/id');
  const update = req.body;
  const query = `
    UPDATE "worlds"
    SET "name" = $1,
        "description" = $2,
        "img_url" = $3,
        "private_notes" = $4,
    WHERE "id" = $5;
  `;
  const params = [update.name, update.description, update.img_url, update.private_notes, req.params.id];
  pool.query (query, params)
    .then(() => {
      res.send(202)
    })
    .catch((error) => {
      res.sendStatus(500);
      console.log(error);
    })
})

module.exports = router;
