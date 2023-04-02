import { Express } from "express";
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Omnissiah API",
      version: "1.0.0",
    },
  },
  apis: [process.env.NODE_ENV === "development" ? "./src/routes*.ts" : "./build/routes*.js"],
};

export function swagger(app: Express) {
  const swaggerSpec = swaggerJSDoc(options);
  app.use("/api-docs", swaggerUi.serve);
  app.get("/api-docs", swaggerUi.setup(swaggerSpec));
}
