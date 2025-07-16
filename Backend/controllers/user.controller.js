const fileManager = require('../utils/fileManager');
const { generateResponse } = require('../utils/helper');

const userController = {

  getAllUsers: async () => {

  },

  getUserById: async (req, res) => {
    const { id } = req.params;
    try {
      const { id } = req.params;
      const users = await fileManager.readData("user.json");
      const user = users.find(user => user.id === parseInt(id));

      if (!user) {
        return res
          .status(404)
          .json(generateResponse(false, "User Not Found", null, 404));
      }
      return res
        .status(200)
        .json(generateResponse(true, "User Found", user, 200));

    } catch (error) {
      // console.log("Error: "+ error)
      res
        .status(500)
        .json(generateResponse(false, "Internal Server Error", null, 500));
    }
  },

  createUsers: async (req, res) => {
    try {
      const userData = {
        ...req.body,
        isActive: req.body.isActive !== undefined ? req.body.isActive : true,
      };

      // Check if email already exists
      const users = await fileManager.readData("user.json");
      const existingUser = users.find((u) => u.email === userData.email);

      if (existingUser) {
        return res
          .status(400)
          .json(generateResponse(false, "Email already exists", null, 400));
      }

      const newUser = await fileManager.appendData("user.json", userData);

      res
        .status(201)
        .json(
          generateResponse(true, "User created successfully", newUser, 201)
        );
    } catch (error) {
      res
        .status(500)
        .json(generateResponse(false, "Failed to create user", null, 500));
    }
  },

  updateUsers: async (req, res) => {

  },

  deleteUsers: async (req, res) => { },
}

module.exports = userController; 