import axios from 'axios';
import { config } from '../config/config';
import { logger } from '../utils/logger';
import { CryptoCurrency } from '../types';

export class CoinGeckoClient {
  private readonly baseUrl: string;
  private readonly apiKey?: string;

  constructor() {
    this.baseUrl = config.coingeckoApiUrl;
  }

  /**
   * Get top cryptocurrencies by market cap
   * @param limit Number of cryptocurrencies to fetch
   * @returns Array of cryptocurrency data
   */
  async getTopCryptocurrencies(limit: number): Promise<CryptoCurrency[]> {
    const excludedIds = [
      'tether',
      'usd-coin',
      'wrapped-bitcoin',
      'staked-ether',
      'wrapped-steth',
      'usds',
      'binance-bridged-usdt-bnb-smart-chain',
      'weth',
      'ethena-usde',
      'cbeth',
      'wrapped-eeth',
      'susds',
      'susde',
      'ethena-staked-usde',
      'coinbase-wrapped-btc',
      'blackrock-usd-institutional-digital-liquidity-fund',
    ];
    const fetchLimit = limit + excludedIds.length;

    try {
      const params: Record<string, string | number> = {
        vs_currency: 'usd',
        order: 'market_cap_desc',
        per_page: fetchLimit,
        page: 1,
        price_change_percentage: '24h',
      };

      // Add API key if available
      if (this.apiKey) {
        params.x_cg_api_key = this.apiKey;
      }

      const response = await axios.get(`${this.baseUrl}/coins/markets`, {
        params,
      });

      if (response.status !== 200) {
        throw new Error(`CoinGecko API returned status ${response.status}`);
      }

      const filteredResponse = (response.data as CryptoCurrency[]).filter(
        (coin) => !excludedIds.includes(coin.id)
      );

      return filteredResponse.slice(0, limit);
    } catch (error) {
      logger.error(`Error fetching cryptocurrency data: ${error}`);

      // Handle rate limiting explicitly
      if (axios.isAxiosError(error) && error.response?.status === 429) {
        logger.error('CoinGecko API rate limit exceeded. Consider using an API key.');
      }

      return [];
    }
  }

  /**
   * Get cryptocurrency data by list of IDs
   * @param ids Array of cryptocurrency IDs
   * @returns Array of cryptocurrency data
   */
  async getCryptocurrenciesByIds(ids: string[]): Promise<CryptoCurrency[]> {
    try {
      const params: Record<string, string | number> = {
        vs_currency: 'usd',
        ids: ids.join(','),
        price_change_percentage: '24h',
      };

      // Add API key if available
      if (this.apiKey) {
        params.x_cg_api_key = this.apiKey;
      }

      const response = await axios.get(`${this.baseUrl}/coins/markets`, {
        params,
      });

      if (response.status !== 200) {
        throw new Error(`CoinGecko API returned status ${response.status}`);
      }

      return response.data as CryptoCurrency[];
    } catch (error) {
      logger.error(`Error fetching cryptocurrency data by IDs: ${error}`);

      // Handle rate limiting explicitly
      if (axios.isAxiosError(error) && error.response?.status === 429) {
        logger.error('CoinGecko API rate limit exceeded. Consider using an API key.');
      }

      return [];
    }
  }

  /**
   * Get top meme coins by market cap
   * @param limit Number of meme coins to fetch
   * @returns Array of meme coin data
   */
  async getTopMemeCoins(limit: number): Promise<CryptoCurrency[]> {
    try {
      const excludedIds = ['binance-peg-dogecoin'];
      const fetchLimit = limit + excludedIds.length;

      const params: Record<string, string | number> = {
        vs_currency: 'usd',
        category: 'meme-token',
        order: 'market_cap_desc',
        per_page: fetchLimit,
        page: 1,
        price_change_percentage: '24h',
      };

      // Add API key if available
      if (this.apiKey) {
        params.x_cg_api_key = this.apiKey;
      }

      const response = await axios.get(`${this.baseUrl}/coins/markets`, {
        params,
      });

      if (response.status !== 200) {
        throw new Error(`CoinGecko API returned status ${response.status}`);
      }

      const filteredResponse = (response.data as CryptoCurrency[]).filter(
        (coin) => !excludedIds.includes(coin.id)
      );

      return filteredResponse.slice(0, limit);
    } catch (error) {
      logger.error(`Error fetching meme coin data: ${error}`);

      if (axios.isAxiosError(error) && error.response?.status === 429) {
        logger.error('CoinGecko API rate limit exceeded. Consider using an API key.');
      }

      return [];
    }
  }

  /**
   * Check if the CoinGecko API is available/responsive
   * @returns Boolean indicating if the API is responding
   */
  async ping(): Promise<boolean> {
    try {
      const response = await axios.get(`${this.baseUrl}/ping`);
      return response.status === 200;
    } catch (error) {
      logger.error(`CoinGecko API ping failed: ${error}`);
      return false;
    }
  }
}
