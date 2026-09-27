export const successResponses = ({
  res,
  message = "Done",
  statusCode = 200,
  data,
}) => {
  return res.status(statusCode).json({ message, data });
};
