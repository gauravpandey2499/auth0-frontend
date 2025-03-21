require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { expressjwt: jwt } = require("express-jwt");
const jwks = require("jwks-rsa");
const nodemailer = require("nodemailer");

const app = express();

app.use(cors());
app.use(express.json());

const jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
  }),
  audience: process.env.AUTH0_CLIENT_ID,
  issuer: `https://${process.env.AUTH0_DOMAIN}/`,
  algorithms: ["RS256"],
  getToken: (req) => {
    if (
      req.headers.authorization &&
      req.headers.authorization.split(" ")[0] === "Bearer"
    ) {
      return req.headers.authorization.split(" ")[1];
    }
    // Fallback to body
    return req.body.token;
  },
});

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "LOGIN",
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

app.post("/auth/callback", jwtCheck, async (req, res) => {
  try {
    const { token, email } = req.body;

    const mailOptions = {
      from: `Auth Service <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Your Authentication Token",
      text: `Here is your authentication token:\n\n${token}\n\nThis token is valid for 1 hour.`,
      html: `<p>Here is your authentication token:</p>
             <pre>${token}</pre>
             <p>This token is valid for 1 hour.</p>`,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Email send error:", error);
    res.status(500).json({
      error: "Failed to send email",
      details: error.message,
    });
  }
});

app.use(
  cors({
    origin: process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3000",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
