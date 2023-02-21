import express from "express";
import mongoose from "mongoose";
import { logger } from "./config/logger.config";
import { MainRoute } from "./api/routes/main.routes";
import { middlewares } from "./middlewares/request.middleware";

// import * as dotenv from "dotenv";
// dotenv.config({ path: ".env" });

export class App {
  public app: express.Application;

  constructor() {
    logger.info("creating app instance");
    this.app = express();
    this.app.use(middlewares);
    this.app.use("", MainRoute.register());
  }

  setupDatabase() {
    // createConnection({ type: "mongodb", url: "mongodb://localhost:27017/test", entities: ["dist/src/**/*.entity.js"], useUnifiedTopology: true })
    //   .then(async (c) => {
    //     logger.info("Database connection successful, connection status: " + c.isConnected);
    //     const repo = c.getRepository(Device);
    //     const device = new Device();
    //   })
    //   .catch((error) => logger.error({ error }));

    return mongoose.connect(
      process.env.MONGODB_URI ?? "mongodb://127.0.0.1:27017/myapp",
      { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true ,useFindAndModify : false},
      (err) => {
        if (err) {
          logger.debug({ message: "Mongodb connection error", err });
          process.exit(1);
        } else {
          logger.debug(process.env.MONGODB_URI);
          logger.debug("Database Connection Successful");
        }
      }
    );
  }
}
