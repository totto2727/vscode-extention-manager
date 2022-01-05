import axios from 'axios'

import type { Response, Result } from '@/types/market-place'

const URL =
  'https://marketplace.visualstudio.com/_apis/public/gallery/extensionquery'

export const queryMarketPlace: (
  search: string,
  pageNumber: number,
  pageSize: number,
) => Promise<Result> = async (search, pageSize, pageNumber) => {
  const res = await axios.post<Response>(
    URL,
    {
      filters: [
        {
          criteria: [
            {
              filterType: 8,
              value: 'Microsoft.VisualStudio.Code',
            },
            {
              filterType: 10,
              value: search,
            },
          ],
          pageNumber: pageNumber,
          pageSize: pageSize,
          sortBy: 0,
          sortOrder: 0,
        },
      ],
      assetTypes: [],
      flags: 0,
    },
    {
      headers: {
        'content-type': 'application/json',
        accept: 'application/json;api-version=7.1-preview.1',
        'accept-encoding': 'gzip',
      },
    },
  )
  return res.data.results[0]
}

/**
POST https://marketplace.visualstudio.com/_apis/public/gallery/extensionquery HTTP/1.1
content-type: application/json
accept: application/json;api-version=3.0-preview.1
accept-encoding: gzip

{
  filters: [
    {
      criteria: [
        {
          filterType: 8,
          value: "Microsoft.VisualStudio.Code"
        },
        {
          filterType: 10,
          value: "Python"
        }
      ],
      pageNumber: 1,
      pageSize: 100,
      sortBy: 0,
      sortOrder: 0
    }
  ],
  assetTypes: [],
  flags: 0
}
 */
