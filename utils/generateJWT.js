
import jwt from 'jsonwebtoken';

export function generateJWT(payload) {
  const secret = process.env.JWT_SECRET;
  const token = jwt.sign(payload, secret, { expiresIn: '30d' });
  return token;
}
