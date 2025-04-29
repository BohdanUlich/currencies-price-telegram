import { CryptoCurrency } from "../services/coingecko";

export class CryptoFormatter {
  /**
   * Format cryptocurrency data into a nicely formatted message with emojis
   * @param cryptoData Array of cryptocurrency data
   * @returns Formatted HTML message
   */
  formatCryptoMessage(cryptoData: CryptoCurrency[]): string {
    const now = new Date();
    const dateStr = now.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    // Create header
    let message = `<b>🔥 Top 30 Cryptocurrencies 🔥</b>\n`;
    message += `<i>Updated: ${dateStr}</i>\n\n`;

    // Format each cryptocurrency
    cryptoData.forEach((crypto, index) => {
      // Select emoji based on price movement
      const priceChangeEmoji = this.getPriceChangeEmoji(
        crypto.price_change_percentage_24h
      );

      // Format price with appropriate precision
      const formattedPrice = this.formatPrice(crypto.current_price);

      // Format 24h change with sign and percentage
      const change24h = crypto.price_change_percentage_24h.toFixed(2);
      const changeSign = crypto.price_change_percentage_24h >= 0 ? "+" : "";

      // Add cryptocurrency to message
      message += `${index + 1}. <b>${
        crypto.name
      }</b> (${crypto.symbol.toUpperCase()}) ${priceChangeEmoji}\n`;
      message += `   💲 $${formattedPrice} | 24h: ${changeSign}${change24h}%\n`;

      // Add separator except for the last item
      if (index < cryptoData.length - 1) {
        message += "\n";
      }
    });

    // Add footer with hashtags for promotion
    message += "\n\n";
    message += `#crypto #cryptocurrency #cryptomarket #cryptonews #blockchain #bitcoin #ethereum #trading`;

    return message;
  }

  /**
   * Get appropriate emoji based on price change
   * @param priceChange 24-hour price change percentage
   * @returns Emoji representing the price movement
   */
  private getPriceChangeEmoji(priceChange: number): string {
    if (priceChange >= 10) return "🚀";
    if (priceChange >= 5) return "⬆️";
    if (priceChange >= 0) return "📈";
    if (priceChange >= -5) return "📉";
    if (priceChange >= -10) return "⬇️";
    return "🔻";
  }

  /**
   * Format price with appropriate precision based on value
   * @param price Price in USD
   * @returns Formatted price string
   */
  private formatPrice(price: number): string {
    if (price >= 1000) {
      return price.toLocaleString("en-US", { maximumFractionDigits: 2 });
    } else if (price >= 1) {
      return price.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 4,
      });
    } else if (price >= 0.01) {
      return price.toLocaleString("en-US", {
        minimumFractionDigits: 4,
        maximumFractionDigits: 6,
      });
    } else {
      return price.toLocaleString("en-US", {
        minimumFractionDigits: 6,
        maximumFractionDigits: 8,
      });
    }
  }
}
