# WordPress REST API Integration - Setup Guide

## Overview

This project now includes full WordPress REST API integration, allowing you to publish blog posts directly from the editor to your WordPress site. All HTML content and formatting from the TipTap editor is preserved when publishing to WordPress.

## Features

✅ **Full WordPress REST API v2 Support**
- Create, update, and delete posts
- Upload media files to WordPress media library
- Manage categories and tags
- Preserve all HTML formatting from TipTap editor

✅ **Rich Editor Integration**
- TipTap WYSIWYG editor with full formatting support
- Image uploads with WordPress media library integration
- Category and tag management
- Featured image support

✅ **User Experience**
- Loading states during publish
- Success/error notifications with toast messages
- Preview functionality
- Form validation

## Setup Instructions

### 1. Generate WordPress Application Password

1. Log in to your WordPress admin dashboard
2. Go to **Users → Profile**
3. Scroll down to **Application Passwords**
4. Enter a name (e.g., "Blog Editor")
5. Click **Add New Application Password**
6. Copy the generated password (you won't be able to see it again!)

### 2. Configure Environment Variables

1. Copy the example environment file:
   ```bash
   cp .env.example .env.local
   ```

2. Edit `.env.local` and add your WordPress credentials:
   ```env
   VITE_WORDPRESS_SITE_URL=https://your-wordpress-site.com
   VITE_WORDPRESS_USERNAME=your-username
   VITE_WORDPRESS_APP_PASSWORD=xxxx xxxx xxxx xxxx xxxx xxxx
   ```

   **Important:**
   - Use your WordPress site URL without trailing slash
   - Use your WordPress username (not email)
   - Use the application password (with or without spaces)

### 3. Restart Development Server

After configuring `.env.local`, restart your development server:

```bash
npm run dev
```

## Usage

### Creating a Blog Post

1. **Title**: Enter your post title
2. **Content**: Use the rich text editor to write your content
   - All formatting (bold, italic, headings, etc.) is preserved
   - Images are automatically uploaded to WordPress
   - Links, tables, and lists are fully supported
3. **Excerpt**: Add a short description (optional)
4. **Category**: Select or create a category
5. **Tags**: Add tags (they'll be created in WordPress if they don't exist)
6. **Featured Image**: Upload a featured image (optional)
7. **Status**: Choose draft, publish, pending, or private
8. **Click "Publier"** to publish to WordPress

### Preview

Click the "Prévisualiser" button to see how your post will look before publishing.

### WordPress Integration Status

The editor will show:
- ⚠️ Warning if WordPress is not configured (posts saved locally only)
- 🔄 Loading indicator when fetching WordPress data
- ✅ Success message with link to published post
- ❌ Error messages if publishing fails

## API Service Architecture

### Files Created

- **`src/services/wordpress.types.ts`**: TypeScript type definitions for WordPress API
- **`src/services/wordpress.service.ts`**: Core WordPress REST API service
- **`src/hooks/useWordPress.ts`**: React hook for WordPress operations
- **`src/config/wordpress.config.ts`**: Environment configuration helper
- **`.env.example`**: Example environment file

### Service Methods

The `WordPressService` class provides:

```typescript
// Post operations
createPost(params: CreatePostParams): Promise<WordPressApiResponse<WordPressPost>>
updatePost(params: UpdatePostParams): Promise<WordPressApiResponse<WordPressPost>>
deletePost(id: number, force?: boolean): Promise<WordPressApiResponse<WordPressPost>>
getPost(id: number): Promise<WordPressApiResponse<WordPressPost>>

// Media operations
uploadMedia(params: UploadMediaParams): Promise<WordPressApiResponse<WordPressMedia>>

// Category operations
getCategories(): Promise<WordPressApiResponse<WordPressCategory[]>>
createCategory(name: string, description?: string): Promise<WordPressApiResponse<WordPressCategory>>
findOrCreateCategory(name: string): Promise<WordPressApiResponse<WordPressCategory>>

// Tag operations
getTags(): Promise<WordPressApiResponse<WordPressTag[]>>
createTag(name: string, description?: string): Promise<WordPressApiResponse<WordPressTag>>
findOrCreateTag(name: string): Promise<WordPressApiResponse<WordPressTag>>
```

## Content Preservation

The service sends HTML content directly to WordPress using the `raw` content field:

```typescript
content: {
  raw: htmlContentFromEditor // Preserves all formatting
}
```

WordPress will render this HTML exactly as it appears in the editor, maintaining:
- Text formatting (bold, italic, underline, etc.)
- Headings and structure
- Links and images
- Tables and lists
- Custom styling

## Troubleshooting

### "WordPress not configured" Warning

- Make sure `.env.local` file exists in the project root
- Verify all environment variables are set correctly
- Restart the development server after creating/editing `.env.local`

### Authentication Errors

- Verify your WordPress username is correct
- Make sure you're using an **Application Password**, not your regular password
- Check that your WordPress site has REST API enabled

### CORS Errors

If you encounter CORS errors, you may need to configure your WordPress site to allow requests from your development server. Add this to your WordPress theme's `functions.php`:

```php
add_filter('rest_authentication_errors', function($result) {
    if (!empty($result)) {
        return $result;
    }
    if (!is_user_logged_in()) {
        return new WP_Error(
            'rest_not_logged_in',
            __('You are not currently logged in.'),
            array('status' => 401)
        );
    }
    return $result;
});
```

### Upload Errors

- Check file size limits in WordPress settings
- Verify media upload permissions
- Ensure your WordPress user has permission to upload files

## Security Notes

- `.env.local` is automatically ignored by git (added to `.gitignore`)
- Never commit your WordPress credentials to version control
- Use Application Passwords instead of your main WordPress password
- Application Passwords can be revoked at any time from WordPress admin

## Next Steps

You can extend the integration by:
- Adding post scheduling functionality
- Implementing draft auto-save
- Adding support for custom post types
- Implementing post revision management
- Adding bulk operations support
