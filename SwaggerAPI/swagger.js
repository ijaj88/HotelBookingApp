import swaggerUi from "swagger-ui-express";
import yamljs from "yamljs";
import express from "express";

const app = express();
const swaggerDocument = yamljs.load("./swagger.yaml");

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

