import { NextApiRequest, NextApiResponse } from "next";
import * as jose from "jose";
import jwt from "jsonwebtoken";
import prisma from "@/lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse){
    const bearerToken = req.headers["authorization"] as string;

    if(!bearerToken){
        res.status(401).json({
            errorMessage: "Unauthorized request",
        });
    }

    const token = bearerToken.split(" ")[1]

    if(!token){
        res.status(401).json({
            errorMessage: "Unauthorized request",
        });
    }

    const secret = new TextEncoder().encode(process.env.JWT_SECRET)

    try {
        await jose.jwtVerify(token, secret)
    } catch (error) {
        res.status(401).json({
            errorMessage: "Unauthorized request",
        });
    }

    const payload = jwt.decode(token) as {email: string};

    if(!payload.email){
        res.status(401).json({
            errorMessage: "Unauthorized request",
        });
    }

    const user = prisma.user.findUnique({
        where:{
            email: payload.email
        },
        select:{
            id: true,
            first_name: true,
            email: true,
            city: true,
            phone: true
        }
    })

    return res.json({user});
}