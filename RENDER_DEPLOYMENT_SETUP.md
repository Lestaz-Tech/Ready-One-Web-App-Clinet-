# Render Backend Deployment - Environment Variables Setup

## ✅ COMPLETED: Frontend Configuration
Your frontend `.env` is now configured with:
```
VITE_API_URL=https://ready-one-web-app-clinet.onrender.com
```

## ⚠️ REQUIRED: Render Backend Environment Variables

You need to set these environment variables on your Render dashboard for your backend service:

### 1. **Supabase Credentials**
```
VITE_SUPABASE_URL=https://wuykthacnylmvszobgpk.supabase.co
VITE_SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind1eWt0aGFjbnlsbXZzem9iZ3BrIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MzU4NjcxOSwiZXhwIjoyMDc5MTYyNzE5fQ.2GrJ3oDLWsrj6SNx_RFpSDz5pSg7l1SZuBTpl9m7qmM
```

### 2. **Server Configuration**
```
PORT=5000
NODE_ENV=production
```

### 3. **CORS Origins** (add your frontend URL)
```
CORS_ORIGIN=http://localhost:3000,http://localhost:5173,https://readyoneweb.netlify.app
```

---

## 📝 How to Add These to Render

1. Go to your **Render Dashboard** → Select your backend service
2. Click **Settings** → **Environment Variables**
3. Add each environment variable from above
4. Click **Save**
5. The service will automatically redeploy

---

## ✅ What This Setup Does

### Frontend (Your App)
- ✅ Sends API requests to: `https://ready-one-web-app-clinet.onrender.com/api/...`
- ✅ No more "Cannot connect to backend at http://localhost:5000" errors

### Backend (Render)
- ✅ Receives requests from frontend
- ✅ Uploads profile pictures to Supabase Storage
- ✅ Updates user profiles in Supabase database
- ✅ Returns profile picture URLs

### Profile Picture Flow
1. **Frontend**: User uploads photo → Compresses to base64
2. **Frontend**: Sends `profile_picture_base64` to backend API
3. **Backend**: Converts base64 → Uploads to Supabase Storage
4. **Backend**: Gets public URL → Stores in Supabase `public.users` table
5. **Backend**: Sets `has_profile_picture = true` flag
6. **Frontend**: Displays success message + profile picture

---

## 🧪 Test It

After setting environment variables on Render:

1. Go to your frontend app
2. Navigate to **Dashboard** → **Profile Settings**
3. Click **Choose Photo** and upload an image
4. Click **Save Changes**
5. You should see: "Profile updated successfully!"

---

## 🐛 Troubleshooting

### Error: "Cannot connect to backend"
- Check that `VITE_API_URL` in frontend `.env` matches your Render URL
- Verify Render backend service is running (green status)

### Error: "Profile picture upload failed"
- Ensure Supabase `profile_pictures` storage bucket exists
- Check backend environment variables are set on Render

### Error: "No authentication token"
- Make sure you're logged in
- Check that `session.access_token` is being passed in headers

---

## 📊 Database Updates

Your Supabase `public.users` table now has:
- `profile_picture_url` - URL to the uploaded photo in Storage
- `has_profile_picture` - Boolean flag (true if photo exists)

Run this SQL in Supabase to verify:
```sql
SELECT id, full_name, phone, profile_picture_url, has_profile_picture FROM public.users LIMIT 5;
```

---

## 🚀 Profile Picture Storage

Photos are stored in Supabase Storage at:
```
profile_pictures/{user_id}/{timestamp}-profile.jpg
```

Example public URL:
```
https://wuykthacnylmvszobgpk.supabase.co/storage/v1/object/public/profile_pictures/ec7e60e7-64e8-46fa-b2b5-8591aa583c4f/1705848000000-profile.jpg
```

---

## ✨ Next Steps

1. **Set environment variables on Render** ← DO THIS FIRST
2. Verify backend is running (check Render dashboard)
3. Test profile picture upload from frontend
4. Monitor backend logs in Render for any errors
