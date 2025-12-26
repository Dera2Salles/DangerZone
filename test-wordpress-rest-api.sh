#!/bin/bash

# WordPress REST API Test Script
# Tests various authentication methods

WORDPRESS_URL="http://localhost:8080"
USERNAME="ariel"
APP_PASSWORD="arielpasssecret"

echo "🧪 Testing WordPress REST API Authentication"
echo "=============================================="
echo ""

# Test 1: Public endpoint (no auth)
echo "📥 Test 1: GET /wp-json/wp/v2/posts (public)"
curl -s -o /dev/null -w "Status: %{http_code}\n" \
  "${WORDPRESS_URL}/wp-json/wp/v2/posts"
echo ""

# Test 2: User endpoint (requires auth)
echo "👤 Test 2: GET /wp-json/wp/v2/users/me (requires auth)"
curl -s -o /dev/null -w "Status: %{http_code}\n" \
  -u "${USERNAME}:${APP_PASSWORD}" \
  "${WORDPRESS_URL}/wp-json/wp/v2/users/me"
echo ""

# Test 3: Create post (requires auth + write permission)
echo "📝 Test 3: POST /wp-json/wp/v2/posts (create draft)"
RESPONSE=$(curl -s -w "\nHTTP_STATUS:%{http_code}" \
  -X POST \
  -u "${USERNAME}:${APP_PASSWORD}" \
  -H "Content-Type: application/json" \
  -d '{"title":"Test Post","content":"Test content","status":"draft"}' \
  "${WORDPRESS_URL}/wp-json/wp/v2/posts")

HTTP_STATUS=$(echo "$RESPONSE" | grep "HTTP_STATUS" | cut -d: -f2)
BODY=$(echo "$RESPONSE" | sed '/HTTP_STATUS/d')

echo "Status: ${HTTP_STATUS}"

if [ "$HTTP_STATUS" = "201" ]; then
  echo "✅ SUCCESS! Post created."
  POST_ID=$(echo "$BODY" | grep -o '"id":[0-9]*' | head -1 | cut -d: -f2)
  echo "Post ID: ${POST_ID}"
  
  # Clean up - delete the test post
  echo ""
  echo "🧹 Cleaning up test post..."
  curl -s -o /dev/null \
    -X DELETE \
    -u "${USERNAME}:${APP_PASSWORD}" \
    "${WORDPRESS_URL}/wp-json/wp/v2/posts/${POST_ID}?force=true"
  echo "✅ Test post deleted"
elif [ "$HTTP_STATUS" = "401" ]; then
  echo "❌ FAILED: 401 Unauthorized"
  echo ""
  echo "Possible causes:"
  echo "1. Application Password is incorrect"
  echo "2. WordPress not configured for Basic Auth"
  echo "3. .htaccess stripping Authorization header"
  echo ""
  echo "Response:"
  echo "$BODY" | head -20
else
  echo "❌ FAILED: Unexpected status code"
  echo ""
  echo "Response:"
  echo "$BODY" | head -20
fi

echo ""
echo "=============================================="
echo "💡 If Test 1 passes but Test 2/3 fail:"
echo "   → Authentication issue (check WORDPRESS_TOKEN_FIX.md)"
echo ""
echo "💡 If all tests fail:"
echo "   → WordPress not running or wrong URL"
