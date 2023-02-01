import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";
import { ErrorResponse } from "./search";

const OL_URL = 'https://openlibrary.org';

export default async function(
  req: NextApiRequest,
  res: NextApiResponse<AuthorSearchResponse>
) {
  const { method, query } = req;
  if (method !== 'GET') {
    res.status(400).json({ error: `Method [${method}] not allowed. Try a [GET] request` });
  }
  if (Object.keys(query).length === 0) {
    res.status(400).json({ error: 'Please provider search parameters on your request' });
  }

  try {
    const parsedQuery = WorksByAuthorSearchSchema.parse(query);
    
    const url = new URL(`/authors/${parsedQuery.authorKey}/works.json?fields=entries,size`, OL_URL);
    const olResponse = await fetch(url.toString());

    if (!olResponse.ok) {
      res.status(olResponse.status).json({ error: olResponse.statusText });
    }

    const olResponseData = await olResponse.json();

    // parse the response data
    const parsedResponse = OlWorksByAuthorSearchResponseSchema.parse(olResponseData);

    res.status(200).json(parsedResponse);
  } catch (e) {
    res.status(400).json({ error: JSON.stringify(e) });
  }
}

const WorksByAuthorSearchSchema = z.object({
  authorKey: z.string(),
});

export const OlWorksByAuthorSearchResponseSchema = z.object({
  size: z.number().nonnegative(),
  entries: z.array(z.object({
    covers: z.array(z.number().nullish()).nullish(),
    key: z.string(),
    title: z.string(),
  })),
});

type OlWorksByAuthorSearchResponse = z.infer<typeof OlWorksByAuthorSearchResponseSchema>;
export type Entry = Pick<OlWorksByAuthorSearchResponse, 'entries'>;

type AuthorSearchResponse = ErrorResponse | OlWorksByAuthorSearchResponse;