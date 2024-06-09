import { NextApiRequest } from 'next';
import cheerio from 'cheerio';
import axios from 'axios';

export async function GET(req: NextApiRequest) {
  const HTML = await axios.get(
    'https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=0&ie=utf8&query=%ED%99%98%EC%9C%A8'
  );
  const $ = cheerio.load(HTML.data);
  const exchangeRate = Number($('.excr_box input#num[data-value=up]').attr('value')?.replace(/,/g, ''));
  return Response.json({
    exchangeRate,
  });
}
