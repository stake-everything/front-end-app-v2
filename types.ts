interface coinInfoT{
    apy?: number,
    apr?: number,
    tag: string,
    token_earned: string,
    url: string,
    return?: number,
    site: string,
  }
  
interface coinDataIndT{
    image_uri?: string,
    info: coinInfoT[]
  }

interface coinDataT{
  [index: string]: coinDataIndT
}

interface histDataCoinT{
     [index: string]: number[][]
}

interface histDataT{
    [index: string]: histDataCoinT
}

export type { coinDataT, histDataT, histDataCoinT, coinInfoT };