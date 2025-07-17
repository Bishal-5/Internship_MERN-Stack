const router = require('express').Router();
const {login} = require('../middleware/auth.middleware');

router.post('/login', login);

module.exports = router;