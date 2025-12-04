import {
  CLIENT_URL,
  PROJECT_NAME,
  RESET_PASS_TTL,
  SUPPORT_PHONE,
} from "../config/env.config";

export const emailTemplates = {
  forgotPass: {
    subject: `Reset Your Password – ${PROJECT_NAME}`,

    text: (
      user = { firstname: "John", email: "Johndoe@gmail.com" }
    ): string => `Hi ${user.firstname},

We received a request to reset your password.
If you didn’t make this request, you can safely ignore this email.

Click the button below to create a new password:

Reset Password: ${CLIENT_URL}/reset-password

This link will expire in ${RESET_PASS_TTL} for security purposes.

Stay secure,
The ${PROJECT_NAME} Team`,
    html: (
      user = { firstname: "John", email: "johndoe@gmail.com" }
    ) => `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>Reset your password</title>
    <style>
      body {
        margin: 0;
        padding: 0 24px;
        font-family: system-ui, -apple-system, "Segoe UI", Roboto,
          "Helvetica Neue", Arial;
        background: #f4f6fb;
        color: #111;
      }
      .container {
        max-width: 600px;
        margin: 28px auto;
        background: #fff;
        border-radius: 8px;
        overflow: hidden;
        box-shadow: 0 6px 18px rgba(9, 30, 66, 0.06);
      }
      .pad {
        padding: 22px;
      }
      h1 {
        margin: 0 0 8px 0;
        font-size: 20px;
      }
      p {
        margin: 0 0 12px 0;
        line-height: 1.45;
      }
      .btn {
        display: inline-block;
        padding: 5px 18px;
        border-radius: 8px;
        text-decoration: none;
        font-weight: 600;
      }
      .primary {
        background: #e84343;
        color: #fff;
      }
      .muted {
        color: #6b7280;
        font-size: 14px;
      }
      .footer {
        font-size: 12px;
        color: #9aa0a6;
        padding: 18px 22px;
        text-align: center;
      }
      @media (max-width: 420px) {
        .pad {
          padding: 16px;
        }
        h1 {
          font-size: 18px;
        }
        .btn {
          padding: 5px 14px;
        }
      }
    </style>
  </head>
  <body>
    <div style="display: none; max-height: 0; overflow: hidden; opacity: 0">
      Reset your {{storeName}} password — link expires in {{expiryTime}}
    </div>

    <table
      role="presentation"
      width="100%"
      cellpadding="0"
      cellspacing="0"
      style="background: #f4f6fb"
    >
      <tr>
        <td align="center">
          <table
            role="presentation"
            class="container"
            cellpadding="0"
            cellspacing="0"
          >
            <tr>
              <td style="background: #0f1724; color: #fff; padding: 18px 24px">
                <span style="font-size: 18px; font-weight: 700"
                  >${PROJECT_NAME}</span
                >
              </td>
            </tr>

            <tr>
              <td class="pad">
                <h1>Password reset requested</h1>
                <p class="muted">
                  Hi ${user.firstname}, we received a request to reset the
                  password for your account (${user.email}).
                </p>

                <p style="margin-top: 18px">
                  <a
                    href="${CLIENT_URL}/reset-password"
                    class="btn primary"
                    style="background: #e84343; color: #fff"
                    >Reset password</a
                  >
                </p>

                <p style="margin-top: 12px" class="muted">
                  If the button doesn't work, copy and paste this link into your
                  browser:
                </p>
                <p
                  style="word-break: break-all; font-size: 13px; color: #374151"
                >
                  <a
                    href="${CLIENT_URL}/reset-password"
                    style="color: #0066ff; text-decoration: none"
                    >${CLIENT_URL}/reset-password</a
                  >
                </p>

                <p style="margin-top: 14px" class="muted">
                  This link will expire in <strong>${RESET_PASS_TTL}</strong>.
                  If you didn't request a password reset, you can safely ignore
                  this email — no changes will be made to your account.
                </p>

                <hr
                  style="
                    border: none;
                    border-top: 1px solid #eef1f6;
                    margin: 22px 0;
                  "
                />

                <p class="muted">
                  Questions?
                  <a
                    href="https://wa.me/${SUPPORT_PHONE}?text=Hi%20there%2C%20You%20have%20successfully%20reached%20the%20support%20centre%20for%20${PROJECT_NAME}.%20How%20can%20we%20help%20you%20today%3F"
                    target="_blank"
                    style="color: #0066ff; text-decoration: none"
                  >
                    Chat with Support on WhatsApp </a
                  >.
                </p>
              </td>
            </tr>

            <tr>
              <td class="footer">
                © ${new Date().getFullYear()} ${PROJECT_NAME} —
                <a
                  href="${CLIENT_URL}/unsubscribe"
                  style="color: #9aa0a6; text-decoration: underline"
                  >Unsubscribe</a
                >
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
`,
  },

  signUp: {
    subject: `Welcome to ${PROJECT_NAME} 🎉`,

    text: (
      user = { firstname: "John", email: "johndoe@gmail.com" }
    ): string => `Hi ${user.firstname},

Thanks for creating an account with ${PROJECT_NAME}!
You’re all set to start shopping, tracking your orders, and getting early access to new products.

Your Account Details:
Email: ${user.email}

If you ever need help, just reply to this email — we’re here for you.

Welcome aboard,
The ${PROJECT_NAME} Team`,

    html: (
      user = {
        firstname: "John",
        email: "johndoe@gmail.com",
      }
    ): string => `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>Welcome to ${PROJECT_NAME}</title>
    <style>
      /* Minimal responsive styles — keep inline-friendly */
      body {
        margin: 0;
        padding: 0 24px;
        font-family: system-ui, -apple-system, "Segoe UI", Roboto,
          "Helvetica Neue", Arial;
        background: #f6f7fb;
        color: #111;
      }
      .container {
        width: 100%;
        max-width: 600px;
        margin: 24px auto;
        background: #ffffff;
        border-radius: 8px;
        overflow: hidden;
        box-shadow: 0 6px 18px rgba(9, 30, 66, 0.08);
      }
      .pad {
        padding: 24px;
      }
      h1 {
        margin: 0 0 8px 0;
        font-size: 20px;
      }
      p {
        margin: 0 0 12px 0;
        line-height: 1.45;
      }
      .btn {
        display: inline-block;
        padding: 5px 18px;
        border-radius: 8px;
        text-decoration: none;
        font-weight: 600;
      }
      .muted {
        color: #6b7280;
        font-size: 14px;
      }
      .footer {
        font-size: 12px;
        color: #9aa0a6;
        padding: 18px 24px;
        text-align: center;
      }
      .brand {
        font-weight: 700;
        color: #111;
      }
      @media (max-width: 420px) {
        .pad {
          padding: 16px;
        }
        h1 {
          font-size: 18px;
        }
        .btn {
          padding: 10px 14px;
        }
      }
    </style>
  </head>
  <body>
    <!-- Preheader (hidden) -->
    <div
      style="
        display: none;
        max-height: 0;
        overflow: hidden;
        font-size: 1px;
        color: #fff;
        line-height: 1px;
        opacity: 0;
      "
    >
      Welcome to ${PROJECT_NAME} — your account is ready.
    </div>

    <table
      role="presentation"
      width="100%"
      cellpadding="0"
      cellspacing="0"
      style="background: #f6f7fb"
    >
      <tr>
        <td align="center">
          <table
            role="presentation"
            class="container"
            cellpadding="0"
            cellspacing="0"
          >
            <tr>
              <td style="background: #0f1724; color: #fff; padding: 18px 24px">
                <span style="font-size: 18px; font-weight: 700">${PROJECT_NAME}</span>
              </td>
            </tr>

            <tr>
              <td class="pad">
                <h1>Welcome, ${user.firstname} 👋</h1>
                <p class="muted">
                  Thanks for creating an account at
                  <span class="brand">${PROJECT_NAME}</span>. You’re all set —
                  you can now shop, track orders, and save your favorites.
                </p>

                <p style="margin-top: 16px">
                  <strong>Account email:</strong> ${user.email}
                </p>

                <p style="margin-top: 18px">
                  <a
                    href="${CLIENT_URL}/login"
                    class="btn"
                    style="background: #0066ff; color: #fff"
                    >Sign in to your account</a
                  >
                </p>

                <hr
                  style="
                    border: none;
                    border-top: 1px solid #eef1f6;
                    margin: 22px 0;
                  "
                />

                <p class="muted">
                  Need help? Reply to this email or visit our
                  <a
                    href="https://wa.me/${SUPPORT_PHONE}?text=Hi%20there%2C%20You%20have%20successfully%20reached%20the%20support%20centre%20for%20${PROJECT_NAME}.%20How%20can%20we%20help%20you%20today%3F"
                    target="_blank"
                    style="color: #0066ff; text-decoration: none"
                  >
                    Chat with Support on WhatsApp
                  </a>
                  .
                </p>
              </td>
            </tr>

            <tr>
              <td class="footer">
                © ${new Date().getFullYear()} ${PROJECT_NAME} —
                <a
                  href="${CLIENT_URL}/unsubscribe"
                  style="color: #9aa0a6; text-decoration: underline"
                  >Unsubscribe</a
                >
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
`,
  },
  resetPasswordSuccess: {
    subject: `Your Password Has Been Updated ✔️`,

    text: (
      user = { firstname: "John", email: "johndoe@gmail.com" }
    ): string => `Hi ${user.firstname},

Your password for ${PROJECT_NAME} was successfully updated.  
If you made this change, you're all set!

If you DID NOT change your password, please secure your account immediately by resetting it again or contacting support.

Account Email: ${user.email}

Stay safe,
The ${PROJECT_NAME} Team`,

    html: (
      user = {
        firstname: "John",
        email: "johndoe@gmail.com",
      }
    ): string => `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>Password Updated</title>
    <style>
      body {
        margin: 0;
        padding: 0 24px;
        font-family: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial;
        background: #f6f7fb;
        color: #111;
      }
      .container {
        width: 100%;
        max-width: 600px;
        margin: 24px auto;
        background: #ffffff;
        border-radius: 8px;
        overflow: hidden;
        box-shadow: 0 6px 18px rgba(9,30,66,0.08);
      }
      .pad {
        padding: 24px;
      }
      h1 {
        margin: 0 0 8px;
        font-size: 20px;
      }
      p {
        margin: 0 0 12px;
        line-height: 1.45;
      }
      .footer {
        font-size: 12px;
        color: #9aa0a6;
        padding: 18px 24px;
        text-align: center;
      }
      .highlight {
        color: #0066ff;
        font-weight: 600;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="pad">
        <h1>Password Updated Successfully</h1>
        <p>Hi <strong>${user.firstname}</strong>,</p>
        <p>Your password for <strong>${PROJECT_NAME}</strong> has been successfully changed.</p>
        <p>If you made this change, no further action is needed.</p>
        <p>
          <strong class="highlight">If you didn't make this change</strong>,  
          please reset your password immediately or reach out to our support team.
        </p>
        <p>Email on file: <strong>${user.email}</strong></p>
      </div>
      <div class="footer">
        Stay safe,<br />
        The ${PROJECT_NAME} Team
      </div>
    </div>
  </body>
</html>`,
  },
};
