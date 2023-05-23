// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from "@prisma/client";

type Data = {
  name: string
  
}

// export default function handler(
//   req: NextApiRequest,
//   res: NextApiResponse<Data>
// ) {
//   res.status(200).json({ name: 'John Doe' })
// }

// const prisma = new PrismaClient();

// export default async (req:any, res:any, slug : string) => {
//   const data = req.body;
//   try {
//     const result = await prisma.restaurant.findMany();
//     // const slugson = await prisma.restaurant.findUnique({
//     //   where: {
//     //     slug ,
//     //    }
//     // })
//     res.status(200).json(result);
//     // res.status(200).json(slugson);
//   } catch (err) {
//     console.log(err);
//     res.status(403).json({ err: "Error occured." });
//     // res.status(403).json({ err: "Error occured on slug." });
//   }
// };