import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("Authorization");

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

    req.userId = decoded.userId;
    req.role = decoded.role;
    next();
  } catch (e) {
    // console.log(e);
    res.status(500).json({ message: "Woops! Must be that spaghetti code" });
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
