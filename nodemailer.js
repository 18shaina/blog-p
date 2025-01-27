const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport(
  {
    service: "gmail",
    auth: {
      user: "testexpinator@gmail.com",
      pass: "sbhm xfpb wefn ccdl",
    },
  })

module.exports =transporter;


