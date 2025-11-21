# Backend & Frontend Connection Setup Guide

## ✓ Current Status

- **Backend**: Configured and ready
- **Frontend**: Configured and ready  
- **Supabase**: Connected to both frontend and backend
- **CORS**: Properly configured

## 📋 Verification Checklist

### 1. Environment Variables ✓
- **Frontend (.env)**:
  ```
  VITE_SUPABASE_URL=https://wuykthacnylmvszobgpk.supabase.co
  VITE_SUPABASE_ANON_KEY=<set>
  VITE_API_URL=http://localhost:5000
  ```
  
- **Backend (.env)**:
  ```
  VITE_SUPABASE_URL=https://wuykthacnylmvszobgpk.supabase.co
  VITE_SUPABASE_SERVICE_ROLE_KEY=<set>
  PORT=5000
  NODE_ENV=development
  CORS_ORIGIN=http://localhost:5173,http://localhost:3000
  ```

### 2. Dependencies ✓
- **Backend**: All packages installed (check node_modules)
- **Frontend**: All packages installed (check node_modules)

### 3. Server Configuration ✓
- **CORS**: Allows localhost:5173 (frontend)
- **Auth Middleware**: Verifies Supabase JWT tokens
- **Routes**: All protected and properly configured

## 🚀 Running the Full Stack

### Step 1: Start Backend
```powershell
cd "c:\Users\NYADEJE\Desktop\agaga projects\Ready One Projects\webapp\backend"
npm run dev
```

You should see:
```
🚀 Backend server running on http://localhost:5000
Environment: development
```

### Step 2: Start Frontend (in another terminal)
```powershell
cd "c:\Users\NYADEJE\Desktop\agaga projects\Ready One Projects\webapp"
npm run dev
```

You should see:
```
  VITE v5.x.x  ready in XXX ms
  ➜  Local:   http://localhost:5173/
```

### Step 3: Test the Connection
1. Open browser to `http://localhost:5173`
2. Click "Sign In" button
3. **You must have a Supabase account with a user**
4. Log in with your Supabase credentials
5. Open browser dev tools (F12)
6. Go to Console tab
7. Paste and run:
   ```javascript
   // Load the test script
   fetch('http://localhost:5173/frontend-integration-test.js')
     .then(r => r.text())
     .then(code => eval(code))
   ```
   
   Or directly run:
   ```javascript
   runAllTests()
   ```

## 🔐 Setting Up Supabase Authentication

If you don't have a Supabase account yet:

1. Go to https://supabase.com
2. Create a new account
3. Create a new project
4. Go to Authentication > Users
5. Add a test user with:
   - Email: test@example.com
   - Password: testpassword123
6. Use these credentials to log in

## 🧪 Testing Individual Endpoints

### Test Health (no auth required)
```powershell
Invoke-WebRequest -Uri http://localhost:5000/api/health -Verbose
```

### Test with Token
```powershell
$token = "your-supabase-jwt-token"
Invoke-WebRequest -Uri http://localhost:5000/api/users/stats `
  -Headers @{"Authorization" = "Bearer $token"} `
  -Verbose
```

### Test Debug Endpoint
```powershell
$token = "your-supabase-jwt-token"
Invoke-WebRequest -Uri http://localhost:5000/api/debug/verify-token `
  -Method POST `
  -Headers @{"Authorization" = "Bearer $token"} `
  -Verbose
```

## 🔍 Troubleshooting

### Backend not responding
- Check port 5000 is listening: `netstat -ano | findstr :5000`
- Check no other app is using port 5000
- Restart the backend: `npm run dev`

### "Network error" message
- Backend server not running
- Frontend can't reach http://localhost:5000
- Check CORS origin includes http://localhost:5173

### "Invalid token" or "Unauthorized"
- Not logged in to Supabase
- Token is expired
- Supabase credentials are incorrect

### CORS error
- Backend not running
- Browser is blocking the request
- Origin not in CORS_ORIGIN in backend .env

## 📝 API Endpoints

All endpoints require authentication (Bearer token in Authorization header)

- `GET /api/health` - Health check (no auth)
- `POST /api/debug/verify-token` - Verify your token
- `GET /api/users/stats` - User statistics
- `GET /api/bookings` - List bookings
- `POST /api/bookings` - Create booking
- `GET /api/support` - List support tickets
- `POST /api/support` - Create support ticket
- `GET /api/payments` - Payment history
- `POST /api/users/profile` - Update profile

## ✅ Connection Verification

Once both servers are running and you're logged in:

1. Frontend metrics should load without errors
2. Booking submissions should work
3. Profile updates should save
4. Support tickets should submit
5. Browser console should show `[API]` logs for all requests

## 📚 Next Steps

1. **Verify connection works**:
   - Run `npm run dev` in both folders
   - Log in on frontend
   - Check console for any errors

2. **Test all features**:
   - Try booking a service
   - Update your profile
   - Submit a support ticket

3. **Check logs**:
   - Frontend: Browser console (F12)
   - Backend: Terminal where `npm run dev` is running

If you encounter issues, check:
- Browser console for client-side errors
- Backend terminal for server-side errors
- `[API]` logs in browser console for network details

