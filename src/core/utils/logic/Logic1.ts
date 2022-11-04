import { StockPriceDetails } from 'src/core/common/report/models/StockPriceDetails';
import { sortByKey } from '../SortByKey';

export const logic1 = (
  stockPrices: StockPriceDetails[],
  comparisonDifference: number,
): StockPriceDetails[] => {
  const stockPriceLength: number = stockPrices.length;
  let i: number = comparisonDifference;
  let totalProfit = 0;

  while (i < stockPriceLength) {
    let enteredTrade = false;
    let previousPrices: StockPriceDetails[] = stockPrices.slice(
      i - comparisonDifference,
      i,
    );

    let currentPrice: StockPriceDetails = stockPrices[i];
    let lowPrice = 0;

    if (currentPrice.high > sortByKey(previousPrices, 'high')[0].high)
      enteredTrade = true;

    if (enteredTrade) {
      const buyPrice: number =
        sortByKey(previousPrices, 'high')[0].high * 1.002;
      currentPrice.buy = buyPrice;

      while (enteredTrade) {
        if (
          currentPrice.low <
          sortByKey(previousPrices, 'low')[previousPrices.length - 1].low
        )
          enteredTrade = false;

        if (enteredTrade) {
          currentPrice = stockPrices[++i];
          previousPrices = stockPrices.slice(i - comparisonDifference, i);

          if (
            !currentPrice ||
            currentPrice.low <
              sortByKey(previousPrices, 'low')[previousPrices.length - 1].low
          ) {
            enteredTrade = false;
            lowPrice = sortByKey(previousPrices, 'low')[
              previousPrices.length - 1
            ].low;
          }
        }
      }

      if (currentPrice) {
        const sellPrice: number = lowPrice * 0.998;
        const profit: number = sellPrice - buyPrice;
        totalProfit = totalProfit + profit;

        stockPrices[i].sell = sellPrice;
        stockPrices[i].profit = profit;
        stockPrices[i].totalProfit = totalProfit;
      }
    }

    i++;
  }
  return stockPrices;
};
