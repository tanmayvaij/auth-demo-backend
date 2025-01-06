import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      user: Object;
    }
  }
}

export const validateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("authtoken");

  if (!token) return res.json({ status: false, message: "Invalid token" });

  try {
    const user = verify(token, process.env.JWT_SECRET as string);
    req.user = user;
    next();
  } catch (err) {
    return res.json({ status: false, message: "Invalid token" });
  }
};
