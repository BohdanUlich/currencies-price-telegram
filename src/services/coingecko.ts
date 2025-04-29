import axios from "axios";
import { config } from "../config/config";
import { logger } from "../utils/logger";

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
  async getTopCryptocurrencies(limit: number = 30): Promise<CryptoCurrency[]> {
    try {
      const params: Record<string, string | number> = {
        vs_currency: "usd",
        order: "market_cap_desc",
        per_page: limit,
        page: 1,
        price_change_percentage: "24h",
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
      logger.error(`Error fetching cryptocurrency data: ${error}`);

      // Handle rate limiting explicitly
      if (axios.isAxiosError(error) && error.response?.status === 429) {
        logger.error(
          "CoinGecko API rate limit exceeded. Consider using an API key."
        );
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
