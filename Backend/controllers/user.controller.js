const { log } = require('winston');
const fileManager = require('../utils/fileManager');
const { generateResponse } = require('../utils/helper');

const userController = {

  // Fetch all existing users
  getAllUsers: async (_, res) => {
    try {
      const users = await fileManager.readData("user.json");

      if (users.length === 0) {
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
      return res
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

      return res
        .status(201)
        .json(
          generateResponse(true, "User created successfully", newUser, 201)
        );

    } catch (error) {
      return res
        .status(500)
        .json(generateResponse(false, "Failed to create user", null, 500));
    }
  },

  // Update user details by ID
  updateUsers: async (req, res) => {
    try {
      const { id } = req.params;
      const updateData = req.body;

      // Check if email already exists (if updating email)      
      if (updateData.email) {
        const users = await fileManager.readData("user.json");
        const existingUser = users.find((u) => u.email === updateData.email && u.id === parseInt(id));

        if (existingUser) {
          return res
            .status(400)
            .json(generateResponse(false, "Email Already Exist!", null, 400));
        }
      }

      const updatedUser = await fileManager.updateData(id, "user.json", updateData);

      if (!updatedUser) {
        return res
          .status(400)
          .json(generateResponse(false, "User Not Found!", null, 400));
      }

      return res
        .status(200)
        .json(
          generateResponse(true, "User updated successfully", updatedUser, 200)
        );

    } catch (error) {
      res
        .status(500)
        .json(generateResponse(false, "Failed to update user", null, 500));
    }
  },

  // Delete user by ID
  deleteUsers: async (req, res) => {
    try {
      const { id } = req.params;
      const users = await fileManager.readData("user.json");
      const findUser = users.find(user => user.id === parseInt(id));

      if (!findUser) {
        return res
          .status(404)
          .json(generateResponse(false, "User Not Found", null, 404));
      }

      await fileManager.deleteData("user.json", id);

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