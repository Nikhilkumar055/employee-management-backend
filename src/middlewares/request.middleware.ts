
import { Request, Response, NextFunction } from "express";
import { db } from "./../config/database.config";
import { serverError } from "exception-handler";
import { requestHeader } from "./../responses/all-constants.response.json";
import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import helmet from "helmet";
import compression from "compression";
import { LoggerStream, logger, requestLogger } from "node-aop";
import { languageCheckUp } from "./../middlewares/language.middleware";
import cookieParser from "cookie-parser";
import cors from "cors";

export enum RequestStatus {
  processing = "PROCESSING",
  processed = "PROCESSED"
}
export interface ResponseData {
  status: RequestStatus;
  body?: any;
  code?: number;
}

export const middlewares = [
  compression(),
  helmet(),
  cors(),
  languageCheckUp,
  // verifyRequestHeader,
  bodyParser.json({ limit: "50mb" }),
  bodyParser.urlencoded({ extended: false }),
  cookieParser(),
  morgan(
    'Input Request:remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" req-Id: :req[x-requested-with] :status :res[content-length] ":referrer" ":user-agent"',
    {
      stream: new LoggerStream(requestLogger),
      skip: (req: express.Request, _res: express.Response) => {
        return req.url.includes("metrics");
      }
    }
  )
];

export function validateRequest(request: Request, response: Response, _next: NextFunction) {
  const request_id = request.header("x-requested-with");
  const version = request.baseUrl.split("/")[2];
  // logger.info('checking request parameter ');
  getResponseForRequestId(request_id ? request_id + request.method + version : "")
    .then((data: ResponseData) => {
      if (data.status === RequestStatus.processing) {
        // logger.info('Request is under process');
      } else {
        const body = JSON.parse(data.body);
        if (data.code) {
          response.status(data.code).json(body);
        } else {
          response.json(body);
        }
      }
    })
    .catch((_error) => {
      setFlagForRequestId(request_id ? request_id + request.method + version : "")
        .then((_) => {
          _next();
        })
        .catch((error) => {
          // logger.error({ error });
          throw error;
        });
    });
}

function getResponseForRequestId(request_id: string): Promise<any> {
  return new Promise((resolve, reject) => {
    // logger.info(`searching response for request _id : ${request_id} response`);
    db.get(request_id)
      .then((data) => resolve(JSON.parse(data ? data : "")))
      .catch((error) => reject(error));
  });
}

function setFlagForRequestId(request_id: string): Promise<any> {
  // logger.info('setting flag response for request id: ' + request_id);
  return new Promise((resolve, reject) => {
    const newRequest: ResponseData = {
      status: RequestStatus.processing
    };
    const requestData = JSON.stringify(newRequest);
    db.set(request_id, requestData, "ex", "3000")
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
}

export function verifyRequestHeader(request: Request, _response: Response, next: NextFunction) {
  const l = request.headers["content-language"];
  const requestId = request.header("x-requested-with");
  if (requestId) {
    return next();
  }
  next(serverError(l, requestHeader[l].without_header));
}
