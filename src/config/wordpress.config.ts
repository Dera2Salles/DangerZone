import type { WordPressConfig } from '../services/wordpress.types';

/**
 * Get WordPress configuration from environment variables or hardcoded values
 */
export const getWordPressConfig = (): WordPressConfig | null => {
  // Try environment variables first, then fall back to hardcoded values
  const siteUrl =  'http://localhost:8080';
  const username =  'ariel';
  const applicationPassword = 'arielpasssecret';

  if (!siteUrl || !username || !applicationPassword) {
    console.warn('WordPress configuration is missing. Please set up .env.local file.');
    return null;
  }

  // Ensure siteUrl doesn't have trailing slash
  const cleanSiteUrl = siteUrl.replace(/\/$/, '');

  return {
    siteUrl: cleanSiteUrl,
    username,
    applicationPassword,
  };
};

/**
 * Check if WordPress is configured
 */
export const isWordPressConfigured = (): boolean => {
  return getWordPressConfig() !== null;
};
