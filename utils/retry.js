export const retryWithBackoff = async (operation, maxAttempts = 5) => {
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    try {
      return await operation();
    } catch (error) {
      const status = error.status;

      const retryable =
        status === 429 ||
        status >= 500 ||
        error.code === "ECONNRESET" ||
        error.code === "ETIMEDOUT";

      if (!retryable || attempt === maxAttempts - 1) {
        throw error;
      }

      const delay = Math.min(1000 * 2 ** attempt, 16000);

      const jitter = Math.random() * 500;

      await new Promise((resolve) => setTimeout(resolve, delay + jitter));
    }
  }
};
