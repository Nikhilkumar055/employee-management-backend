import { serverError } from 'exception-handler';
import { NextFunction, Request, Response } from 'express';
import { validateRequestBody } from 'node-aop';
import { UserService } from './../../services/user.service';
import { userCreation, userUpdate } from './../../validation/user.schema';
export class UserController {
  @validateRequestBody(userCreation)
  static async create(request: Request, response: Response, next: NextFunction): Promise<void> {
    try {
      const language: any = request.headers['content-lang'] ?? 'en';
      const result: any = await new UserService().create({ ...request.body ,clientId : request.params.clientId}, language);
      response.status(201).json(result);
    } catch (err) {
      const error = JSON.parse(err.message);
      next({ code: error.code, message: error.message, error: error.error });
    }
  }

  static async getAll(request: Request, response: Response, next: NextFunction): Promise<void> {
    try {
      const { limit = '0', page = '1' } = request.query;
      const l = parseInt(limit.toString());
      const p = parseInt(page.toString());
      const result = await new UserService().getAll( request.params.clientId , l, p);
      const users : any= await new UserService().getAll(request.params.clientId, 0, 0);
      response.status(200).json({ totalCount: users.length, page: Number(page) ?? 0, limit: Number(limit) ?? 0, data: result, totalUsers: users });
     
    } catch (err) {
      const e: any = err ?? serverError(null, '');
      const error = JSON.parse(err.message);
      next({ code: error.code, message: error.message, error: error.error });
    }
  }

  static async getOne(request: Request, response: Response, next: NextFunction): Promise<void> {
    try {
      const language: any = request.headers['content-lang'] ?? 'en';
      const result = await new UserService().getOne(request.params.clientId, request.params._id , language);
      response.json(result);
    } catch (err) {
      const e: any = err ?? serverError(null, '');
      const error = JSON.parse(err.message);
      next({ code: error.code, message: error.message, error: error.error });
    }
  }

  @validateRequestBody(userUpdate)
  static async update(request: Request, response: Response, next: NextFunction): Promise<void> {
    try {
      const language: any = request.headers['content-lang'] ?? 'en';
      const result = await new UserService().updateOne(request.params.clientId, request.params._id , request.body, language);
      response.json(result);
    } catch (err) {
      console.log({ err });

      const e: any = err ?? serverError(null, '');
      const error = JSON.parse(err.message);
      next({ code: error.code, message: error.message, error: error.error });
    }
  }

  static async delete(request: Request, response: Response, next: NextFunction): Promise<void> {
    try {
      const language: any = request.headers['content-lang'] ?? 'en';
      const result = await new UserService().delete(request.params.tenantId, request.params._id , language);
      response.json(result);
    } catch (err) {
      const e: any = err ?? serverError(null, '');
      const error = JSON.parse(err.message);
      next({ code: error.code, message: error.message, error: error.error });
    }
  }
}
