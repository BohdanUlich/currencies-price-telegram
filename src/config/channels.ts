import { CRYPTO_LIST_TYPE, CryptoChannel, TOP_CRYPTO_TYPE } from '../types';

export const cryptoChannels: CryptoChannel[] = [
  {
    name: 'Top 30 crypto',
    id: '@top30cryptoprice',
    limit: 30,
    type: TOP_CRYPTO_TYPE,
    links: [
      { name: 'Best crypto prices', id: 'bestcryptoprices' },
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
      { name: 'Top 20 crypto prices', id: 'top20cryptoprice' },
      { name: 'Top 30 crypto prices', id: 'top30cryptoprice' },
    ],
  },
  {
    name: 'Best crypto prices',
    id: '@bestcryptoprices',
    limit: 10,
    type: CRYPTO_LIST_TYPE,
    links: [
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
];
