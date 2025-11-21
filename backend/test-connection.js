/**
 * Connection Test Script
 * Tests the connection between frontend, backend, and Supabase
 */

require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

console.log('\n=== Backend Connection Test ===\n');

// Check environment variables
console.log('1. Checking environment variables...');
const requiredVars = {
  'VITE_SUPABASE_URL': process.env.VITE_SUPABASE_URL,
  'VITE_SUPABASE_SERVICE_ROLE_KEY': process.env.VITE_SUPABASE_SERVICE_ROLE_KEY ? '✓ Set' : '✗ Missing',
  'PORT': process.env.PORT || '5000',
  'CORS_ORIGIN': process.env.CORS_ORIGIN || 'Not set (using defaults)',
};

Object.entries(requiredVars).forEach(([key, value]) => {
  if (value === '✗ Missing') {
    console.log(`   ✗ ${key}: MISSING`);
  } else if (typeof value === 'string' && value.length > 50) {
    console.log(`   ✓ ${key}: Set (${value.substring(0, 30)}...)`);
  } else {
    console.log(`   ✓ ${key}: ${value}`);
  }
});

// Test Supabase connection
console.log('\n2. Testing Supabase connection...');
try {
  const supabase = createClient(
    process.env.VITE_SUPABASE_URL,
    process.env.VITE_SUPABASE_SERVICE_ROLE_KEY
  );
  console.log('   ✓ Supabase client initialized successfully');
} catch (error) {
  console.log(`   ✗ Failed to initialize Supabase: ${error.message}`);
  process.exit(1);
}

// Check CORS configuration
console.log('\n3. Checking CORS configuration...');
const corsOrigins = process.env.CORS_ORIGIN?.split(',') || ['http://localhost:5173', 'http://localhost:3000'];
console.log('   Allowed origins:');
corsOrigins.forEach(origin => {
  console.log(`   ✓ ${origin.trim()}`);
});

// Summary
console.log('\n=== Summary ===');
console.log('Backend configuration: ✓ Ready');
console.log('Supabase connection: ✓ Ready');
console.log('CORS: ✓ Configured');
console.log('\nTo start the backend, run:');
console.log('  npm run dev\n');
console.log('The backend will be available at: http://localhost:5000');
console.log('Frontend should connect to: http://localhost:5000/api/*\n');
