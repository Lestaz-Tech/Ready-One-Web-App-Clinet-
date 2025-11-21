# Authentication Setup - Quick Fix Guide

## Issues Fixed

### 1. Phone Signups Disabled ✅
**Error:** `Phone signups are disabled`

**Solution:**
1. Go to https://app.supabase.com → Your Project
2. Click **Authentication** (left sidebar)
3. Click **Providers**
4. Find **Phone** and toggle it **ON**
5. Save

---

### 2. Auth Context Updated ✅
Changed from attempting pure phone+password signup to using **email+password** with phone stored in metadata.

**Why?** Supabase doesn't support phone-only signup with passwords. We now:
- Accept phone number from user
- Derive email as `{phone}@ready-one.local`
- Use this email for sign-up/login
- Store actual phone in user metadata
- Backend uses this to link to `public.users` table

---

## How to Test Sign Up/Login Locally

### Method 1: Normal Sign Up
1. Go to http://localhost:5173/sign-up
2. Enter:
   - Full Name: `Test User`
   - Phone: `0798940935` (or any valid Kenyan format)
   - Email: `testuser@example.com`
   - Password: `Password123!`
3. Click **Create Account**
4. You'll be redirected to dashboard if successful

### Method 2: Dev-Only Quick Login (Local Dev Only)
1. Go to http://localhost:5173/login
2. Enter:
   - Phone: `0798940935`
   - Password: `0798940935`
3. Click **Sign In**
4. You'll be logged in instantly (dev shortcut)

**Note:** Dev login only works when `NODE_ENV !== 'production'` (local dev, not production)

---

## Next Steps After Sign Up

### Step 1: Create User Profile
After sign up, create a profile record in `public.users` table:

**You need to add this to backend/routes/auth.js** (create this file if it doesn't exist):

```javascript
const express = require('express');
const { createClient } = require('@supabase/supabase-js');

const router = express.Router();
const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_SERVICE_ROLE_KEY
);

// POST /api/auth/signup - Create user profile after signup
router.post('/signup', async (req, res) => {
  try {
    const { email, phone, full_name } = req.body;

    if (!email || !phone || !full_name) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Check if user already exists in public.users
    const { data: existingUser } = await supabase
      .from('users')
      .select('id')
      .eq('email', email)
      .single();

    if (existingUser) {
      return res.status(409).json({ error: 'User profile already exists' });
    }

    // Create user profile
    const { data, error } = await supabase
      .from('users')
      .insert([{
        email,
        phone,
        full_name
      }])
      .select()
      .single();

    if (error) throw error;

    res.status(201).json({ success: true, data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
```

### Step 2: Update Backend server.js
Add auth route:
```javascript
const authRouter = require('./routes/auth');
app.use('/api/auth', authRouter); // Add this before other routes
```

### Step 3: Call Profile Creation from Frontend
After successful sign up, call backend:
```javascript
// In RegistrationForm.jsx, after successful signup:
if (res?.data?.user?.id) {
  // Create profile in backend
  await fetch(`${import.meta.env.VITE_API_URL}/api/auth/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: formData.email,
      phone: formData.phoneNumber,
      full_name: formData.fullName
    })
  });
}
```

---

## Troubleshooting

### "Invalid grant_type"
- Make sure Supabase Auth is enabled
- Check your credentials in `.env`

### "User not found"
- Try signing up first at /sign-up
- Make sure to confirm email if Supabase requires it

### Dev login not working
- Only works on `localhost` (not production)
- Use phone: `0798940935`, password: `0798940935`

### CORS error when signing up
- Check backend is running (`npm run dev` in backend folder)
- Make sure `.env` has correct `CORS_ORIGIN`

---

## Current State

✅ Backend running on http://localhost:5000
✅ Frontend connected to backend API
✅ Auth context supports both regular signup and dev-only login
✅ Phone numbers converted to emails internally

**Next:** Test signup/login locally and then proceed to Step 5 (deploy backend to production)
