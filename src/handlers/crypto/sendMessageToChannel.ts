import { bot, formatter } from '../../lib/dependencies';
import { ChannelLink, CryptoCurrency } from '../../types';
import { logger } from '../../utils/logger';

interface SendMessageToChannelParams {
  cryptoData: CryptoCurrency[];
  channelLinks?: ChannelLink[];
  channelId: string;
  channelName: string;
}

export const sendMessageToChannel = async ({
  cryptoData,
  channelLinks,
  channelId,
  channelName,
}: SendMessageToChannelParams) => {
  const message = formatter.formatCryptoMessage({
    cryptoData,
    links: channelLinks,
  });

  await bot.telegram.sendMessage(channelId, message, {
    parse_mode: 'HTML',
    link_preview_options: { is_disabled: true },
  });

  logger.info(`Sent crypto update to channel: ${channelName}`);
};
