# Quick Guide: Add Your JWT Token

## 📍 **Exact Location to Add Token**

Open this file: **`src/config/wordpress.config.ts`**

Find this line (around line 13):
```typescript
const jwtToken = import.meta.env.VITE_WORDPRESS_JWT_TOKEN; // || 'your-jwt-token-here';
```

Change it to:
```typescript
const jwtToken = import.meta.env.VITE_WORDPRESS_JWT_TOKEN || 'PASTE_YOUR_TOKEN_HERE';
```

---

## 🎯 Example

**Before:**
```typescript
const jwtToken = import.meta.env.VITE_WORDPRESS_JWT_TOKEN; // || 'your-jwt-token-here';
```

**After:**
```typescript
const jwtToken = import.meta.env.VITE_WORDPRESS_JWT_TOKEN || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
```

---

## ✅ That's It!

Save the file and the app will automatically:
- Use Bearer token authentication instead of Basic Auth
- Show in console: `🔑 Using JWT Token authentication`

---

## 🔍 Don't Have a Token Yet?

### Option 1: Get Token from WordPress (if JWT plugin installed)

```bash
curl -X POST http://localhost:8080/wp-json/jwt-auth/v1/token \
  -H "Content-Type: application/json" \
  -d '{"username":"ariel","password":"your_actual_wordpress_password"}'
```

### Option 2: Fix Basic Auth Instead

If you don't have a JWT plugin, it's easier to fix the Basic Auth issue:

1. Add to WordPress `.htaccess`:
```apache
RewriteCond %{HTTP:Authorization} ^(.*)
RewriteRule ^(.*) - [E=HTTP_AUTHORIZATION:%1]
```

2. Add to `wp-config.php`:
```php
define('APPLICATION_PASSWORD_AUTH_ENABLED', true);
```

See `WORDPRESS_TOKEN_FIX.md` for details.
