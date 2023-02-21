import { Router } from "express";
import { logger } from "../../config/logger.config";
import { HealthController } from "../controllers/health.controller";
import { UserController } from "../controllers/user.controller";
import { guard } from "./../../middlewares/jwt-gaurd.middleware";

const tokenSecret = process.env.JWT_SECRET ?? "hellothere";

export class MainRoute {
  static register() {
    const router = Router();
    router.route("/api/v1/health").get(HealthController.health);

    router.route("/api/v1/:clientId/user").post( UserController.create);
    router.route("/api/v1/:clientId/user").get( UserController.getAll);
    router.route("/api/v1/:clientId/user/:_id").get( UserController.getOne);
    router.route("/api/v1/:clientId/user/:_id").put( UserController.update);
    router.route("/api/v1/:clientId/user/:_id").delete( UserController.delete);

    return router;
  }
}
