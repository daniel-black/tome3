// import { OL_URL } from "constants";
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
    const parsedQuery = AuthorSearchSchema.parse(query);
    const urlSearchParams = new URLSearchParams();
    urlSearchParams.append('q', parsedQuery.q);
    
    const url = new URL(`/search/authors.json?${urlSearchParams.toString()}`, OL_URL);
    const olResponse = await fetch(url.toString());

    if (!olResponse.ok) {
      res.status(olResponse.status).json({ error: olResponse.statusText });
    }

    const olResponseData = await olResponse.json();

    // parse the response data
    const parsedResponse = OlAuthorSearchResponseSchema.parse(olResponseData);

    res.status(200).json(parsedResponse);
  } catch (e) {
    res.status(400).json({ error: JSON.stringify(e) });
  }
}

const AuthorSearchSchema = z.object({
  q: z.string(),
});

export const OlAuthorSearchResponseSchema = z.object({
  numFound: z.number().nonnegative(),
  start: z.number().nonnegative(),
  numFoundExact: z.boolean(),
  docs: z.array(z.object({
    birth_date: z.string().nullish(),
    death_date: z.string().nullish(),
    key: z.string(),
    name: z.string(),
    top_subjects: z.array(z.string()).nullish(),
    top_work: z.string().nullish(),
    work_count: z.number().nonnegative(),
    type: z.string(),
  })),
});

type OlAuthorSearchResponse = z.infer<typeof OlAuthorSearchResponseSchema>;
export type AuthorDoc = Pick<OlAuthorSearchResponse, 'docs'>;

type AuthorSearchResponse = ErrorResponse | OlAuthorSearchResponse;