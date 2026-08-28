// Configuration utilities
const baseURL = process.env.BASE_URL || "https://bugbank.netlify.app/";

module.exports = {
  baseURL,
  timeout: 30000,
  // Add more config as needed (e.g., retries, trace)
};
