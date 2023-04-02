import { Express } from "express";
import { handleQuery } from "./endpoints/handleQuery";

export function routes(app: Express) {
  /**
   * @openapi
   * /v1/query:
   *   post:
   *     description: Provide a response to a query.
   *     requestBody:
   *       content:
   *         application/json:
   *          schema:  # Request body contents
   *           type: object
   *           properties:
   *            query:
   *              type: string
   *     responses:
   *       200:
   *         description: Return a generated completion.
   */
  app.post("/v1/query", handleQuery);

  /**
   * @openapi
   * /ping:
   *   get:
   *     description: ping endpoint
   *     responses:
   *       200:
   *         description: service is alive.
   */
  app.get("/ping", (_, res) => res.send("pong"));
}
