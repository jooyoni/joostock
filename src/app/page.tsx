'use client';
import IPegrRankType from '@/types/pegrRankType';
import styles from './page.module.scss';
import { useEffect, useState } from 'react';
import Loading from '@/components/Loading/Loading';
import Logo from '@/components/Logo/Logo';
import Image from 'next/image';
import Header from '@/components/Header/Header';
import { axiosInstance } from './axios/axiosInstance';

export default function Home() {
  const [stocks, setStocks] = useState<IPegrRankType[]>();
  useEffect(() => {
    (async () => {
      const res = await axiosInstance.get('/api/stock/rank').then((res) => res.data);
      setStocks(res.data);
    })();
  }, []);

  function handleCopy(ticker: string) {
    navigator.clipboard.writeText(ticker);
  }
  return (
    <main className={styles.main}>
      <Header />
      {stocks ? (
        <table className={styles.stockTable}>
          <thead>
            <tr>
              <th>LOGO</th>
              <th>NAME</th>
              <th>TICKER</th>
              <th>PEGR</th>
              <th>PER</th>
            </tr>
          </thead>
          <tbody>
            {stocks.map((stock) => (
              <tr key={stock.ticker} className={styles.stockRow} onClick={() => handleCopy(stock.ticker)}>
                <td>
                  <div className={styles.logoWrap}>
                    <Image
                      src={stock.logoUrl}
                      alt='logo'
                      priority
                      style={{ objectFit: 'contain' }}
                      fill
                      sizes={'50px'}
                    />
                  </div>
                </td>
                <td>{stock.companyName}</td>
                <td>{stock.ticker}</td>
                <td>{stock.pegr}</td>
                <td>{stock.per}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <Loading />
      )}
    </main>
  );
}
