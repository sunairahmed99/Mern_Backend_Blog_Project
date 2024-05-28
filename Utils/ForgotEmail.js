const nodemailer = require("nodemailer");

const ForgotEmail = async opt =>{

    const transporter = nodemailer.createTransport({
        host:process.env.Email_Host,
        port:process.env.Email_Port,
        auth: {
          user:process.env.Email_User,
          pass:process.env.Email_Pass,
        },
      });

      const option   = {
        from: 'sunairahmed9908@gmail.com', // sender address
        to: opt.email, // list of receivers
        subject:opt.subject, // Subject line
        text:opt.text, // plain text body
      };

      await transporter.sendMail(option)
}

module.exports = ForgotEmail