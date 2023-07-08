function logErrors(error, req, res, next) {
  console.error("logError");
  console.error(error);
  next(error);
}

function errorHandLer(error, req, res, next) {
  console.error("errorHandler");
  res.status(500).json({
    message: error.message,
    stack: error.stack,
  });
}
function boomErrorHandLer(error, req, res, next) {
  console.error("BoomErrorHandler");
  if (error.isBoom) {
    const { output } = error;
    res.status(output.statusCode).json(output.payload);
  } else {
    next(error);
  }
}
module.exports = { logErrors, errorHandLer, boomErrorHandLer };
