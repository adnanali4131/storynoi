import jwt from 'jsonwebtoken';

const authenticateJWT = (handler) => {
  return async (req, res) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ error: 'Authorization header missing' });
    }
    const token = authHeader.split(' ')[1];

    try {
      const user = jwt.verify(token, process.env.JWT_SECRET);
      req.user = user;
      return handler(req, res);
    } catch (err) {
      return res.status(403).json({ error: 'Invalid token' });
    }
  };
};

export default authenticateJWT;
