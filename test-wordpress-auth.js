// WordPress Authentication Test Script
// Run this to verify your credentials work before using the UI

const axios = require('axios');

// ⚠️ UPDATE THESE WITH YOUR CREDENTIALS
const WORDPRESS_URL = 'http://localhost:8080';
const USERNAME = 'ariel'; // Your WordPress username
const APP_PASSWORD = 'arielpasssecret'; // Your application password

console.log('🧪 Testing WordPress Authentication...\n');
console.log('Configuration:');
console.log('  URL:', WORDPRESS_URL);
console.log('  Username:', USERNAME);
console.log('  Password:', APP_PASSWORD.replace(/./g, '*'), '\n');

const api = axios.create({
  baseURL: `${WORDPRESS_URL}/wp-json/wp/v2`,
  auth: {
    username: USERNAME,
    password: APP_PASSWORD,
  },
});

async function testAuth() {
  try {
    // Test 1: GET request (should work even with invalid credentials)
    console.log('📥 Test 1: GET /categories (public endpoint)');
    const getResponse = await api.get('/categories');
    console.log('✅ GET request successful:', getResponse.status);
    console.log('   Found', getResponse.data.length, 'categories\n');

    // Test 2: POST request (requires valid authentication)
    console.log('📤 Test 2: POST /posts (requires authentication)');
    const postData = {
      title: { raw: 'Test Post - Auth Check' },
      content: { raw: '<p>This is a test post to verify authentication.</p>' },
      status: 'draft',
    };
    
    const postResponse = await api.post('/posts', postData);
    console.log('✅ POST request successful:', postResponse.status);
    console.log('   Created post ID:', postResponse.data.id);
    console.log('   Post link:', postResponse.data.link, '\n');

    // Clean up - delete the test post
    console.log('🧹 Cleaning up test post...');
    await api.delete(`/posts/${postResponse.data.id}`, { params: { force: true } });
    console.log('✅ Test post deleted\n');

    console.log('🎉 SUCCESS! Your WordPress credentials are valid.');
    console.log('   You can now use the blog editor to publish posts.');
    
  } catch (error) {
    if (error.response) {
      console.log('❌ Authentication failed:', error.response.status, error.response.statusText);
      console.log('   Error:', error.response.data?.message || 'Unknown error\n');
      
      if (error.response.status === 401) {
        console.log('💡 Fix:');
        console.log('   1. Go to http://localhost:8080/wp-admin');
        console.log('   2. Navigate to Users → Profile');
        console.log('   3. Scroll to "Application Passwords"');
        console.log('   4. Generate a new password');
        console.log('   5. Update this script with the new password');
        console.log('   6. Run this test again\n');
      }
    } else {
      console.log('❌ Connection error:', error.message);
      console.log('\n💡 Make sure WordPress is running at:', WORDPRESS_URL);
    }
    process.exit(1);
  }
}

testAuth();
