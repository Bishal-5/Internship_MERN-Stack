const router = require('express').Router();
const userController = require('../controllers/user.controller');

router.get('/viewAll', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.post('/create', userController.createUsers);
router.put('/update/:id', userController.updateUsers);
router.delete('/delete/:id', userController.deleteUsers);

module.exports = router;