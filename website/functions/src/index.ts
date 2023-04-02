import * as Sentry from "@sentry/node";
import * as Tracing from "@sentry/tracing";
import cors from "cors";
import express from "express";
import { rateLimit } from "express-rate-limit";
import * as functions from "firebase-functions";
import { routes } from "./routes";
import { swagger } from "./swagger";

const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 60,
  standardHeaders: true,
  legacyHeaders: false,
});

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  integrations: [new Sentry.Integrations.Http({ tracing: true }), new Tracing.Integrations.Express({ app })],
  tracesSampleRate: 1.0,
});

app.use(limiter);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());

routes(app);
swagger(app);

app.use(Sentry.Handlers.errorHandler());

const api = functions.https.onRequest(app);

module.exports = { api };
