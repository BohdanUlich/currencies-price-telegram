import { Telegraf } from 'telegraf';
import { CoinGeckoClient } from './services/coingecko';
import { CryptoFormatter } from './utils/formatter';
import { config } from './config/config';
import { cryptoChannels } from './config/channels';
import { logger } from './utils/logger';
import { CRYPTO_LIST_TYPE, TOP_CRYPTO_TYPE } from './types';

// Initialize the main bot
const bot = new Telegraf(config.telegramBotToken);
const coinGeckoClient = new CoinGeckoClient();
const formatter = new CryptoFormatter();

/**
 * Send cryptocurrency updates to all registered channels
 */
async function sendCryptoUpdates(): Promise<void> {
  try {
    // Process each channel from the cryptoChannels array
    for (const channel of cryptoChannels) {
      try {
        let cryptoData;

        // Get data based on channel type
        if (channel.type === TOP_CRYPTO_TYPE) {
          // Use the limit from the channel object
          cryptoData = await coinGeckoClient.getTopCryptocurrencies(channel.limit);

          if (!cryptoData || cryptoData.length === 0) {
            logger.error(`Failed to fetch cryptocurrency data for channel: ${channel.name}`);
            continue;
          }
        } else if (channel.type === CRYPTO_LIST_TYPE) {
          // Check if cryptoList exists and is not empty
          if (!channel.cryptoList || channel.cryptoList.length === 0) {
            logger.error(`Missing cryptocurrency list for channel: ${channel.name}`);
            continue;
          }

          // Get data for the list of cryptocurrency IDs
          cryptoData = await coinGeckoClient.getCryptocurrenciesByIds(channel.cryptoList);

          if (!cryptoData || cryptoData.length === 0) {
            logger.error(`Failed to fetch cryptocurrency data by IDs for channel: ${channel.name}`);
            continue;
          }
        } else {
          // For other channel types that are not yet supported
          logger.info(`Skipping channel ${channel.name}: type ${channel.type} not supported yet`);
          continue;
        }

        // Format the message with data and links
        const message = formatter.formatCryptoMessage({
          cryptoData,
          links: channel.links,
        });

        // Send message to the channel
        await bot.telegram.sendMessage(channel.id, message, {
          parse_mode: 'HTML',
        });

        logger.info(`Sent crypto update to channel: ${channel.name}`);
      } catch (error) {
        logger.error(`Failed to send message to channel ${channel.name}: ${error}`);
      }
    }
  } catch (error) {
    logger.error(`Error in sendCryptoUpdates: ${error}`);
  }
}

/**
 * Main entry point for GitHub Actions
 */
async function main(): Promise<void> {
  try {
    logger.info('Starting crypto update process');

    // Send updates to all channels
    await sendCryptoUpdates();

    logger.info('Crypto update process completed successfully');
  } catch (error) {
    logger.error(`Error in main process: ${error}`);
    process.exit(1);
  }
}

// Execute main function when run directly
if (require.main === module) {
  main();
}

// Export for testing purposes
export { sendCryptoUpdates, main };
