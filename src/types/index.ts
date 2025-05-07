export const TOP_CRYPTO_TYPE = 'TOP_CRYPTO_TYPE';
export const CRYPTO_LIST_TYPE = 'CRYPTO_LIST_TYPE';
export const TOP_CRYPTO_MEME_TYPE = 'TOP_CRYPTO_MEME_TYPE';
export const CURRENCY_TYPE = 'CURRENCY_TYPE';

type CryptoChannelType =
  | typeof TOP_CRYPTO_TYPE
  | typeof CRYPTO_LIST_TYPE
  | typeof TOP_CRYPTO_MEME_TYPE;

export interface CryptoChannel {
  name: string;
  id: string;
  limit: number;
  type: CryptoChannelType;
  cryptoList?: string[];
  links?: ChannelLink[];
}

export interface ChannelLink {
  name: string;
  id: string;
}

export interface CryptoCurrency {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
  market_cap: number;
  market_cap_rank: number;
}
