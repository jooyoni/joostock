export default interface IPortfolioType {
  portfolio: {
    ticker: string;
    name: string;
    unitPrice: number;
    count: number;
    nowPrice: number;
  }[];
}
