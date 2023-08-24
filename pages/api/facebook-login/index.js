import axios from 'axios';
import prisma from "@/db";
import jwt from 'jsonwebtoken';


const FACEBOOK_APP_ID = process.env.FACEBOOK_ID;
const FACEBOOK_APP_SECRET = process.env.FACEBOOK_SECRET;
const REDIRECT_URI = process.env.NEXTAUTH_URL;

export default async (req, res) => {
  if (req.method === 'POST') {
    const code = req.body.code;

    const tokenExchangeUrl = `https://graph.facebook.com/v17.0/oauth/access_token?client_id=${FACEBOOK_APP_ID}&redirect_uri=${REDIRECT_URI}/&client_secret=${FACEBOOK_APP_SECRET}&code=${code}`;

    try {
      const response = await axios.get(tokenExchangeUrl);
      const accessToken = response.data.access_token;

      const userDetailsUrl = `https://graph.facebook.com/me?fields=id,first_name,last_name,email&access_token=${accessToken}`;
      const userDetailsResponse = await axios.get(userDetailsUrl);
      const { first_name, last_name, email } = userDetailsResponse.data;

      const existingUser = await prisma.user.findUnique({
        where: {
          email: email
        }
      });

      let userId;

      if (!existingUser) {
        const newUser = await prisma.user.create({
          data: {
            firstName: first_name,
            lastName: last_name,
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
      return res.json({ token, email, firstName: first_name, lastName: last_name });
    } catch (error) {
      console.log(error);
      res.status(500).send('Error occurred while fetching user details.', error);
    }
  } else {
    res.status(405).end();
  }
};





