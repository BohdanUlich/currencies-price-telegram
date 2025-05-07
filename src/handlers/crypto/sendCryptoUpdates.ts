import { cryptoChannels } from '../../config/channels';
import { coinGeckoClient } from '../../lib/dependencies';
import { CRYPTO_LIST_TYPE, TOP_CRYPTO_MEME_TYPE, TOP_CRYPTO_TYPE } from '../../types';
import { logger } from '../../utils/logger';
import { sendMessageToChannel } from './sendMessageToChannel';

/**
 * Send cryptocurrency updates to all registered channels
 */
export const sendCryptoUpdates = async () => {
  try {
    // Process each channel from the cryptoChannels array
    for (const channel of cryptoChannels) {
      const channelId = channel.id;
      const channelLinks = channel.links;
      const channelName = channel.name;

      try {
        if (channel.type === TOP_CRYPTO_TYPE) {
          // Use the limit from the channel object
          const cryptoData = await coinGeckoClient.getTopCryptocurrencies(channel.limit);

          if (!cryptoData?.length) {
            logger.error(`Failed to fetch cryptocurrency data for channel: ${channel.name}`);
            continue;
          }

          await sendMessageToChannel({ cryptoData, channelId, channelLinks, channelName });
        }

        if (channel.type === CRYPTO_LIST_TYPE) {
          // Check if cryptoList exists and is not empty
          if (!channel?.cryptoList?.length) {
            logger.error(`Missing cryptocurrency list for channel: ${channel.name}`);
            continue;
          }

          // Get data for the list of cryptocurrency IDs
          const cryptoData = await coinGeckoClient.getCryptocurrenciesByIds(channel.cryptoList);

          if (!cryptoData?.length) {
            logger.error(`Failed to fetch cryptocurrency data by IDs for channel: ${channel.name}`);
            continue;
          }

          await sendMessageToChannel({ cryptoData, channelId, channelLinks, channelName });
        }

        if (channel.type === TOP_CRYPTO_MEME_TYPE) {
          const cryptoData = await coinGeckoClient.getTopMemeCoins(channel.limit);

          if (!cryptoData?.length) {
            logger.error(`Failed to fetch meme coin data for channel: ${channel.name}`);
            continue;
          }

          await sendMessageToChannel({ cryptoData, channelId, channelLinks, channelName });
        }
      } catch (error) {
        logger.error(`Failed to send message to channel ${channel.name}: ${error}`);
      }
    }
  } catch (error) {
    logger.error(`Error in sendCryptoUpdates: ${error}`);
  }
};
