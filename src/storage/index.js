/**
 * RoleFit CV Studio - Storage Module
 * 
 * Provides abstraction over LocalStorage and IndexedDB
 * for persistent data storage.
 * 
 * This module is designed for browser-only usage.
 */

const StorageModule = {
    KEYS: {
        PROFILE: 'rolefit_profile',
        JOBS: 'rolefit_jobs',
        VARIANTS: 'rolefit_variants',
        SETTINGS: 'rolefit_settings'
    },

    /**
     * Save data to localStorage
     * @param {string} key - Storage key
     * @param {*} data - Data to store
     * @returns {boolean} Success status
     */
    save(key, data) {
        try {
            localStorage.setItem(key, JSON.stringify(data));
            return true;
        } catch (e) {
            console.error('Storage save error:', e);
            return false;
        }
    },

    /**
     * Load data from localStorage
     * @param {string} key - Storage key
     * @returns {*} Retrieved data or null
     */
    load(key) {
        try {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : null;
        } catch (e) {
            console.error('Storage load error:', e);
            return null;
        }
    },

    /**
     * Remove data from localStorage
     * @param {string} key - Storage key
     */
    remove(key) {
        localStorage.removeItem(key);
    },

    /**
     * Clear all app data
     */
    clear() {
        Object.values(this.KEYS).forEach(key => this.remove(key));
    },

    /**
     * Check if storage is available
     * @returns {boolean}
     */
    isAvailable() {
        try {
            const test = '__storage_test__';
            localStorage.setItem(test, test);
            localStorage.removeItem(test);
            return true;
        } catch (e) {
            return false;
        }
    }
};

// Make available globally for browser usage
window.StorageModule = StorageModule;
