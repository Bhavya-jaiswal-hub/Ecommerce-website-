import nodemailer from "nodemailer";

const sendEmail = async ({ to, subject, html }) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: false, // true only for port 465
    auth: {
      user: process.env.SMTP_USER, // always "apikey" for Brevo
      pass: process.env.SMTP_PASS, // Brevo SMTP key
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
