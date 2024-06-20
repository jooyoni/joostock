import { promises as fs } from 'fs';
import { axiosInstance } from '@/app/axios/axiosInstance';

let lastFetchedTime = new Date('2024-01-02').getTime();
export async function GET(req: Request) {
  const now = new Date().getTime();
  // 최근 데이터 업데이트 시간이 1분 이상 지났다면 새로운 데이터 fetch
  if (now - lastFetchedTime >= 60000) {
    const data = await axiosInstance
      .get('/api/portfolio/update', {
        headers: { 'Cache-Control': 'no-cache', Pragma: 'no-cache', Expires: '0' },
      })
      .then((res) => res.data);
    lastFetchedTime = new Date().getTime();
    return Response.json(data);
  } else {
    const path = process.cwd() + '/src/app/data/portfolio.json';
    const file = await fs.readFile(path, 'utf8');
    const data = JSON.parse(file);
    return Response.json(data);
  }
}
