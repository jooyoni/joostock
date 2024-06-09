import { NextApiRequest } from 'next';
import cheerio from 'cheerio';
import IPegrRankType from '@/types/pegrRankType';
import axios from 'axios';

let cacheData: IPegrRankType[] = [];
let lastFetchTime = new Date().getTime();
export async function GET(req: NextApiRequest) {
  const refetch = new Date().getTime() - lastFetchTime > 1000 * 60 * 5 || !cacheData.length;
  const PEGR_RANK_ARRAY: IPegrRankType[] = [];
  const PEGR_RANK_HTML = await axios.get('https://www.marketbeat.com/market-data/low-pe-growth-stocks/');
  const $ = cheerio.load(PEGR_RANK_HTML.data);
  if (refetch) {
    $('.scroll-table tbody tr:not(.bottom-sort)').map((idx, tr) => {
      let logoUrl: string | undefined = '';
      let ticker: string = '';
      let companyName: string = '';
      let per: string = '';
      let pegr: string = '';
      $(tr)
        .find('td')
        .map((idx, td) => {
          //0: 회사이름, 2: PER, 3: PEGR,
          if (idx === 0) {
            logoUrl = $(td).find('.company-thumbnail img').attr('src');
            ticker = $(td).find('.ticker-area').text().trim();
            companyName = $(td).find('.title-area').text().trim();
          } else if (idx === 2) per = $(td).text().trim();
          else if (idx === 3) pegr = $(td).text().trim();
        });
      PEGR_RANK_ARRAY.push({
        logoUrl,
        ticker,
        companyName,
        per,
        pegr,
      });
    });
    cacheData = PEGR_RANK_ARRAY;
  }
  return Response.json(
    {
      data: cacheData,
    },
    { status: 200 }
  );
}
