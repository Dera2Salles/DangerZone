# WordPress Token Authentication Fix

## 🔴 Problem: JWT Token Issues

You're getting 401 Unauthorized because WordPress REST API authentication with Application Passwords requires proper JWT token handling or Basic Auth configuration.

---

## ✅ Solution Options

### Option 1: Enable Basic Authentication (Recommended for Local Development)

WordPress REST API supports Basic Authentication, but it's disabled by default for security. Since you're on localhost, we can enable it.

#### Step 1: Install Authentication Plugin

Add this to your WordPress `wp-config.php` file (before `/* That's all, stop editing! */`):

```php
// Enable Basic Authentication for REST API
define('APPLICATION_PASSWORD_AUTH_ENABLED', true);
```

#### Step 2: Add CORS Headers (if needed)

If you're still getting CORS errors, add this to your theme's `functions.php`:

```php
add_action('rest_api_init', function() {
    remove_filter('rest_pre_serve_request', 'rest_send_cors_headers');
    add_filter('rest_pre_serve_request', function($value) {
        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
        header('Access-Control-Allow-Credentials: true');
        header('Access-Control-Allow-Headers: Authorization, Content-Type, X-WP-Nonce');
        return $value;
    });
}, 15);
```

---

### Option 2: Use JWT Authentication Plugin

#### Step 1: Install JWT Plugin

1. Download: https://wordpress.org/plugins/jwt-authentication-for-wp-rest-api/
2. Or install via WordPress admin: Plugins → Add New → Search "JWT Authentication"
3. Activate the plugin

#### Step 2: Configure JWT

Add to `wp-config.php`:

```php
define('JWT_AUTH_SECRET_KEY', 'your-secret-key-here');
define('JWT_AUTH_CORS_ENABLE', true);
```

#### Step 3: Update Our Code to Use JWT

We'll need to modify the service to get a JWT token first, then use it for requests.

---

### Option 3: Use WordPress Application Passwords Correctly

The issue might be that Application Passwords need to be enabled properly.

#### Check WordPress Version
Application Passwords require WordPress 5.6+. Check your version:
```bash
# In WordPress admin: Dashboard → Updates
```

#### Enable Application Passwords

Add to `wp-config.php`:

```php
// Force enable Application Passwords
add_filter('wp_is_application_passwords_available', '__return_true');
```

#### Verify .htaccess

Make sure your `.htaccess` file has these rules:

```apache
# BEGIN WordPress
<IfModule mod_rewrite.c>
RewriteEngine On
RewriteBase /
RewriteRule ^index\.php$ - [L]

# Add this line for Authorization header
RewriteCond %{HTTP:Authorization} ^(.*)
RewriteRule ^(.*) - [E=HTTP_AUTHORIZATION:%1]

RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.php [L]
</IfModule>
# END WordPress
```

---

### Option 4: Alternative - Use Cookie Authentication

For same-origin requests, we can use WordPress cookies instead.

#### Update the Service

I can modify the service to use WordPress nonce-based authentication instead of Application Passwords.

---

## 🧪 Quick Test

### Test 1: Check if REST API is accessible

```bash
curl http://localhost:8080/wp-json/wp/v2/posts
```

Should return posts (even without auth).

### Test 2: Test Basic Auth

```bash
curl -u "ariel:YOUR_APP_PASSWORD" http://localhost:8080/wp-json/wp/v2/users/me
```

Should return your user info if auth works.

### Test 3: Test POST with Auth

```bash
curl -X POST \
  -u "ariel:YOUR_APP_PASSWORD" \
  -H "Content-Type: application/json" \
  -d '{"title":"Test","content":"Test content","status":"draft"}' \
  http://localhost:8080/wp-json/wp/v2/posts
```

Should create a draft post.

---

## 🎯 Recommended Solution

**For localhost development, I recommend Option 1 (Basic Auth) because:**
- Simplest to set up
- No additional plugins needed
- Works immediately with Application Passwords
- Secure enough for local development

**Steps:**
1. Add `define('APPLICATION_PASSWORD_AUTH_ENABLED', true);` to `wp-config.php`
2. Make sure `.htaccess` has the Authorization header rewrite rule
3. Restart your WordPress server
4. Try publishing again

---

## 💡 Alternative: Use WordPress Plugin

If you don't want to modify WordPress files, install this plugin:
- **WP REST API Authentication**: https://wordpress.org/plugins/wp-rest-api-authentication/

This plugin handles all authentication methods automatically.

---

## 🔍 Debug: Check What's Being Sent

The console logs show we're sending:
```
auth: {
  username: 'ariel',
  password: 'arielpasssecret'
}
```

This should work with Basic Auth. If it's not working, the issue is likely:
1. Application Password not generated correctly
2. WordPress not accepting Basic Auth headers
3. `.htaccess` stripping Authorization header

**Next step:** Which solution do you want to try first?
