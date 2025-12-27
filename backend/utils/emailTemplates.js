export const resetPasswordTemplate = (name, resetUrl) => {
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8" />
    <title>Password Reset</title>
    <style>
      body {
        margin: 0;
        padding: 0;
        background-color: #f4f6f8;
        font-family: Arial, sans-serif;
      }
      .container {
        max-width: 600px;
        margin: 30px auto;
        background: #ffffff;
        border-radius: 8px;
        overflow: hidden;
        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      }
      .header {
        background-color: #111827;
        color: #ffffff;
        padding: 20px;
        text-align: center;
      }
      .content {
        padding: 30px;
        color: #333333;
        line-height: 1.6;
      }
      .btn {
        display: inline-block;
        margin: 20px 0;
        padding: 12px 25px;
        background-color: #2563eb;
        color: #ffffff !important;
        text-decoration: none;
        border-radius: 6px;
        font-weight: bold;
      }
      .footer {
        padding: 15px;
        text-align: center;
        font-size: 12px;
        color: #777777;
        background: #f9fafb;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h2>ZeeStyle</h2>
      </div>

      <div class="content">
        <p>Hello ${name || "there"},</p>

        <p>
          We received a request to reset your ZeeStyle account password.
          Click the button below to reset it.
        </p>

        <p style="text-align:center;">
          <a href="${resetUrl}" class="btn">Reset Password</a>
        </p>

        <p>
          This link will expire in <strong>15 minutes</strong>.
          If you did not request this, you can safely ignore this email.
        </p>

        <p>Regards,<br/><strong>ZeeStyle Team</strong></p>
      </div>

      <div class="footer">
        © ${new Date().getFullYear()} ZeeStyle. All rights reserved.
      </div>
    </div>
  </body>
  </html>
  `;
};
