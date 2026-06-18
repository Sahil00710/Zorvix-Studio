import { sendValidationError } from "../utils/response.js";

export function validateRequest(schema, target = "body") {
  return function validationMiddleware(req, res, next) {
    const payload = req[target] ?? {};
    const result = schema.safeParse(payload);

    if (!result.success) {
      const errors = result.error.issues.map((issue) => ({
        path: issue.path.join("."),
        message: issue.message,
      }));

      return sendValidationError(res, errors);
    }

    req.validated = req.validated ?? {};
    req.validated[target] = result.data;
    return next();
  };
}
