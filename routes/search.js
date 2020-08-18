const express = require("express");
const pg = require("pg");

const router = express.Router();
router.use(express.json());
module.exports = router;

let env = require("../env.json");
const Pool = pg.Pool;
const pool = new Pool(env);
pool.connect().then(function () {
    console.log(`Connected to database ${env.database}`);
});

const selectUserQuery = "SELECT top10 FROM users WHERE username = $1";

router.get("/search", function(req, res) {
    let username = req.query.username;

    /*
    const query = {
        name: "fetch"
    }
    */
   pool
    .query(selectUserQuery, [username])
    .then(function (response) {
        if (response.rows.length === 0) {
            return res.status(401).send();
        }
        //console.log(response.rows);
        return res.status(200).send(response.rows);
    })
})