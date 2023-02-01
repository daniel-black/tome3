import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";
import { ErrorResponse } from "./search";

const OL_URL = 'https://openlibrary.org';

export default async function(
  req: NextApiRequest,
  res: NextApiResponse<RatingsResponse>
) {
  const { method, query } = req;
  if (method !== 'GET') {
    res.status(400).json({ error: `Method [${method}] not allowed. Try a [GET] request` });
  }
  if (Object.keys(query).length === 0) {
    res.status(400).json({ error: 'Please provider search parameters on your request' });
  }

  try {
    const parsedQuery = RatingsSchema.parse(query);
    
    const url = new URL(`/works/${parsedQuery.workKey}/ratings.json?`, OL_URL);
    const olResponse = await fetch(url.toString());

    if (!olResponse.ok) {
      res.status(olResponse.status).json({ error: olResponse.statusText });
    }

    const olResponseData = await olResponse.json();

    // parse the response data
    const parsedResponse = OlRatingsResponseSchema.parse(olResponseData);

    res.status(200).json(parsedResponse);
  } catch (e) {
    res.status(400).json({ error: JSON.stringify(e) });
  }
}

const RatingsSchema = z.object({
  workKey: z.string(),
});

export const OlRatingsResponseSchema = z.object({
  counts: z.object({
    '1': z.number().nonnegative(),
    '2': z.number().nonnegative(),
    '3': z.number().nonnegative(),
    '4': z.number().nonnegative(),
    '5': z.number().nonnegative(),
  }),
  summary: z.object({
    average: z.number().nonnegative(),
    count: z.number().nonnegative(),
    sortable: z.number().nonnegative(),
  }),
});

type OlRatingsResponse = z.infer<typeof OlRatingsResponseSchema>;

type RatingsResponse = ErrorResponse | OlRatingsResponse;