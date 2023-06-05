import { NextApiRequest, NextApiResponse } from "next";
import validator from "validator";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
import * as jose from "jose";
import {setCookie} from "cookies-next";

export default async function signIn(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
      // Validate user input
      const { email, password } = req.body;
      const errors: string[] = [];
      const validationSchema = [
        {
          valid: validator.isEmail(email),
          errorMessage: "Email entered is not valid"
        },
        {
          valid: validator.isLength(password, {
            min: 1
          }),
          errorMessage: "Password entered is not valid"
        },
      ];
  
      validationSchema.forEach((check) => {
        if (!check.valid) {
          errors.push(check.errorMessage);
        }
      });
  
      if (errors.length) {
        return res.status(400).json({ errorMessage: errors[0] });
      }
  
      // Validate that the user has an account
      const user = await prisma.user.findUnique({
        where: {
          email,
        }
      });
  
      if (!user) {
        return res.status(401).json({ errorMessage: "Email or password and invalid" });
      }
  
      // Check password validity
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ errorMessage: "Invalid password" });
      }
  
      // User is authenticated
      const alg = "HS256";

      const jwtSecret = new TextEncoder().encode(process.env.JWT_SECRET);
      
      const token = await new jose.SignJWT({email: user.email})
      .setProtectedHeader({alg})
      .setExpirationTime("24h")
      .sign(jwtSecret);
      
      setCookie("jwt", token, {req, res, maxAge: 60 * 6 * 24})

      return res.status(200).json({
          firstName: user.first_name,
          lastName: user.last_name,
          email: user.email,
          phone: user.phone,
          city: user.city,
      });
    }
    return res.status(404).json("Unknown endpoint")
  }