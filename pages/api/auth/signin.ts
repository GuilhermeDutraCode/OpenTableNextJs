import { NextApiRequest, NextApiResponse } from "next";
import validator from "validator";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
import * as jose from "jose";

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
      const userWithEmail = await prisma.user.findUnique({
        where: {
          email,
        }
      });
  
      if (!userWithEmail) {
        return res.status(401).json({ errorMessage: "User not found" });
      }
  
      // Check password validity
      const isMatch = await bcrypt.compare(password, userWithEmail.password);
      if (!isMatch) {
        return res.status(400).json({ errorMessage: "Invalid password" });
      }
  
      // User is authenticated
      const alg = "HS256";

      const jwtSecret = new TextEncoder().encode(process.env.JWT_SECRET);
      
      const token = await new jose.SignJWT({email: userWithEmail.email})
      .setProtectedHeader({alg})
      .setExpirationTime("24h")
      .sign(jwtSecret);
  
      return res.status(200).json({
          token,
      });
    }
    return res.status(404).json("Unknown endpoint")
  }