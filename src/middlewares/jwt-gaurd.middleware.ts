import jsonwebtoken from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export const returnErrorMessage = (message = "Unauthorized", code = 401, error = "Unauthorized") => {
  return { message, code, error };
};
/**
 * JWT Guard Middleware :
 *
 *  The middleware checks the whether the requested user has the right permissions or not to
 * the respective route based on claims available in the access token passed in the header with key value "authorization" (Bearer Tokens are accepted)
 * @param  {string} secret
 * @param  {jsonwebtoken.VerifyOptions={complete:true}} token_options
 */
export const guard = (secret: string, feature_permission_combinations: string, token_options: jsonwebtoken.VerifyOptions = { complete: true }) => {
  return (request: Request, response: Response, next: NextFunction) => {
    const path = request.path;
    const params = request.params;
    let newPath = path;
    if (Object.keys(params).length >= 1) {
      Object.keys(params).forEach((key) => {
        newPath = newPath.replace(params[key], `:${key}`);
      });
    }

    const bearerToken = request.header("authorization");

    if (undefined === bearerToken) {
      const message = returnErrorMessage();
      return response.status(message.code).json(message);
    }

    const token = bearerToken.replace("Bearer ", "");
    let claims = {};
    try {
      const { payload }: any = jsonwebtoken.verify(token, secret, token_options);
      if (undefined === payload.claims) {
        const message = returnErrorMessage("Access Token Payload Does Not Contain The Claims Fields");
        return response.status(message.code).json(message);
      }
      claims = payload.claims;
      const claimIndex = Object.keys(claims).find((c) => c === feature_permission_combinations);
      if (undefined === claimIndex) {
        const message = returnErrorMessage();
        return response.status(message.code).json(message);
      }
      const claim: string[] = claims[claimIndex];

      let requiredClaim = "";

      switch (request.method.toLocaleLowerCase()) {
        case "delete":
          requiredClaim = "delete";
          break;
        case "post":
          requiredClaim = "create";
          break;
        case "put":
          requiredClaim = "update";
          break;
        default:
          requiredClaim = "view";
          break;
      }
      if (claim.includes("*")) return next();
      if (!claim.includes(requiredClaim)) {
        const message = returnErrorMessage();
        return response.status(message.code).json(message);
      }
    } catch (error) {
      const message = returnErrorMessage(error.message);
      return response.status(message.code).json(message);
    }

    next();
  };
};
