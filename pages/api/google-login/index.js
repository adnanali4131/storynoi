import { OAuth2Client } from "google-auth-library";
import Cors from "cors";
const client = new OAuth2Client({
  clientId: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
});

const cors = Cors({
  methods: ["POST", "GET", "HEAD"],
  origin: "*",
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
        redirect_uri: "http://localhost:3000/api/callback",
      });
      console.log(authUrl);
      res.setHeader("Access-Control-Allow-Origin", "*");

      return res.json({ url: authUrl });
    }
  } catch (err) {
    res.status(400).json({ err });
  }
}
