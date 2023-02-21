
import { Request, Response, NextFunction } from 'express';
import { serverError } from 'exception-handler';
import { hostname } from 'os';
import { version, name } from './../../../package.json';;
import { logger } from '../../config/logger.config'

export class HealthController {
  public static async health(_request: Request, response: Response, next: NextFunction) {
    try {
      response.status(200).json({ status: 'up', name, version, hostName: hostname(), message: 'version 2', message2: 'version 3' });
    } catch (error) {
      logger.error(error);
      next(serverError());
    }
  }
}
