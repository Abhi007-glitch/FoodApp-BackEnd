//npm i nodemailer
const nodemailer = require("nodemailer");
const APP_EMAIL = process.env.APP_EMAIL || require("../secret").APP_EMAIL;
const APP_PASSWORD = process.env.APP_PASSWORD || require("../secret").APP_PASSWORD;
// async..await is not allowed in global scope, must use a wrapper
async function mailSender(email,otp) {
 
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service:"gmail",
    host: "smtp.gmail.com",
    auth: {
        user: APP_EMAIL,
        pass: APP_PASSWORD,
    },
  });

  const data= {
    from: '"AJ9U 👻" <foo@example.com>', // sender address
    to: email, // list of receivers
    subject: "Otp Sent ✔", // Subject line
    
    html: `<b> Your OTP is ${otp} and will expire in 5 minutes. </b>`, // html body
  }

  // send mail with defined transport object
  let info = await transporter.sendMail(data);

}


module.exports= mailSender;
