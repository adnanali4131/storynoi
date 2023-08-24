import aws from "aws-sdk"

aws.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
})

export const sendEmail = async ({ recipientEmail, subject, htmlTemplate }) => {

  if (!recipientEmail || !subject || !htmlTemplate) {
    console.error("One or more email parameters are undefined.");
    return;
  }

  const params = {
    Destination: {
      ToAddresses: [recipientEmail]
    },
    Message: {
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: htmlTemplate
        }
      },
      Subject: {
        Charset: 'UTF-8',
        Data: subject
      },
    },
    Source: 'adnan.ali@ripeseed.io'
  }

  const sendPromise = new aws.SES({ apiVersion: '2010-12-01' }).sendEmail(params)

  try {
    await sendPromise.promise()
  } catch (error) {
    console.log(error)
  }
}

