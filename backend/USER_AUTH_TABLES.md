# Supabase Authentication & User Tables Setup

## Overview

Supabase handles authentication automatically via the `auth.users` table. When you sign up/login a user, Supabase creates a user record automatically. You also need a `public.users` table to store additional user profile information.

---

## How Supabase Auth Works

**`auth.users` table** (Managed by Supabase - Do NOT create manually):
- This table is automatically created by Supabase
- Stores: `id` (UUID), `email`, `phone`, `encrypted_password`, `email_confirmed_at`, `phone_confirmed_at`, `last_sign_in_at`, `user_metadata`, `raw_app_meta_data`, `created_at`, `updated_at`
- You cannot modify this table structure
- Supabase handles password hashing automatically

**`public.users` table** (You CREATE this - for profile data):
- Stores additional user information beyond what Supabase auth provides
- Linked to `auth.users` via `id` (foreign key)
- Examples: full_name, phone, address, profile_photo, preferences

---

## SQL: Create User Profile Table

Run this in your Supabase SQL Editor (https://app.supabase.com → SQL Editor):

```sql
-- Create users profile table
CREATE TABLE public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email VARCHAR NOT NULL,
  phone VARCHAR NOT NULL UNIQUE,
  full_name VARCHAR,
  profile_picture VARCHAR,
  address TEXT,
  city VARCHAR,
  country VARCHAR,
  preferred_payment_method VARCHAR,
  language VARCHAR DEFAULT 'en',
  receive_notifications BOOLEAN DEFAULT true,
  receive_email_updates BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- RLS Policy: Users can read their own profile
CREATE POLICY "Users can read own profile" 
  ON public.users FOR SELECT 
  USING (auth.uid() = id);

-- RLS Policy: Users can update their own profile
CREATE POLICY "Users can update own profile" 
  ON public.users FOR UPDATE 
  USING (auth.uid() = id);

-- Create an index for faster lookups
CREATE INDEX idx_users_email ON public.users(email);
CREATE INDEX idx_users_phone ON public.users(phone);
```

---

## Sign-Up Flow (How it Works)

### 1. Frontend: User submits sign-up form
```javascript
// In src/pages/sign-up/components/RegistrationForm.jsx
const handleSubmit = async (e) => {
  e.preventDefault();
  
  // Sign up with Supabase auth (creates auth.users record)
  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
    phone: phone,
    options: {
      data: {
        full_name: fullName,
        phone: phone
      }
    }
  });
  
  if (error) return;
  
  // After sign-up, create profile in public.users table
  await supabase.from('users').insert([{
    id: data.user.id,
    email: email,
    phone: phone,
    full_name: fullName
  }]);
};
```

### 2. Backend: Handle new user signup
```javascript
// backend/routes/auth.js (if needed)
const handleSignUp = async (email, phone, password, fullName) => {
  // Supabase auth handles the password storage
  const { data, error } = await supabase.auth.admin.createUser({
    email: email,
    phone: phone,
    password: password,
    user_metadata: {
      full_name: fullName,
      phone: phone
    },
    email_confirm: false
  });
  
  if (error) throw error;
  
  // Create profile record
  await supabase.from('public.users').insert([{
    id: data.user.id,
    email: email,
    phone: phone,
    full_name: fullName
  }]);
  
  return data.user;
};
```

### 3. Database: What gets created
- ✅ **auth.users**: `{ id, email, phone, encrypted_password, created_at, ... }`
- ✅ **public.users**: `{ id, email, phone, full_name, created_at, ... }`

---

## Sign-In Flow

### 1. Frontend: User submits login form
```javascript
const handleLogin = async (phone, password) => {
  // Supabase verifies password against auth.users
  const { data, error } = await supabase.auth.signInWithPassword({
    email: getUserEmailByPhone(phone), // or use phone directly
    password: password
  });
  
  if (error) return;
  
  // Get user profile from public.users
  const { data: profile } = await supabase
    .from('users')
    .select('*')
    .eq('id', data.user.id)
    .single();
  
  return { auth: data.user, profile };
};
```

### 2. What happens
1. User enters phone + password
2. Supabase looks up user in `auth.users` by email/phone
3. Verifies password (Supabase handles decryption)
4. Returns JWT token if correct
5. Frontend stores token + retrieves user profile from `public.users`

---

## Password & Security

### Where Passwords are Stored
- **`auth.users.encrypted_password`** - Supabase stores encrypted passwords here
- Supabase uses **bcrypt** for hashing (industry standard)
- You NEVER see raw passwords
- Passwords are hashed server-side

### Password Reset Flow
```javascript
const resetPassword = async (email) => {
  // Supabase sends reset link to email
  const { error } = await supabase.auth.resetPasswordForEmail(email);
  return error;
};

// User clicks link, sets new password
const updatePassword = async (newPassword) => {
  const { error } = await supabase.auth.updateUser({
    password: newPassword
  });
  return error;
};
```

### Change Password (Logged-in User)
```javascript
const changePassword = async (newPassword) => {
  const { error } = await supabase.auth.updateUser({
    password: newPassword
  });
  return error;
};
```

---

## Complete User Tables SQL

Run ALL of this in Supabase SQL Editor:

```sql
-- ============================================
-- USER PROFILE TABLE
-- ============================================
CREATE TABLE public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email VARCHAR NOT NULL UNIQUE,
  phone VARCHAR NOT NULL UNIQUE,
  full_name VARCHAR,
  profile_picture VARCHAR,
  address TEXT,
  city VARCHAR,
  country VARCHAR,
  date_of_birth DATE,
  preferred_payment_method VARCHAR CHECK (preferred_payment_method IN ('Mpesa', 'Bank Transfer', 'Cash', NULL)),
  language VARCHAR DEFAULT 'en',
  receive_notifications BOOLEAN DEFAULT true,
  receive_email_updates BOOLEAN DEFAULT true,
  account_status VARCHAR DEFAULT 'active' CHECK (account_status IN ('active', 'suspended', 'deleted')),
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

-- ============================================
-- ENABLE ROW LEVEL SECURITY (RLS)
-- ============================================
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- RLS Policy: Users can view their own profile
CREATE POLICY "Users can view own profile" 
  ON public.users FOR SELECT 
  USING (auth.uid() = id);

-- RLS Policy: Users can update their own profile
CREATE POLICY "Users can update own profile" 
  ON public.users FOR UPDATE 
  USING (auth.uid() = id);

-- RLS Policy: Allow insert during sign-up (temporary, can be restricted)
CREATE POLICY "Users can insert own profile on signup" 
  ON public.users FOR INSERT 
  WITH CHECK (auth.uid() = id);

-- ============================================
-- CREATE INDEXES FOR PERFORMANCE
-- ============================================
CREATE INDEX idx_users_email ON public.users(email);
CREATE INDEX idx_users_phone ON public.users(phone);
CREATE INDEX idx_users_full_name ON public.users(full_name);
CREATE INDEX idx_users_account_status ON public.users(account_status);

-- ============================================
-- OPTIONAL: User Activity Log Table
-- ============================================
CREATE TABLE public.user_activity (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  activity_type VARCHAR NOT NULL, -- 'login', 'booking', 'payment', etc.
  description TEXT,
  ip_address VARCHAR,
  user_agent TEXT,
  created_at TIMESTAMP DEFAULT now()
);

CREATE INDEX idx_user_activity_user_id ON public.user_activity(user_id);
CREATE INDEX idx_user_activity_created_at ON public.user_activity(created_at);

-- ============================================
-- OPTIONAL: User Preferences Table
-- ============================================
CREATE TABLE public.user_preferences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  preferred_team_size VARCHAR,
  preferred_move_time VARCHAR, -- 'morning', 'afternoon', 'evening'
  preferred_packing_service BOOLEAN DEFAULT false,
  preferred_storage_service BOOLEAN DEFAULT false,
  max_budget DECIMAL,
  special_requests TEXT,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

CREATE INDEX idx_user_preferences_user_id ON public.user_preferences(user_id);
```

---

## API Endpoints for User Management

### Create User (Sign-Up)
```
POST /api/users/signup
Body: {
  "email": "user@example.com",
  "phone": "254798940935",
  "password": "SecurePassword123!",
  "full_name": "John Doe"
}

Response:
{
  "success": true,
  "data": {
    "id": "uuid",
    "email": "user@example.com",
    "phone": "254798940935",
    "full_name": "John Doe",
    "created_at": "2024-01-15T10:00:00Z"
  }
}
```

### Get User Profile
```
GET /api/users/profile
Header: Authorization: Bearer <token>

Response:
{
  "success": true,
  "data": {
    "id": "uuid",
    "email": "user@example.com",
    "phone": "254798940935",
    "full_name": "John Doe",
    "address": "123 Main St",
    "city": "Nairobi",
    "preferred_payment_method": "Mpesa",
    "created_at": "2024-01-15T10:00:00Z",
    "updated_at": "2024-01-15T10:00:00Z"
  }
}
```

### Update User Profile
```
PUT /api/users/profile
Header: Authorization: Bearer <token>
Body: {
  "full_name": "Jane Doe",
  "address": "456 New St",
  "city": "Mombasa",
  "preferred_payment_method": "Bank Transfer"
}

Response:
{
  "success": true,
  "message": "Profile updated",
  "data": { ... updated profile ... }
}
```

### Change Password
```
POST /api/users/change-password
Header: Authorization: Bearer <token>
Body: {
  "current_password": "OldPassword123!",
  "new_password": "NewPassword123!"
}

Response:
{
  "success": true,
  "message": "Password changed"
}
```

### Reset Password (Forgot Password)
```
POST /api/users/reset-password
Body: {
  "email": "user@example.com"
}

Response:
{
  "success": true,
  "message": "Password reset link sent to email"
}
```

---

## Frontend: Sign-Up Implementation

```javascript
// src/pages/sign-up/components/RegistrationForm.jsx
import { useAuth } from '../../../contexts/AuthContext';

const RegistrationForm = () => {
  const { signUp } = useAuth();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      // Sign up user
      const result = await signUp(
        formData.email,
        formData.password,
        formData.phone,
        formData.fullName
      );

      if (result.error) {
        alert(result.error);
        return;
      }

      // Success - navigate to login
      navigate('/login', {
        state: { message: 'Sign-up successful! Please log in.' }
      });
    } catch (err) {
      alert('Error during sign-up: ' + err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Full Name"
        value={formData.fullName}
        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        required
      />
      <input
        type="tel"
        placeholder="Phone (254798940935)"
        value={formData.phone}
        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        required
      />
      <input
        type="password"
        placeholder="Confirm Password"
        value={formData.confirmPassword}
        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
        required
      />
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default RegistrationForm;
```

---

## Summary: User Tables & Auth

| Component | Storage | Manages |
|-----------|---------|---------|
| **Supabase Auth** | `auth.users` | Email, phone, password, JWT tokens |
| **User Profile** | `public.users` | Name, address, preferences, settings |
| **Activity Log** | `public.user_activity` | User actions (login, booking, etc.) |
| **Preferences** | `public.user_preferences` | Move preferences, budget, special requests |

**Key Points:**
- ✅ Supabase automatically encrypts passwords
- ✅ Passwords are NEVER stored in plain text
- ✅ Use `auth.users` for authentication (Supabase manages)
- ✅ Use `public.users` for profile data (you manage)
- ✅ All user passwords are bcrypt-hashed by Supabase
- ✅ Row-Level Security (RLS) ensures users can only see their own data

**Next Steps:**
1. Run the SQL in Supabase SQL Editor
2. Ensure frontend sign-up form submits to your backend
3. Backend creates records in both `auth.users` (via Supabase) and `public.users`
4. User can now log in with email/phone + password
