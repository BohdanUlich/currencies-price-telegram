import { ChannelLink, CryptoCurrency } from '../types';

interface FormatCryptoMessageParams {
  cryptoData: CryptoCurrency[];
  links?: ChannelLink[];
}

export class CryptoFormatter {
  /**
   * Format cryptocurrency data into a nicely formatted message with emojis
   * @param cryptoData Array of cryptocurrency data
   * @returns Formatted HTML message
   */
  formatCryptoMessage({ cryptoData, links }: FormatCryptoMessageParams): string {
    let message = '';

    // Format each cryptocurrency
    cryptoData.forEach((crypto, index) => {
      const priceChangeEmoji = this.getCryptoPriceChangeEmoji(crypto.price_change_percentage_24h);
      const change24h = crypto.price_change_percentage_24h.toFixed(2);
      const changeSign = crypto.price_change_percentage_24h >= 0 ? '+' : '';
      const currentPrice = this.formatCryptoPrice(crypto.current_price);

      // Add cryptocurrency to message
      message += `${index + 1}. <b>${crypto.symbol.toUpperCase()}</b> | <b>$${currentPrice}</b> | 24h: <b>${changeSign}${change24h}%</b> ${priceChangeEmoji}\n\n`;
    });

    // Add links to other channels if provided
    if (links && links.length > 0) {
      message +=
        '\n' +
        links.map((link) => `<a href="https://t.me/${link.id}">${link.name}</a>`).join(' | ') +
        '\n\n';
    }

    // Add footer with hashtags for promotion
    message += `#crypto #btc #bitcoin #ethereum #trading #биткоин #крипта #криптовалюта`;

    return message;
  }

  /**
   * Get appropriate emoji based on price change
   * @param priceChange 24-hour price change percentage
   * @returns Emoji representing the price movement
   */
  private getCryptoPriceChangeEmoji(priceChange: number): string {
    if (priceChange >= 20) return '🚀';
    if (priceChange >= 0) return '🟢';
    return '🔻';
  }

  /**
   * Format price with appropriate precision based on value
   * @param price Price in USD
   * @returns Formatted price string
   */
  private formatCryptoPrice(price: number): string {
    return price.toLocaleString('ru', { maximumFractionDigits: 4 });
  }
}
