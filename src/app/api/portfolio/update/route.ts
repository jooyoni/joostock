import { NextApiRequest } from 'next';
import { promises as fs } from 'fs';
import IPortfolioType from '@/types/portfolioType';
import axios from 'axios';
import cheerio from 'cheerio';

export async function GET(req: NextApiRequest) {
  const path = process.cwd() + '/src/app/data/portfolio.json';
  const file = await fs.readFile(path, 'utf8');
  const data: IPortfolioType = JSON.parse(file);

  const updateFunctions = data.portfolio.map(async (stock) => {
    const HTML = await axios.get(`https://finance.yahoo.com/quote/${stock.ticker}/`);
    const $ = cheerio.load(HTML.data);
    return Number($('.livePrice > span').text());
  });
  const result = await Promise.all(updateFunctions);
  data.portfolio = data.portfolio.map((stock, index) => ({
    ...stock,
    nowPrice: result[index],
  }));
  fs.writeFile(path, JSON.stringify(data));
  return Response.json(data);
}
