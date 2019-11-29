import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const Auth = {
  async verifyToken(req, res, next) {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(400).json({ error: '400', message: 'Token is not provided' });
    }
    try {
      const decoded = await jwt.verify(token, process.env.SECRET_KEY);
      req.user = {
        id: decoded.userid,
        username: decoded.createdby,
      };
      next();
    } catch (error) {
      return res.status(500).json({ status: '500', message: 'Server error' });
    }
  },
};

export default Auth;
