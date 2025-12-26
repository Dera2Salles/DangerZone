# WordPress Authentication Fix Guide

## 🔴 Current Problem

You're getting **401 Unauthorized** when trying to create posts. The logs show:
- ✅ GET requests work (fetching categories)
- ❌ POST requests fail (creating posts)

This means your application password `'arielpasssecret'` is **not valid**.

---

## ✅ Solution: Generate a Real Application Password

### Step 1: Access WordPress Admin
1. Open your browser and go to: `http://localhost:8080/wp-admin`
2. Log in with your WordPress admin credentials

### Step 2: Generate Application Password
1. In the WordPress admin, go to **Users → Profile** (or click your name in the top right)
2. Scroll down to the **Application Passwords** section
3. In the "New Application Password Name" field, enter: `Blog Editor`
4. Click **"Add New Application Password"**
5. **IMPORTANT**: Copy the generated password immediately (it looks like: `xxxx xxxx xxxx xxxx xxxx xxxx`)
   - You won't be able to see it again!
   - It will have spaces - that's normal

### Step 3: Update Your Configuration

Open `src/config/wordpress.config.ts` and replace the credentials:

```typescript
const siteUrl = import.meta.env.VITE_WORDPRESS_SITE_URL || 'http://localhost:8080';
const username = import.meta.env.VITE_WORDPRESS_USERNAME || 'YOUR_WORDPRESS_USERNAME';
const applicationPassword = import.meta.env.VITE_WORDPRESS_APP_PASSWORD || 'xxxx xxxx xxxx xxxx xxxx xxxx';
```

Replace:
- `YOUR_WORDPRESS_USERNAME` with your actual WordPress username (the one you use to log in)
- `xxxx xxxx xxxx xxxx xxxx xxxx` with the application password you just copied

### Step 4: Test
1. Save the file
2. The dev server will auto-reload
3. Try publishing a post again
4. Check the console - you should see ✅ instead of ❌

---

## 🧪 Quick Test Script

I've created a test script to verify your credentials before trying to publish. Run:

```bash
node test-wordpress-auth.js
```

This will test if your credentials work without needing to use the UI.

---

## ⚠️ Common Issues

### "I don't see Application Passwords section"
- Application Passwords require WordPress 5.6+
- Your site must use HTTPS OR be localhost
- Check if a plugin is blocking it

### "Application Password generated but still 401"
- Make sure you copied the ENTIRE password (including spaces)
- Verify the username is correct (not email address)
- Try removing spaces from the password in the config

### "Can't access WordPress admin"
If you don't have WordPress installed yet:
1. Install WordPress locally using Docker, XAMPP, or Local by Flywheel
2. Or use a hosted WordPress site
3. Make sure it's accessible at the URL you configured

---

## 📝 Alternative: Use Environment Variables (Recommended)

Instead of hardcoding credentials, create a `.env.local` file:

```env
VITE_WORDPRESS_SITE_URL=http://localhost:8080
VITE_WORDPRESS_USERNAME=your_username
VITE_WORDPRESS_APP_PASSWORD=xxxx xxxx xxxx xxxx xxxx xxxx
```

Then the config will automatically use these values!
