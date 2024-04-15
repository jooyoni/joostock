import axios from 'axios';
import { NextApiRequest } from 'next';
import cheerio from 'cheerio';
import IPegrRankType from '@/types/pegrRankType';
let data = 0;
export async function GET(req: NextApiRequest) {
  const PEGR_RANK_ARRAY: IPegrRankType[] = [];
  const PEGR_RANK_HTML = await axios.get('https://www.marketbeat.com/market-data/low-pe-growth-stocks/');
  const $ = cheerio.load(PEGR_RANK_HTML.data);
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
  return Response.json(
    {
      data: PEGR_RANK_ARRAY,
    },
    { status: 200 }
  );
}
