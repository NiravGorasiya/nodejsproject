const nodemailer = require("nodemailer");
const sendMail = (data) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    port: 465,
    secure: false,
    auth: {
      user:"niravgorasdfiya1d0@gmail.com",
      pass:"Hemaxi@225",
    },
  });
  const mailOptions = {
    from: "niravgorasiya10@gmail.com",
    to: data.to,
    subject: data.sub,
    html: data.html,
    cc: data.cc,
    attachments: data.attachments,
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    }
    // else {
    //   console.log("Email sent: " + info.response);
    // }
  });
};
module.exports.sendMail = sendMail;