import morgan from "morgan";
import path from "path";
import helmet from "helmet";
import StatusCodes from "http-status-codes";
import express, { NextFunction, Request, Response } from "express";
import compression from "compression";
import axios from "axios";
import "express-async-errors";
import Stripe from 'stripe';
// const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2020-08-27',
});
// import BaseRouter  from "./routes";
import logger from "@shared/Logger";

const app = express();
const { BAD_REQUEST, INTERNAL_SERVER_ERROR, OK } = StatusCodes;

/************************************************************************************
 *                              Set basic express settings
 ***********************************************************************************/

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Show routes called in console during development
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Security
if (process.env.NODE_ENV === "production") {
  app.use(
    helmet({
      contentSecurityPolicy: false,
    })
  );
}
// Compression
app.use(compression());

/************************************************************************************
 *                              API
 ***********************************************************************************/
 type CartItem = {
  price: number;
  quantity: number;
};

app.post("/captcha", async (req: Request, res: Response) => {
  const secret = process.env.CAPTCHA_SECRET_KEY;
  const token = req.body.token;
  const verificationURL = `https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${token}&remoteip=${req.socket.remoteAddress}`;
  interface iCaptchaResponse {
    success: boolean;
    challenge_ts?: string;
    hostname?: string;
    score?: number;
    action?: string;
    "error-codes"?: string[];
  }
  try {
    const {data: body} = await axios.get(verificationURL);
    const errorCode = body["error-codes"] ? body["error-codes"][0] : null;
    const { success, score } = body;
    if (!success) {
      if (errorCode === "invalid-input-response") {
        return res
          .status(INTERNAL_SERVER_ERROR)
          .send({ error: "The Captcha token is invalid or malformed." });
      }
      return res.status(INTERNAL_SERVER_ERROR).send({
        error: "Failed to verify the Captcha, Please Try again later..",
      });
    }
    res.status(OK).send({ success, score });
  } catch (err) {
    res.status(INTERNAL_SERVER_ERROR).send({
      error: "Failed to verify the Captcha, Please Try again later..",
    });
  }
});



const calculateOrderAmount = (items: CartItem[]) => {
  const total = items.reduce(
    (previousPrice, { price: newPrice, quantity }) =>
      previousPrice + (newPrice * quantity),
    0
  );
  return total * 100;
};

app.post("/create-payment-intent", async (req: Request, res: Response) => {
  const { cartItems } = req.body;
  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(cartItems),
    currency: "usd",
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

// Print API errors
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  logger.err(err, true);
  return res.status(BAD_REQUEST).json({
    error: err.message,
  });
});

/************************************************************************************
 *                              Serve front-end content
 ***********************************************************************************/

const staticDir = path.join(__dirname, "client/build");
app.use(express.static(staticDir));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));
  app.get("*", (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}
app.use((req: Request, res: Response) => {
  res.status(BAD_REQUEST).end();
});

/************************************************************************************
 *                              Export Server
 ***********************************************************************************/

export default app;
