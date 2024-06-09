import { NextApiRequest } from 'next';
import { promises as fs } from 'fs';
import { axiosInstance } from '@/app/axios/axiosInstance';

let lastFetchedTime = new Date().getTime();
export async function GET(req: NextApiRequest) {
  const now = new Date().getTime();
  // 최근 데이터 업데이트 시간이 1분 이상 지났다면 새로운 데이터 fetch
  if (now - lastFetchedTime >= 60000) {
    const data = await axiosInstance.get('/api/portfolio/update').then((res) => res.data);
    lastFetchedTime = new Date().getTime();
    return Response.json(data);
  }
  const path = process.cwd() + '/src/app/data/portfolio.json';
  const file = await fs.readFile(path, 'utf8');
  const data = JSON.parse(file);
  return Response.json(data);
}
