const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const request = require("request");
if (process.env.NODE_ENV !== "production") require("dotenv").config();

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

if (process.env.NODE_ENV === "production") {
  const enforce = require("express-sslify");
  const compression = require("compression");
  app.use(enforce.HTTPS({ trustProtoHeader: true }));
  app.use(express.static(path.join(__dirname, "client/build")));
  app.use(compression());
  app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}

app.listen(port, (error) => {
  if (error) throw error;
  console.log("Server running on port " + port);
});

app.get("/service-worker.js", (req, res) => {
  res.sendFile(path.resolve(__dirname, "..", "build", "service-worker.js"));
});

app.post("/captcha", (req, res) => {
  const secret = process.env.CAPTCHA_SECRET_KEY + "";
  const token = req.body.token;

  const verificationURL = `https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${token}&remoteip=${req.connection.remoteAddress}`;
  request(verificationURL, (err, response, body) => {
    body = JSON.parse(body);
    const errorCode = body["error-codes"] ? body["error-codes"][0] : null;
    const { success, score } = body;
    if (!success) {
      if (errorCode === "invalid-input-response") {
        return res
          .status(500)
          .send({ error: "The Captcha token is invalid or malformed." });
      }
      return res.status(500).send({
        error: "Failed to verify the Captcha, Please Try again later..",
      });
    }
    res.status(200).send({ success, score });
  });
});

app.post("/payment", (req, res) => {
  const body = {
    source: req.body.token.id,
    amount: req.body.amount,
    currency: "usd",
  };

  stripe.charges.create(body, (stripeErr, stripeRes) => {
    if (stripeErr) {
      res.status(500).send({ error: stripeErr });
    } else {
      res.status(200).send({ success: stripeRes });
    }
  });
});
