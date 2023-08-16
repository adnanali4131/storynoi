import { OAuth2Client } from "google-auth-library";
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const client = new OAuth2Client({
  clientId: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  redirectUri: "http://localhost:3000/api/callback",
});

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const code = await req.query;

    if (!code) {
      return res.json({ error: 'No code provided' });
    }

    const { tokens } = await client.getToken(code);
    const { payload } = await client.verifyIdToken({ idToken: tokens.id_token });

    const email = payload.email;
    const firstName = payload.given_name;
    const lastName = payload.family_name;

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: {
        email: email
      }
    });

    let userId;

    if (!existingUser) {
      const newUser = await prisma.user.create({
        data: {
          firstName: firstName,
          lastName: lastName,
          email: email,
        }
      });
      userId = newUser.id;
    } else {
      userId = existingUser.id;
    }

    const token = jwt.sign({ userId: userId, email: email }, process.env.JWT_SECRET, {
      expiresIn: '30d'
    });

    return res.json({ token, email, firstName, lastName });
  }
}


