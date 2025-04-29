# 🚀 Crypto Telegram Bot

A scalable Telegram bot that sends hourly cryptocurrency price updates to multiple Telegram channels.

## 📊 Features

- 💰 Hourly updates of top 30 cryptocurrencies from CoinGecko
- 📈 Price, 24h change, and other essential crypto metrics
- 🔀 Support for multiple Telegram channels
- 🔄 GitHub Actions automation for scheduled updates
- 🔐 Admin-only configuration commands
- 📱 Easy to deploy and maintain

## 🛠️ Tech Stack

- TypeScript for type-safe code
- Telegraf.js for the Telegram bot framework
- CoinGecko API for cryptocurrency data
- GitHub Actions for scheduling
- Winston for logging

## 📋 Requirements

- Node.js 16+
- Telegram Bot Token (from [BotFather](https://t.me/botfather))
- GitHub account (for GitHub Actions deployment)

## 🚀 Quick Start

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/crypto-telegram-bot.git
   cd crypto-telegram-bot
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file based on `.env.example`:

   ```bash
   cp .env.example .env
   ```

4. Fill in your Telegram Bot Token and Admin User ID:

   ```
   TELEGRAM_BOT_TOKEN=your_bot_token_here
   ADMIN_USER_ID=your_telegram_user_id
   ```

5. Build the project:
   ```bash
   npm run build
   ```

### Running Locally

Run the CLI command to send message to channels:

```bash
npm run dev
```

## 💾 Configuration

### Environment Variables

- `TELEGRAM_BOT_TOKEN`: Your Telegram Bot Token (required)
- `COINGECKO_API_URL`: CoinGecko API URL (optional)
- `LOG_LEVEL`: Logging level (optional, default: info)

## 🔄 GitHub Actions Setup

The bot is designed to run on GitHub Actions, which will automatically send hourly updates.

1. Add your secrets to GitHub repository:

   - `TELEGRAM_BOT_TOKEN`: Your Telegram Bot Token

2. The workflow is already configured in `.github/workflows/crypto-update.yml`

## 🚀 Development

### Running Tests

```bash
npm test
```

### Linting and Formatting

```bash
npm run lint    # Check for linting issues
npm run format  # Format code
```

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Credits

- [Telegraf](https://github.com/telegraf/telegraf) - Telegram bot framework
- [CoinGecko API](https://www.coingecko.com/en/api) - Cryptocurrency data
