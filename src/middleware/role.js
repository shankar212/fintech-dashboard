const roleAuth = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ status: "error", message: "User not authenticated" });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ 
        status: "error", 
        message: "Forbidden: You do not have the required permissions to perform this action" 
      });
    }

    next();
  };
};

module.exports = roleAuth;
