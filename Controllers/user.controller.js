import User from "../Models/user.schema.js";
import bcrypt from "bcrypt";

export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashpassword = await bcrypt.hash(password, 10);

    const newUser = new User({ username, email, password: hashpassword });
    newUser.save();
    res
      .status(200)
      .json({ message: "User Registered successfully", data: newUser });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Register failed" });
  }
};
export const getregisterUser = async (req, res) => {
  try {
    const user = await User.find();
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
  }
};
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      res.status(401).json({ message: "User not found" });
    }
    const passwordmatch = await bcrypt.hash(password, user.password);
    if (!passwordmatch) {
      res.status(401).json({ message: "Invalid User" });
    }
    res.status(200).json({ message: "Login Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Register failed" });
  }
};
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      res.status(401).json({ message: "User not found" });
    }
    const hashpassword = await bcrypt.hash(password, 10);
    const result = await User.updateOne(
      { _id: id },
      { username, email, password: hashpassword }
    );
    if (result.matchedCount === 0) {
      return res.status(401).json({ message: "Not updated" });
    }
    const updatedUser = await User.findById(id);
    res
      .status(200)
      .json({ message: "Updated successfully", data: updatedUser });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Updated failed" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const deleteUser = await User.deleteOne({ _id: userId });
    if (deleteUser.deletedCount === 0) {
      return res.status(400).json({ message: "User not deleted" });
    }
    res.status(200).json({ message: "Deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
