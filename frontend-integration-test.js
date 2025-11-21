/**
 * Frontend Integration Test
 * Run this in the browser console to test the API connection
 */

const apiUrl = 'http://localhost:5000';

async function testHealthEndpoint() {
  try {
    console.log('[TEST] Testing health endpoint...');
    const response = await fetch(`${apiUrl}/api/health`);
    const data = await response.json();
    console.log('[TEST] ✓ Health check passed:', data);
    return true;
  } catch (error) {
    console.error('[TEST] ✗ Health check failed:', error.message);
    return false;
  }
}

async function testAuthToken() {
  try {
    console.log('[TEST] Getting auth token from session...');
    
    // Try to get token from Supabase session
    const response = await fetch('/.auth/v1/user', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('sb_' + window.location.hostname + '_sb-' + 'auth-token')}`
      }
    });
    
    if (!response.ok) {
      console.warn('[TEST] No valid session found. Please log in first.');
      return null;
    }
    
    const user = await response.json();
    console.log('[TEST] ✓ Current user:', user);
    return user;
  } catch (error) {
    console.log('[TEST] Session check requires login. This is expected if not authenticated.');
    return null;
  }
}

async function testBackendConnection() {
  try {
    console.log('[TEST] Testing backend API connection...');
    
    // Get token from localStorage (Supabase stores it here)
    const token = Object.keys(localStorage).find(key => 
      key.includes('sb') && key.includes('auth-token')
    );
    
    if (!token) {
      console.warn('[TEST] ⚠️  No auth token found. Please log in first.');
      console.log('[TEST] Test login at: http://localhost:5173/login');
      return false;
    }
    
    const authToken = localStorage.getItem(token);
    console.log('[TEST] Found auth token, testing API request...');
    
    const response = await fetch(`${apiUrl}/api/users/stats`, {
      headers: {
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json'
      }
    });
    
    const data = await response.json();
    
    if (response.ok) {
      console.log('[TEST] ✓ API request successful:', data);
      return true;
    } else {
      console.error('[TEST] ✗ API returned error:', data);
      return false;
    }
  } catch (error) {
    console.error('[TEST] ✗ API test failed:', error.message);
    return false;
  }
}

async function runAllTests() {
  console.log('\n╔════════════════════════════════════════════════╗');
  console.log('║     Ready One - Backend Integration Tests      ║');
  console.log('╚════════════════════════════════════════════════╝\n');
  
  const healthOk = await testHealthEndpoint();
  console.log('');
  
  const tokenOk = await testAuthToken();
  console.log('');
  
  if (tokenOk) {
    const apiOk = await testBackendConnection();
    console.log('');
    
    if (apiOk) {
      console.log('✓ All tests passed! Backend is fully connected.');
    } else {
      console.log('✗ API test failed. Check your Supabase configuration.');
    }
  } else {
    console.log('[TEST] Skipping API test - not logged in');
    console.log('[TEST] Instructions:');
    console.log('  1. Click on "Sign In" button');
    console.log('  2. Log in with your Supabase credentials');
    console.log('  3. Run this test again: runAllTests()');
  }
  
  console.log('\n');
}

// Run tests
runAllTests();
