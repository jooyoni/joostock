'use client';
import IPegrRankType from '@/types/pegrRankType';
import styles from './page.module.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Loading from '@/components/Loading/Loading';
import Logo from '@/components/Logo/Logo';

export default function Home() {
  const [stocks, setStocks] = useState<IPegrRankType[]>();
  useEffect(() => {
    (async () => {
      const res = await axios.get('/api/stock/rank').then((res) => res.data);
      setStocks(res.data);
    })();
  }, []);
  return (
    <main className={styles.main}>
      <Logo />
      {stocks ? (
        <ul>
          {stocks.map((stock) => (
            <li key={stock.ticker}>{stock.companyName}</li>
          ))}
        </ul>
      ) : (
        <Loading />
      )}
    </main>
  );
}
