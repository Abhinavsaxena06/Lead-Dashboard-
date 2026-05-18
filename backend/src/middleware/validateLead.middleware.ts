import { NextFunction, Request, Response } from "express";

const allowedStatus = ["New", "Contacted", "Qualified", "Lost"];
const allowedSource = ["Website", "Instagram", "Referral"];

export const validateLead = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { name, email, status, source } = req.body;

  if (!name || !email || !source) {
    res.status(400).json({
      success: false,
      message: "Name, email and source are required"
    });
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    res.status(400).json({
      success: false,
      message: "Please provide a valid email address"
    });
    return;
  }

  if (status && !allowedStatus.includes(status)) {
    res.status(400).json({
      success: false,
      message: "Invalid lead status"
    });
    return;
  }

  if (!allowedSource.includes(source)) {
    res.status(400).json({
      success: false,
      message: "Invalid lead source"
    });
    return;
  }

  next();
};