import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/users.js";
import { environment } from "../environment/environment.js";

const SECRET_KEY = environment.SECRET_KEY;

class AuthController {

  static registerUser = async (req, res) => {
    try {
      const { name, email, password } = req.body;
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).send({ message: 'Email already registered.' });
      }
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new User({ name, email, password: hashedPassword });
      await newUser.save();

      const token = jwt.sign({ userId: newUser._id }, `${SECRET_KEY}`, { expiresIn: '1h' });

      res.status(201).json({ user: newUser, token });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Internal Server Error' });
    }
  }

  static loginUser = async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).send({ message: 'Invalid credentials.' });
      }
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).send({ message: 'Invalid credentials.' });
      }
      const token = jwt.sign({ userId: user._id }, `${SECRET_KEY}`, { expiresIn: '1h' });
      res.status(200).json({ user, token });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Internal Server Error' });
    }
  }
}

export default AuthController;
