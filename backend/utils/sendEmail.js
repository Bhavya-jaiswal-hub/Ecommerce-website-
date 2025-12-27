import nodemailer from "nodemailer";

const sendEmail = async ({ to, subject, html }) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: 465,              // ✅ FORCE 465
    secure: true,           // ✅ MUST BE TRUE
    auth: {
      user: "apikey",       // ✅ Brevo requirement
      pass: process.env.SMTP_PASS,
    },
  });

  await transporter.sendMail({
    from: `"ZeeStyle" <${process.env.EMAIL_FROM}>`,
    to,
    subject,
    html,
  });
};

export default sendEmail;
  