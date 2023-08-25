import { OAuth2Client } from "google-auth-library";
import prisma from "@/db";

import jwt from "jsonwebtoken";

const client = new OAuth2Client({
  clientId: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  redirectUri: process.env.REDIRECT_URL,
});

export default async function handler(req, res) {
  if (req.method === "GET") {
    const code = await req.query;

    if (!code) {
      return res.json({ error: "No code provided" });
    }
    const { tokens } = await client.getToken(code);
    const { payload } = await client.verifyIdToken({
      idToken: tokens.id_token,
    });

    const email = payload.email;
    const firstName = payload.given_name;
    const lastName = payload.family_name;

    // Check if user already exists
    let user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          firstName: firstName,
          lastName: lastName,
          email: email,
        },
      });
    }

    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        userName: user.firstName + " " + lastName,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "30d",
      }
    );

    // return res.json({ token, email, firstName, lastName });
    // Close the current tab/window
    const data = JSON.stringify({ token, email, firstName, lastName });
    const script = `
  <script>
    window.opener.postMessage({type:'GoogleAuthSuccess', data:${data}}, '*');
    window.close();
  </script>
`;

    res.send(script);
  }
}
