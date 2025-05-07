// src/lib/dependencies.ts
import { Telegraf } from 'telegraf';
import { CoinGeckoClient } from '../services/coingecko';
import { CryptoFormatter } from '../utils/formatter';
import { config } from '../config/config';

export const bot = new Telegraf(config.telegramBotToken);
export const coinGeckoClient = new CoinGeckoClient();
export const formatter = new CryptoFormatter();
