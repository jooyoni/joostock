'use client';
import IPortfolioType from '@/types/portfolioType';
import Header from '@/components/Header/Header';
import styles from './Portfolio.module.scss';
import { useEffect, useState } from 'react';
import happy1 from '@/assets/happy/happy1.jpeg';
import happy2 from '@/assets/happy/happy2.jpeg';
import happy3 from '@/assets/happy/happy3.jpeg';
import happy4 from '@/assets/happy/happy4.jpeg';
import happy5 from '@/assets/happy/happy5.jpeg';
import sad1 from '@/assets/sad/sad1.jpeg';
import sad2 from '@/assets/sad/sad2.jpeg';
import sad3 from '@/assets/sad/sad3.jpeg';
import sad4 from '@/assets/sad/sad4.jpeg';
import sad5 from '@/assets/sad/sad5.jpeg';
import Image from 'next/image';

interface IPropsType {
  data: IPortfolioType;
  exchangeRate: number;
}
export default function PortfolioClient({ data, exchangeRate }: IPropsType) {
  // 총 투자 금액, 총 평가금액, 총 수익률, 보유 주식종류수
  const [totalData, setTotalData] = useState(
    (() => {
      const totalCount = data.portfolio.length;
      let totalInvestedValue = 0,
        totalMarketValue = 0,
        totalReturnRate = 0;
      data.portfolio.map((stock) => {
        totalInvestedValue += stock.unitPrice * stock.count;
        totalMarketValue += stock.nowPrice * stock.count;
      });
      totalReturnRate = Number(((totalMarketValue / totalInvestedValue) * 100 - 100).toFixed(2));
      return {
        totalInvestedValue: Math.floor(totalInvestedValue),
        totalMarketValue: Math.floor(totalMarketValue),
        totalReturnRate,
        totalCount,
      };
    })()
  );

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.contentsWrap}>
        <article className={styles.totalInfoWrap}>
          <p>
            I invested {totalData.totalInvestedValue.toLocaleString()}$ in U.S. stocks,
            <br />
            and now is ...
          </p>
          <h2>{totalData.totalReturnRate.toLocaleString()}%</h2>
          <span>
            {totalData.totalMarketValue.toLocaleString()}$ ({totalData.totalReturnRate > 0 && '+'}
            {(totalData.totalMarketValue - totalData.totalInvestedValue).toLocaleString()}$)
          </span>
          <Image
            src={
              totalData.totalReturnRate >= 40
                ? happy5
                : totalData.totalReturnRate >= 30
                ? happy4
                : totalData.totalReturnRate >= 20
                ? happy3
                : totalData.totalReturnRate >= 10
                ? happy2
                : totalData.totalReturnRate > 0
                ? happy1
                : totalData.totalReturnRate >= -8
                ? sad1
                : totalData.totalReturnRate >= -16
                ? sad2
                : totalData.totalReturnRate >= -24
                ? sad3
                : totalData.totalReturnRate >= -32
                ? sad4
                : sad5
            }
            alt='mood'></Image>
        </article>
        <article className={styles.totalStocksWrap}>
          <h3>Portfolio</h3>
          <ul>
            {(() => {
              const STOCK_LIST = [...data.portfolio].sort((a, b) => b.count * b.unitPrice - a.count * a.unitPrice);
              return STOCK_LIST.map((stock) => {
                const INVESTED_VALUE = stock.unitPrice * stock.count;
                const MARKET_VALUE = stock.nowPrice * stock.count;
                const RETURN_RATE = Number(((MARKET_VALUE / INVESTED_VALUE) * 100 - 100).toFixed(2));

                return (
                  <li key={stock.ticker}>
                    <div className={styles.stockInfoWrap}>
                      <span>{stock.ticker}</span>
                      <h4>{stock.name}</h4>
                    </div>
                    <div className={styles.priceInfoWrap}>
                      <span>Invested {Math.floor(INVESTED_VALUE).toLocaleString()}$</span>
                      <span>Now {Math.floor(MARKET_VALUE).toLocaleString()}$</span>
                      <span>
                        {RETURN_RATE > 0 && '+'}
                        {Math.floor(MARKET_VALUE - INVESTED_VALUE).toLocaleString()}$(
                        {RETURN_RATE.toLocaleString()}%)
                      </span>
                    </div>
                  </li>
                );
              });
            })()}
          </ul>
        </article>
      </div>
    </div>
  );
}
