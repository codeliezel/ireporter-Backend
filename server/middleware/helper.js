import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

class Helper {
  static hashPassword(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
  }

  static comparePassword(hashPassword, password) {
    return bcrypt.compareSync(password, hashPassword);
  }


  static isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }

  static generateToken(id, username) {
    const token = jwt.sign({
      userid: id,
      createdby: username,
    }, process.env.SECRET_KEY, { expiresIn: '7d' });
    return token;
  }
}

export default Helper;
