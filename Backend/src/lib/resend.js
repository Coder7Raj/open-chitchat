import "dotenv/config";
import { Resend } from "resend";
// import { ENV } from "./env.js";

export const resendClient = new Resend(process.env.EMAIL_API_KEY);

export const sender = {
  email: process.env.EMAIL_FROM,
  name: process.env.EMAIL_NAME,
};
