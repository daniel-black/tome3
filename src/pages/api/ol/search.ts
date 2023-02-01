// import { OL_URL } from "constants";
import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";

const OL_URL = 'https://openlibrary.org';


export default async function(
  req: NextApiRequest,
  res: NextApiResponse<SearchResponse>
) {
  const { method, query } = req;
  if (method !== 'GET') {
    res.status(400).json({ error: `Method [${method}] not allowed. Try a [GET] request` });
  }
  if (Object.keys(query).length === 0) {
    res.status(400).json({ error: 'Please provider search parameters on your request' });
  }

  try {
    const parsedQuery = SearchQueryParamsSchema.parse(query);
    if (Object.keys(parsedQuery).length === 0) {
      res.status(400).json({ error: 'Please provider search parameters on your request' });
    }

    const qs = buildQueryString(parsedQuery);
    const url = new URL(`/search.json${qs}`, OL_URL);

    const olResponse = await fetch(url.toString());

    if (!olResponse.ok) {
      res.status(olResponse.status).json({ error: olResponse.statusText });
    }

    const olResponseData = await olResponse.json();

    // parse the response data
    const parsedResponse = OlSearchResponseSchema.parse(olResponseData);


    res.json(parsedResponse);
  } catch (e) {
    res.status(400).json({ error: JSON.stringify(e) });
  }
}

export const SearchQueryParamsSchema = z.object({
  q: z.string().nullish(),
  author: z.string().nullish(),
  title: z.string().nullish(),
});
type SearchQueryParams = z.infer<typeof SearchQueryParamsSchema>;

export type ErrorResponse = { error: string };
type SearchResponse = ErrorResponse | OlSearchResponse;

export const OlSearchResponseSchema = z.object({
  numFound: z.number().nonnegative(),
  start: z.number().nonnegative(),
  numFoundExact: z.boolean(),
  docs: z.array(z.object({
    key: z.string(),
    type: z.string(),
    title: z.string(),
    subtitle: z.string().nullish(),
    id_amazon: z.array(z.string()).nullish(),
    cover_i: z.number().nonnegative().nullish(),
    author_key: z.array(z.string()),
    author_name: z.array(z.string()),
    isbn: z.array(z.string()).nullish(),
  })),
});

type OlSearchResponse = z.infer<typeof OlSearchResponseSchema>;
type Doc = Pick<OlSearchResponse, 'docs'>;


function buildQueryString(params: SearchQueryParams) {
  const keyValuePairs = Object.entries(params);
  const queryString = keyValuePairs.reduce((acc, [key, val], i) => {
    const separator = i === 0 ? '?' : '&';
    return acc + separator + key + '=' + val;
  }, '');
  return queryString + '&limit=10&fields=key,type,title,subtitle,author_name,author_key,id_amazon,cover_i,isbn';
}