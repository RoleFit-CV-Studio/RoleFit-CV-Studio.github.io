/**
 * RoleFit CV Studio - Main Application Entry Point
 * 
 * This module serves as the entry point for the modular architecture.
 * The main functionality is currently in index.html for simplicity,
 * but this file provides the foundation for future modularization.
 */

// Version information
const APP_VERSION = '1.0.0';
const APP_NAME = 'RoleFit CV Studio';

// Application configuration
const config = {
    version: APP_VERSION,
    name: APP_NAME,
    storage: {
        prefix: 'rolefit_',
        keys: {
            profile: 'profile',
            jobs: 'jobs',
            variants: 'variants',
            settings: 'settings'
        }
    },
    matching: {
        minScoreThreshold: 40,
        excellentScoreThreshold: 80,
        goodScoreThreshold: 60
    }
};

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { config, APP_VERSION, APP_NAME };
}

console.log(`${APP_NAME} v${APP_VERSION} initialized`);
