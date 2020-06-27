const express = require('express');
const router = express.Router();

router.use('/country', require('./country'));
router.use('/city', require('./city'));

module.exports = router;
