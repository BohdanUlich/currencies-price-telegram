import { CRYPTO_LIST_TYPE, TOP_CRYPTO_MEME_TYPE, CryptoChannel, TOP_CRYPTO_TYPE } from '../types';

export const cryptoChannels: CryptoChannel[] = [
  {
    name: 'Top 30 crypto',
    id: '@top30cryptoprice',
    limit: 30,
    type: TOP_CRYPTO_TYPE,
    links: [
      { name: 'Best crypto prices', id: 'bestcryptoprices' },
      { name: 'Top meme coin prices', id: 'topmemecoinprices' },
      { name: 'Top 10 crypto prices', id: 'top10cryptoprice' },
      { name: 'Top 20 crypto prices', id: 'top20cryptoprice' },
    ],
  },
  {
    name: 'Top 20 crypto',
    id: '@top20cryptoprice',
    limit: 20,
    type: TOP_CRYPTO_TYPE,
    links: [
      { name: 'Best crypto prices', id: 'bestcryptoprices' },
      { name: 'Top meme coin prices', id: 'topmemecoinprices' },
      { name: 'Top 10 crypto prices', id: 'top10cryptoprice' },
      { name: 'Top 30 crypto prices', id: 'top30cryptoprice' },
    ],
  },
  {
    name: 'Top 10 crypto',
    id: '@top10cryptoprice',
    limit: 10,
    type: TOP_CRYPTO_TYPE,
    links: [
      { name: 'Best crypto prices', id: 'bestcryptoprices' },
      { name: 'Top meme coin prices', id: 'topmemecoinprices' },
      { name: 'Top 20 crypto prices', id: 'top20cryptoprice' },
      { name: 'Top 30 crypto prices', id: 'top30cryptoprice' },
    ],
  },
  {
    name: 'Best crypto prices',
    id: '@bestcryptoprices',
    limit: 100,
    type: CRYPTO_LIST_TYPE,
    links: [
      { name: 'Top meme coin prices', id: 'topmemecoinprices' },
      { name: 'Top 10 crypto prices', id: 'top10cryptoprice' },
      { name: 'Top 20 crypto prices', id: 'top20cryptoprice' },
      { name: 'Top 30 crypto prices', id: 'top30cryptoprice' },
    ],
    cryptoList: [
      'bitcoin',
      'ethereum',
      'litecoin',
      'cosmos',
      'polkadot',
      'cardano',
      'chainlink',
      'ethereum-classic',
      'binancecoin',
      'the-open-network',
    ],
  },
  {
    name: 'Top meme coin prices',
    id: '@topmemecoinprices',
    limit: 20,
    type: TOP_CRYPTO_MEME_TYPE,
    links: [
      { name: 'Best crypto prices', id: 'bestcryptoprices' },
      { name: 'Top 10 crypto prices', id: 'top10cryptoprice' },
      { name: 'Top 20 crypto prices', id: 'top20cryptoprice' },
      { name: 'Top 30 crypto prices', id: 'top30cryptoprice' },
    ],
  },
];
