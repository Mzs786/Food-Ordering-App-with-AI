const express = require('express');
const router = express.Router();
const { getitemsByEmail } = require('../controllers/suggestedItemscontroller');

router.get('/suggested-items', getitemsByEmail);

module.exports = router;
