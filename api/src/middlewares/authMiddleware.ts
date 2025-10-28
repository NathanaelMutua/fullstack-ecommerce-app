import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.header("Authorization") || "";
  const token = authHeader.startsWith("Bearer ")
    ? authHeader.slice(7).trim()
    : authHeader.trim();

  if (!token) {
    res.status(401).json({ error: "Access denied" });
    return;
  }
  const secretKey = process.env.SECRET_KEY;
  if (!secretKey) {
    // Handle the case where the SECRET_KEY is not defined
    throw new Error("Environment variable is not defined");
  }

  try {
    // decode jwt data
    const decoded = jwt.verify(token, secretKey);

    if (typeof decoded != "object" || !decoded?.userId) {
      res.status(401).json({ error: "Access denied" });
      return;
    }

    req.userId = (decoded as any).userId;
    req.role = (decoded as any).role;
    next();
  } catch (e: any) {
    const isAuthError =
      e?.name === "TokenExpiredError" || e?.name === "JsonWebTokenError";
    res.status(isAuthError ? 401 : 500).json({
      error: isAuthError ? "Invalid or expired token" : "Internal Server Error",
    });
  }
};

// verify that it is the seller performing an action
export const verifySeller = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const role = req.role;

  if (role != "seller") {
    res.status(401).json({ error: "Access denied" });
    return;
  }

  next();
};

// verify if the user logged in is an admin
export const verifyAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const role = req.role;

  if (role != "admin") {
    res.status(401).json({ error: "Access denied" });
    return;
  }

  next();
};
