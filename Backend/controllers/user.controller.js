const { log } = require('winston');
const fileManager = require('../utils/fileManager');
const { generateResponse } = require('../utils/helper');

const userController = {

  // Fetch all existing users
  getAllUsers: async (_, res) => {
    try {
      const users = await fileManager.readData("user.json");

      if (!Array.isArray(users) || users.length === 0) {
        console.log(users?.length ?? "No users array");
        return res
          .status(404)
          .json(generateResponse(false, "No Users Found", null, 404));
      }

      return res
        .status(200)
        .json(generateResponse(true, "All Users Found", users, 200));
    } catch (error) {
      return res
      .status(500)
      .json(generateResponse(false, "Internal Server Error", null, 500));
    }
  },

  // Fetch user by ID
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

  // Create a new user
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
      console.log(error);

      res
        .status(500)
        .json(generateResponse(false, "Failed to create user", null, 500));
    }
  },

  // Update user details by ID
  updateUsers: async (req, res) => {
    const { id } = req.params;
    try {
      const users = await fileManager.readData("user.json");
      const userIndex = users.findIndex(user => user.id === parseInt(id));

      if (userIndex === -1) {
        return res
          .status(404)
          .json(generateResponse(false, "User Not Found", null, 404));
      }

      const updatedUser = { ...users[userIndex], ...req.body };
      users[userIndex] = updatedUser;

      await fileManager.writeData("user.json", users);

      return res
        .status(200)
        .json(generateResponse(true, "User updated successfully", updatedUser, 200));
    } catch (error) {
      res
        .status(500)
        .json(generateResponse(false, "Internal Server Error", null, 500));
    }
  },

  // Delete user by ID
  deleteUsers: async (req, res) => {
    const { id } = req.params;
    try {
      const users = await fileManager.readData("user.json");
      const userIndex = users.findIndex(user => user.id === parseInt(id));

      if (userIndex === -1) {
        return res
          .status(404)
          .json(generateResponse(false, "User Not Found", null, 404));
      }

      users.splice(userIndex, 1);
      await fileManager.writeData("user.json", users);

      return res
        .status(200)
        .json(generateResponse(true, "User deleted successfully", null, 200));
    } catch (error) {
      res
        .status(500)
        .json(generateResponse(false, "Internal Server Error", null, 500));
    }
  },
}

module.exports = userController; 