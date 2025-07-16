const router= require('express').Router();
const userController = require('../controllers/user.controller');

router.get('/:id', userController.getUserById);
router.get('/viewAll', userController.getAllUsers);
router.post('/create', userController.createUsers);
router.put('/update', userController.updateUsers);
router.delete('/delete', userController.deleteUsers);

module.exports = router;