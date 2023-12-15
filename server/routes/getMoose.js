const express = require("express");
const router = express.Router();

/* NOTE: because we are in the getMoose route file, the "/" here ACTUALLY
 * represents /getMoose --> if you were to write "getMoose" as the
 * first parameter, you'd be setting up the data for /getMoose/getMoose
 */
router.get("/", (req, res) => {
    res.json({message: "Hello world", moose:["mike","joe","xiao"]});
});

module.exports = router;