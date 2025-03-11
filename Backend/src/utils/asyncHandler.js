const asyncHandler = (handler) => {
  return (req, res, next) =>
    Promise.resolve(handler(req, res, next)).catch((error) => {
      res
        .status(500)
        .json({ message: error.message, status: false, error: true });
    });
};

module.exports = asyncHandler;
