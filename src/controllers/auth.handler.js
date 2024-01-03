import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import sendRecoveryEmail from "../utils/sendEmail.js";
import { environment } from "../environment/environment.js";
import extractUserIdFromToken from "../utils/decode.js";
const SECRET_KEY = environment.SECRET_KEY;

const TOKEN_EXPIRY = environment.TOKEN_EXPIRY;

class AuthController {
  constructor(Model) {
    this.Model = Model;
  }

  registerUser = async (req, res) => {
    try {
      const { name, email, password } = req.body;
      const existingUser = await this.Model.findOne({ email });
      if (existingUser) {
        return res.status(400).send({ message: 'Email already registered.' });
      }
      const hashedPassword = await bcrypt.hash(password, 10);

      req.body.password = hashedPassword;

      const newUser = new this.Model(req.body);

      await newUser.save();

      const token = jwt.sign({ userId: newUser._id }, `${SECRET_KEY}`, { expiresIn: TOKEN_EXPIRY });

      res.status(201).json({ user: newUser, token });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Internal Server Error' });
    }
  }

  getMyselfData = async (req, res) => {
    try {
      const token = req.body.token; 
      const userId = extractUserIdFromToken(token);
      console.log(userId);
      if (!userId) {
        throw new Error("Unable to extract userId from token");
      }

      const userData = await this.Model.findById(userId);

      if (!userData) {
        throw new Error("User not found");
      }

      res.status(200).json(userData);
    } catch (error) {
      console.error("Error getting user data:", error.message);
      res.status(500).json({ message: 'Error getting user data' });
    }
  };

  loginUser = async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await this.Model.findOne({ email });

      if (!user || !await bcrypt.compare(password, user.password)) {
        return res.status(401).send({ message: 'Invalid credentials.' });
      }

      const token = jwt.sign({ userId: user._id }, SECRET_KEY, { expiresIn: TOKEN_EXPIRY });
      const refreshToken = token;

      await this.Model.findByIdAndUpdate(user._id, { refreshToken });

      res.status(200).json({ user, token, refreshToken });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Internal Server Error' });
    }
  }

  refreshToken = async (req, res) => {
    try {
      const { token } = req.body;

      const user = await this.Model.findOne({ refreshToken: token });

      if (!user) {
        return res.status(401).send({ message: 'Invalid refreshToken.' });
      }

      const newToken = jwt.sign({ userId: user._id }, SECRET_KEY, { expiresIn: TOKEN_EXPIRY });

      const newRefreshToken = jwt.sign({ userId: user._id }, SECRET_KEY);
      await this.Model.findByIdAndUpdate(user._id, { refreshToken: newRefreshToken });

      res.status(200).json({ token: newToken, refreshToken: newRefreshToken });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Internal Server Error' });
    }
  }

  forgotPassword = async (req, res) => {
    try {
      const { email } = req.body;
      const user = await this.Model.findOne({ email });

      if (!user) {
        return res.status(404).send({ message: 'User not found.' });
      }

      const recoveryCode = crypto.randomBytes(4).toString('hex').toUpperCase();

      user.recoveryCode = recoveryCode;
      user.recoveryCodeExpiry = new Date(Date.now() + 30 * 60 * 1000);
      await user.save();

      await sendRecoveryEmail(user.email, recoveryCode);

      res.status(200).send({ message: 'Recovery code sent successfully.' });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Internal Server Error' });
    }
  }

  compareRecoveryCode = async (req, res) => {
    try {
      const { email, recoveryCode } = req.body;
      const user = await this.Model.findOne({ email });

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

  resetPassword = async (req, res) => {
    try {
      const { email, newPassword } = req.body;
      const user = await this.Model.findOne({ email });

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
