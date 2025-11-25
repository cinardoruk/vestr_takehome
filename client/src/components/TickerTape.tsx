import { BiSolidUpArrow, BiSolidDownArrow } from "react-icons/bi";

function TickerTape() {
  interface TickerItem {
    symbol: string;
    price: number;
    arrow: string;
    pct: number;
  }
  const tickers: TickerItem[] = [
    {
      symbol: "SPX",
      price: 5301.56,
      arrow: "up",
      pct: 5.11,
    },
    {
      symbol: "AAPL",
      price: 178.23,
      arrow: "up",
      pct: 2.34,
    },
    {
      symbol: "GOOGL",
      price: 142.87,
      arrow: "down",
      pct: -1.45,
    },
    {
      symbol: "MSFT",
      price: 421.56,
      arrow: "up",
      pct: 1.87,
    },
    {
      symbol: "TSLA",
      price: 245.12,
      arrow: "down",
      pct: -3.22,
    },
    {
      symbol: "NVDA",
      price: 892.45,
      arrow: "up",
      pct: 4.56,
    },
    {
      symbol: "AMZN",
      price: 178.9,
      arrow: "up",
      pct: 0.98,
    },
    {
      symbol: "META",
      price: 487.33,
      arrow: "down",
      pct: -0.67,
    },
  ];

  return (
    <div className="flex mt-2">
      {tickers.map((item, index) => {
        return (
          <div key={index} className="flex items-center gap-1 me-5">
            <div>{item.symbol}</div>
            <div>{item.price}</div>
            {item.arrow === "up" ? (
              <BiSolidUpArrow className="text-green-500" />
            ) : (
              <BiSolidDownArrow className="text-red-500" />
            )}
            <div className={item.pct > 0 ? "text-green-500" : "text-red-500"}>
              {item.pct}%
            </div>
          </div>
        );
      })}
    </div>
  );
}
export default TickerTape;
