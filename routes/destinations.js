const express = require('express');
const router = express.Router();
const destinationsCtrl = require('../controllers/destinations');

router.post('/flights/:id/destinations', (req, res, next) => {
    destinationsCtrl.create(req, res, next);
});

module.exports = router;