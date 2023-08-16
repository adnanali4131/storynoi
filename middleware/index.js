

import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server'


export default function authenticate(req, res, next) {
  const token = req.headers.authorization;
  if (!token) {
    return NextResponse.json({ message: 'Authentication failed' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return NextResponse.json({ message: 'Invalid token' });
  }
}
