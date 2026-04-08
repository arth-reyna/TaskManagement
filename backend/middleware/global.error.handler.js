export const errorHandler = (err, req, res, next) => {
  // Ensure CORS headers are present on error responses
  res.header("Access-Control-Allow-Origin", req.headers.origin || "http://localhost:5173");
  res.header("Access-Control-Allow-Credentials", "true");

  const status = err.status || err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  return res.status(status).json({
    success: false,
    message,
  });
};
