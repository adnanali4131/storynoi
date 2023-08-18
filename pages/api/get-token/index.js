
const FACEBOOK_APP_ID = process.env.FACEBOOK_ID;
const REDIRECT_URI = process.env.NEXTAUTH_URL;
export default async (req, res) => {
  if (req.method === 'GET') {
    const tokenExchangeUrl = `https://www.facebook.com/v17.0/dialog/oauth?client_id=${FACEBOOK_APP_ID}&redirect_uri=${REDIRECT_URI}`
    try {
      res.status(200).json({ tokenExchangeUrl });
    } catch (error) {
      res.status(500).send('Error occurred while exchanging code for token.', error);
    }
  } else {
    res.status(405).end();
  }
};