import { NextApiRequest, NextApiResponse } from "next";

import jwt from "jsonwebtoken";
import prisma from "@/lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse){
    const bearerToken = req.headers["authorization"] as string;
    const token = bearerToken.split(" ")[1];
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