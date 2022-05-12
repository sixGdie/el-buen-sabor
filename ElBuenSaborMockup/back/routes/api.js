const router = require('express').Router();

const apiPlatosRouter = require('./api/platos');

router.use('/platos', apiPlatosRouter);

module.exports = router;