import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";
import { ErrorResponse } from "./search";

const OL_URL = 'https://openlibrary.org';

export default async function(
  req: NextApiRequest,
  res: NextApiResponse<WorksResponse>
) {
  const { method, query } = req;
  if (method !== 'GET') {
    res.status(400).json({ error: `Method [${method}] not allowed. Try a [GET] request` });
  }
  if (Object.keys(query).length === 0) {
    res.status(400).json({ error: 'Please provider search parameters on your request' });
  }

  try {
    const parsedQuery = WorksSchema.parse(query);
    
    const url = new URL(`/works/${parsedQuery.workKey}.json?`, OL_URL);
    const olResponse = await fetch(url.toString());

    if (!olResponse.ok) {
      res.status(olResponse.status).json({ error: olResponse.statusText });
    }

    const olResponseData = await olResponse.json();

    // parse the response data
    const parsedResponse = OlWorksResponseSchema.parse(olResponseData);

    res.status(200).json(parsedResponse);
  } catch (e) {
    res.status(400).json({ error: JSON.stringify(e) });
  }
}

const WorksSchema = z.object({
  workKey: z.string(),
});

export const OlWorksResponseSchema = z.object({
  authors: z.array(z.object({
    author: z.object({ key: z.string() }),
    type: z.object({ key: z.string() }),
  })),
  covers: z.array(z.number().nonnegative()).nullish(),
  created: z.object({ type: z.string(), value: z.string() }),
  last_modified: z.object({ type: z.string(), value: z.string() }),
  description: z.object({ type: z.string(), value: z.string() }).nullish(),
  key: z.string(),
  title: z.string(),
});

type OlWorksResponse = z.infer<typeof OlWorksResponseSchema>;

type WorksResponse = ErrorResponse | OlWorksResponse;