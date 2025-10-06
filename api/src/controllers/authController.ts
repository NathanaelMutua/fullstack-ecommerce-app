import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { usersTable } from "../db/usersSchema";
import { db } from "../db";

export const registerUSer = async (req: Request, res: Response) => {
  try {
    const data = req.cleanBody;
    data.password = await bcrypt.hash(data.password, 10);

    const [user] = await db.insert(usersTable).values(data).returning();
    res.status(200).json({ user });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Something went wrong" });
  }
};
