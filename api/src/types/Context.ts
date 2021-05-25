import { Request, Response } from "express";

export interface Context {
  req: Request;
  res: Response;
  payload?: { userId: string };
  session?: { userId: string };
}
