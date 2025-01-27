const User = require("../models/user");
const mongoose = require('mongoose');

// Show all users
const showUser = async (req, res) => {
 
    try {
      const users = await User.find(); 
      res.status(200).json(users);
   } catch (err) {
      console.error('Error fetching users:', err);
      res.status(500).json({ message: 'Server error' });
    }
  }
// Add a new user
const addUser = async (req, res) => {
  try {
    const { Email } = req.body;
    console.log(req.body, "user data received >>>>>");

    // Validate username existence in the request
    if (!Email) {
      return res.status(400).json({ message: "Email is required" });
    }

    // Check if the username already exists in the database
    const existingUser = await User.findOne({ Email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Create a new user
    const newUser = new User(req.body);
    await newUser.save();
    console.log("New user created:", newUser);

    res.status(201).json({ message: "User created successfully", user: newUser });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Error creating user", error });
  }
};
// Update user
const updateUser = async (req, res) => {
  console.log("Request Body:", req.body);
  console.log("Request Params ID:", req.params.id);


  try {
    // Check if `id` parameter is provided
    if (!req.params.id) {
      return res.status(400).json({ message: "User ID is required" });
    }

    // Validate `id` format
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid User ID format" });
    }

    // Update the user
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
     
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    console.log("Updated User:", updatedUser);
    res.status(200).json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Error updating user", error: error.message });
  }
};

// Delete a user
const deleteUser = async (req, res) => {
  const {deleteUser,token}=req.body
  console.log(req.body,".........>>")
  
  try {
    const deleteuser = `http://localhost:3000/api/users/${userid}`;
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decoded)
        const id = decoded.id;
    const deletedUser = await User.findByIdAndDelete(req.params._id)
  
console.log(deleteUser,"user will be deleted")

    if (deleteUser,token) {
      return res.status(404).json({ message: "User not found" });
      console.log(response.data,"..........>>>")
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user", error });
  }
};

module.exports = { showUser, addUser, updateUser, deleteUser };
