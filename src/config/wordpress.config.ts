import type { WordPressConfig } from '../services/wordpress.types';

/**
 * Get WordPress configuration from environment variables or hardcoded values
 */
export const getWordPressConfig = (): WordPressConfig | null => {
  // Try environment variables first, then fall back to hardcoded values
  const siteUrl =  'http://localhost:8080';
  const username =  'ariel';
  const applicationPassword =  'arielpasssecret';
  
  // Optional: Use JWT token instead of Basic Auth
  // To use JWT token, set VITE_WORDPRESS_JWT_TOKEN in .env.local or uncomment below:
  const jwtToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjgwODAiLCJpYXQiOjE3NjY3MjY0MTgsIm5iZiI6MTc2NjcyNjQxOCwiZXhwIjoxNzY3MzMxMjE4LCJkYXRhIjp7InVzZXIiOnsiaWQiOiIxIn19fQ.QmDX7XLOQw81m0Cwz3tryleqUZOpcTY9I49lbTKfP6g"; // || 'your-jwt-token-here';

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
    jwtToken, // Will be undefined if not set
  };
};

/**
 * Check if WordPress is configured
 */
export const isWordPressConfigured = (): boolean => {
  return getWordPressConfig() !== null;
};
