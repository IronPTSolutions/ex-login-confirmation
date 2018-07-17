const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL_SENDER,
    pass: process.env.EMAIL_PASSWORD
  }
});

const defaultFrom = process.env.EMAIL_SENDER

module.exports.confirmSignUp = (user) => {
  transporter.sendMail({
    from: defaultFrom,
    to: user.email,
    subject: 'Confirm Sign up',
    html: `
      <!DOCTYPE html>
        <html>
        <head>
        </head>
        <body>
          Hello ${user.name}!

          <a href="${process.env.APP_URL}/users/confirm?token=${user.token}">Confirm registration</a>
        </body>
        </html>
    `
  })
  .then((info) => console.log(info))
  .catch((error) => console.log(error))
}
