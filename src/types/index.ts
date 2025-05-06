export const TOP_CRYPTO_TYPE = "TOP_CRYPTO_TYPE";
export const CRYPTO_LIST_TYPE = "CRYPTO_LIST_TYPE";
export const CURRENCY_TYPE = "CURRENCY_TYPE";

type CryptoChannelType = typeof TOP_CRYPTO_TYPE | typeof CRYPTO_LIST_TYPE;

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
