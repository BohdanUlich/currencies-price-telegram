import { Telegraf } from "telegraf";
import { CoinGeckoClient } from "./services/coingecko";
import { CryptoFormatter } from "./utils/formatter";
import { config } from "./config/config";
import { channels } from "./config/channels";
import { logger } from "./utils/logger";

// Initialize the main bot
const bot = new Telegraf(config.telegramBotToken);
const coinGeckoClient = new CoinGeckoClient();
const formatter = new CryptoFormatter();

/**
 * Send cryptocurrency updates to all registered channels
 */
async function sendCryptoUpdates(): Promise<void> {
  try {
    // Get top 30 cryptocurrencies
    const cryptoData = await coinGeckoClient.getTopCryptocurrencies(30);

    if (!cryptoData || cryptoData.length === 0) {
      logger.error("Failed to fetch cryptocurrency data");
      return;
    }

    // Format the message
    const message = formatter.formatCryptoMessage(cryptoData);

    // Send message to each channel
    for (const channel of channels) {
      try {
        await bot.telegram.sendMessage(channel.id, message, {
          parse_mode: "HTML",
        });
        logger.info(`Sent crypto update to channel: ${channel}`);
      } catch (error) {
        logger.error(`Failed to send message to channel ${channel}: ${error}`);
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
    logger.info("Starting crypto update process");

    // Send updates to all channels
    await sendCryptoUpdates();

    logger.info("Crypto update process completed successfully");
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
