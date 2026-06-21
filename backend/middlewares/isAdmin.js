const isAdmin = (req, res, next) => {
  if(req.user.role !== "admin"){

    return res.status(403).json({
      success: false,
      message: "access denied . Admin only",
    });
  }

  next();
};

export default isAdmin;