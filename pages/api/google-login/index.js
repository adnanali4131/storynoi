import { OAuth2Client } from "google-auth-library";

const client = new OAuth2Client({
  clientId: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  redirectUri: "http://localhost:3000/api/callback",
});

export default async function handler(req, res) {
  try {
    if (req.method === "GET") {
      const authUrl = client.generateAuthUrl({
        access_type: "online",
        prompt: "consent",
        response_type: "code",
        scope: [
          "https://www.googleapis.com/auth/userinfo.email",
          "https://www.googleapis.com/auth/userinfo.profile",
        ],
      });

      return res.redirect(authUrl);
    }
  } catch (err) {
    res.status(400).json({ err });
  }
}
