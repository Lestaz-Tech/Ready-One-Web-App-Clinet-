# Quick Start Guide

## 🎯 Get Ready One Web App Running in 3 Steps

### Step 1: Start the Backend Server
Open a PowerShell terminal and run:
```powershell
cd "c:\Users\NYADEJE\Desktop\agaga projects\Ready One Projects\webapp\backend"
npm run dev
```

Wait until you see:
```
🚀 Backend server running on http://localhost:5000
```

### Step 2: Start the Frontend Server
Open another PowerShell terminal and run:
```powershell
cd "c:\Users\NYADEJE\Desktop\agaga projects\Ready One Projects\webapp"
npm run dev
```

Wait until you see:
```
➜  Local:   http://localhost:5173/
```

### Step 3: Log In
1. Open browser to `http://localhost:5173`
2. Click "Sign In"
3. Enter your Supabase email and password
4. You're now connected! The dashboard will load with your data.

## ❌ If you see "Network error..."

**The error message tells you exactly what to fix:**
- Backend not running → Run `npm run dev` in the backend folder
- Port 5000 in use → Stop the other process or change PORT in .env
- Not logged in → You must log in with valid Supabase credentials

## 📱 What Works Now

✓ User authentication with Supabase  
✓ Dashboard metrics and statistics  
✓ Service booking  
✓ Profile management  
✓ Support tickets  
✓ Payment history  
✓ Notifications  

## 🔒 Important: Supabase Users

You must have users created in your Supabase project. To add a test user:

1. Go to https://supabase.com and log in
2. Open your project
3. Go to **Authentication** → **Users**
4. Click "Add user"
5. Enter email and password
6. Use these to log in on the web app

## 📊 Verify Everything Works

Once logged in:
1. Dashboard should show your stats
2. Open Dev Tools (F12)
3. Go to Console tab
4. You should see `[API] GET http://localhost:5000/api/users/stats`
5. Look for "Success" message

If you see error messages:
- Check browser console for details
- Check terminal where backend is running
- Make sure both servers are running

## 🚨 Common Issues

| Issue | Fix |
|-------|-----|
| "Cannot connect to server" | Run `npm run dev` in backend folder |
| "Unauthorized" error | Log in with valid Supabase user credentials |
| Port 5000 already in use | Kill the process: `netstat -ano \| findstr :5000` then `taskkill /pid <PID>` |
| Frontend loads but no data | Check you're logged in and backend is running |

## 📚 More Help

See `BACKEND_FRONTEND_SETUP.md` for:
- Detailed configuration
- API endpoint testing
- Troubleshooting guide
- Supabase setup instructions

