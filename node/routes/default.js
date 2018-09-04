const express = require('express');
const router = express.Router();

/* GET api listing. */
router.get('/', (req, res) => {
  res.send('hey! you did it. try visiting localhost8080/api');
});

module.exports = router;