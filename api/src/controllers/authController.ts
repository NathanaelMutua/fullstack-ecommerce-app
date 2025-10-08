import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { usersTable } from "../db/usersSchema";
import { db } from "../db";
import { eq } from "drizzle-orm";
import jwt from "jsonwebtoken";

export const registerUSer = async (req: Request, res: Response) => {
  try {
    const data = req.cleanBody;
    data.password = await bcrypt.hash(data.password, 10);

    const [user] = await db.insert(usersTable).values(data).returning();

    // resetting the password so it is not displayed to the user
    // @ts-ignore
    user.password = undefined;

    res.status(200).json({ user });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Woops! Must be that spaghetti code" });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.cleanBody;

    const [user] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email));

    if (!user) {
      res.status(401).json({ error: "Authentication failed" });
      return;
    }

    const matchedPassword = await bcrypt.compare(password, user.password);

    if (!matchedPassword) {
      res.status(401).json({ error: "Authentication failed" });
      return;
    }

    const secretKey = process.env.SECRET_KEY;
    if (!secretKey) {
      // Handle the case where the SECRET_KEY is not defined
      throw new Error("Environment variable is not defined");
    }

    // creating a JWT token after user is authenticated
    const token = jwt.sign({ userId: user.id, role: user.role }, secretKey, {
      expiresIn: "2d",
    });

    // resetting the password so it is not displayed to the user
    // @ts-ignore
    user.password = undefined;

    res.status(200).json({ user, token });
  } catch (e) {
    // console.log(e);
    res.status(500).json({ message: "Woops! Must be that spaghetti code" });
  }
};
