import { sendCryptoUpdates } from './handlers/crypto/sendCryptoUpdates';
import { logger } from './utils/logger';

/**
 * Main entry point for GitHub Actions
 */
const main = async () => {
  try {
    logger.info('Starting crypto update process');

    // Send updates to all channels
    await sendCryptoUpdates();

    logger.info('Crypto update process completed successfully');
  } catch (error) {
    logger.error(`Error in main process: ${error}`);
    process.exit(1);
  }
};

// Execute main function when run directly
if (require.main === module) {
  main();
}
