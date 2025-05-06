import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env file
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

interface Config {
  telegramBotToken: string;
  coingeckoApiUrl: string;
  logLevel: string;
}

// Configuration settings
export const config: Config = {
  telegramBotToken: process.env.TELEGRAM_BOT_TOKEN || '',
  coingeckoApiUrl: process.env.COINGECKO_API_URL || 'https://api.coingecko.com/api/v3',
  logLevel: process.env.LOG_LEVEL || 'info',
};

// Validate required configuration
if (!config.telegramBotToken) {
  throw new Error('TELEGRAM_BOT_TOKEN is required');
}
