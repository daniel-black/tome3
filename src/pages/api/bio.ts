// API endpoint for CRUD operations on the user bio

import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from 'lib/prisma';
import { getToken } from 'next-auth/jwt';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case 'GET':
      readBio(req, res);
      // res.json({msg: 'GET'});
      break;
    case 'POST':
      res.json({msg: 'POST'});
      break;
    default:
      res.status(400).json({ msg: `${req.method} is an invalid request method` });
      break;
  }
}

async function readBio(req: NextApiRequest, res: NextApiResponse) {
  const token = await getToken({ req, secret: process.env.SECRET });
  if (!token) res.status(400).json({ msg: 'no token' });

  const bio = await prisma.user.findFirst({
    where: { id: token?.sub },
    select: { bio: true },
  });
  
  res.json(bio);
}