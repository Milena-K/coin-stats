type Coins = {
  status: string,
  data: {
    stats: {
      total: number,
      totalCoins: number,
      totalMarkets: number,
      totalExchanges: number,
      totalMarketCap: string,
      total24hVolume: string,
    },
    coins: Coin[]
  }
}

type Coin = {
  uuid: string,
  symbol: string,
  name: string,
  color: string,
  iconUrl: string,
  marketCap: string,
  price: string,
  btcPrice: string,
  listedAt: number,
  change: string,
  rank: number,
  sparkline: string[],
  coinrankingUrl: string,
  "24hVolume": string,
}
