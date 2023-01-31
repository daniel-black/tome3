
import type { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';

const OL_COVERS_URL = 'https://covers.openlibrary.org';
const COVER_SIZE = ['S', 'M', 'L'] as const;
const COVER_TYPE = ['a', 'b'] as const;

export const CoverValidator = z.object({
  coverType: z.enum(COVER_TYPE),
  size: z.enum(COVER_SIZE),
  key: z.string(),
  value: z.string(),
});

export type CoverQueryParams = z.infer<typeof CoverValidator>;

export default function(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, query } = req;

  if (method !== 'GET') {
    res.status(400).json({ error: `Method [${method}] not allowed. Try a [GET] request` });
  }

  try {
    const q = CoverValidator.parse(query);
    const qs = `/${q.coverType}/${q.key}/${q.value}-${q.size}.jpg`;
    const url = new URL(qs, OL_COVERS_URL);
    
  } catch (e) {
    res.status(400).json(e);
  }
}
