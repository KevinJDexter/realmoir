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
  if (req.isAuthenticated()) {
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

router.get('/:id', (req, res) => {
  console.log('GET /api/story/id');
  console.log(req.params.id)
  const query = `
    SELECT "s"."id", "s"."title", "s"."synopsis", "s"."img_url", "w"."name" as "world", "s"."world_id", "g"."name" as "genre"
    FROM "stories" as "s"
    LEFT JOIN "genres" as "g"
    ON "s"."genre_id" = "g"."id"
    JOIN "worlds" as "w"
    ON "s"."world_id" = "w"."id"
    WHERE "s"."id" = $1
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

router.post('/', (req, res) => {
  console.log('POST /api/story/');
  if (req.isAuthenticated()) {
    let story = req.body;
    const query = `
      INSERT INTO "stories" ("title", "synopsis", "genre_id", "img_url", "private_notes", "world_id")
      VALUES ($1, $2, $3, $4, $5, $6);
    `;
    const params = [story.title, story.synopsis, story.genre_id, story.img_url, story.private_notes, story.world_id];
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