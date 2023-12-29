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

  static forgotPassword = async (req, res) => {
    try {
      const { email } = req.body;
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(404).send({ message: 'User not found.' });
      }

      const recoveryCode = crypto.randomBytes(4).toString('hex').toUpperCase();

      user.recoveryCode = recoveryCode;
      await user.save();

      await sendRecoveryEmail(user.email, recoveryCode);

      res.status(200).send({ message: 'Recovery code sent successfully.' });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Internal Server Error' });
    }
  }

  static compareRecoveryCode = async (req, res) => {
    try {
      const { email, recoveryCode } = req.body;
      const user = await User.findOne({ email });

      if (!user || !user.recoveryCode) {
        return res.status(400).send({ message: 'Invalid request.' });
      }

      if (recoveryCode === user.recoveryCode) {
        res.status(200).send({ message: 'Recovery code is valid.' });
      } else {
        res.status(401).send({ message: 'Invalid recovery code.' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Internal Server Error' });
    }
  }

  static resetPassword = async (req, res) => {
    try {
      const { email, newPassword } = req.body;
      const user = await User.findOne({ email });

      if (!user || !user.recoveryCode) {
        return res.status(400).send({ message: 'Invalid request.' });
      }

      user.recoveryCode = null;

      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;
      
      await user.save();

      res.status(200).send({ message: 'Password reset successfully.' });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Internal Server Error' });
    }
  }
}

export default AuthController;
