import IPortfolioType from '@/types/portfolioType';
import PortfolioClient from './Portfolio';
import { axiosInstance } from '../axios/axiosInstance';

export default async function Portfolio() {
  const data: IPortfolioType = await axiosInstance.get('/api/portfolio').then((res) => res.data);
  const exchangeRate = await axiosInstance.get('/api/exchange-rate').then((res) => res.data.exchangeRate);
  return <PortfolioClient data={data} exchangeRate={exchangeRate} />;
}
