const AppError = require('../utils/appError')

const restrictTo = (...roles) => {
    return (req, res, next) => {
      // console.log(roles, req.user.role, roles.includes(String(req.user.role)))
      if (!roles.includes(String(req.user.role))) {
        return next(
          new AppError('You do not have permission to perform this action', 403)
        );
      }
      // console.log("geldim restrict")
      next();
    };
};

module.exports = {restrictTo}