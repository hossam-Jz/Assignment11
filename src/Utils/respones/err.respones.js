export const errorRespones = async ({
  message = "Error",
  stausCode = 400,
  extra = undefined,
}) => {
  const error = new Error(
    typeof message === "string" ? message : message?.message,
  );
  Error.stausCode = stausCode;
  Error.extra = extra;
  return error;
};

export const NotFoundException = ({
  message = " Not Found",
  extra = undefined,
}) => {
  return errorRespones({ message, stausCode: 404, extra });
};
export const BadRequestException = ({
  message = "Bad Request",
  extra = undefined,
}) => {
  return errorRespones({ message, stausCode: 400, extra });
};
export const ConflictException = async ({
  message = "Conflict",
  extra = undefined,
}) => {
  return errorRespones({ message, statusCode: 409, extra });
};

export const UnauthorizedException = ({
  message = "Unauthorized",
  extra = undefined,
}) => {
  return errorRespones({ message, stausCode: 401, extra });
};

export const ForbiddenException = async ({
  message = "Forbidden",
  extra = undefined,
}) => {
  return errorResponse({ message, statusCode: 403, extra });
};

export const glopalHandelError = async (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  return res.status(statusCode).json({ message: err.message, stack: err.stack });
};
