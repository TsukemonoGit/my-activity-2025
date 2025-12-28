/**
 * Global Configuration for Yearly Activity Analysis
 * 
 * Edit these values or use environment variables.
 */

module.exports = {
    // GitHub Settings
    GITHUB_USER_NAME: process.env.GITHUB_USER_NAME || "TsukemonoGit",
    GITHUB_YEAR: process.env.YEAR || "2025",
    
    // (Optional) You can also move Nostr global settings here if preferred, 
    // but they are currently in Nostr/config.js
};
