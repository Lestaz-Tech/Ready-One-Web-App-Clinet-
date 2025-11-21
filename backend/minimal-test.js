/**
 * Minimal Backend Test
 * Tests if the backend server starts correctly
 */

require('dotenv').config();
const express = require('express');
const cors = require('cors');

console.log('Starting minimal backend test...\n');

// Check env vars
console.log('Environment Variables:');
console.log('  VITE_SUPABASE_URL:', process.env.VITE_SUPABASE_URL ? '✓' : '✗');
console.log('  VITE_SUPABASE_SERVICE_ROLE_KEY:', process.env.VITE_SUPABASE_SERVICE_ROLE_KEY ? '✓' : '✗');
console.log('  PORT:', process.env.PORT || '5000');
console.log('  CORS_ORIGIN:', process.env.CORS_ORIGIN || 'default');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true
}));
app.use(express.json());

// Request logging
app.use((req, res, next) => {
  console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ${req.path}`);
  next();
});

// Health endpoint
app.get('/api/health', (req, res) => {
  console.log('  ✓ Health check successful');
  res.json({ status: 'ok', message: 'Backend is running' });
});

// Simple test endpoint
app.get('/api/test', (req, res) => {
  console.log('  ✓ Test endpoint called');
  res.json({ message: 'Test successful', time: new Date().toISOString() });
});

// Start server
app.listen(PORT, () => {
  console.log(`\n✓ Server listening on http://localhost:${PORT}`);
  console.log('✓ CORS enabled for localhost:5173\n');
  console.log('Test commands:');
  console.log('  Invoke-WebRequest http://localhost:5000/api/health');
  console.log('  Invoke-WebRequest http://localhost:5000/api/test\n');
});

// Handle errors
process.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`✗ Port ${PORT} is already in use`);
    console.error('  Kill the process: taskkill /pid <PID> /F');
  } else {
    console.error('✗ Server error:', err.message);
  }
  process.exit(1);
});
