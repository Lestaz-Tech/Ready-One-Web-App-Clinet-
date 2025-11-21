# Backend Setup Guide

## Quick Start

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Configure Environment
```bash
# Copy the example .env file
cp .env.example .env

# Edit .env with your Supabase credentials
```

**Required Variables:**
- `VITE_SUPABASE_URL`: Your Supabase project URL (https://your-project.supabase.co)
- `VITE_SUPABASE_SERVICE_ROLE_KEY`: Supabase service role key (from Supabase dashboard → Settings → API)
- `CORS_ORIGIN`: Frontend URL (http://localhost:5173 for dev, your production URL for prod)
- `PORT`: Server port (default: 5000)
- `NODE_ENV`: Environment (development/production)

### 3. Create Supabase Tables
Run these SQL commands in your Supabase SQL Editor:

```sql
-- Bookings Table
CREATE TABLE bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  service_type VARCHAR NOT NULL,
  from_location VARCHAR NOT NULL,
  to_location VARCHAR NOT NULL,
  booking_date DATE NOT NULL,
  estimated_cost DECIMAL,
  actual_cost DECIMAL,
  status VARCHAR DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'in_progress', 'completed', 'cancelled')),
  team_id UUID,
  special_instructions TEXT,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

CREATE INDEX idx_bookings_user_id ON bookings(user_id);
CREATE INDEX idx_bookings_status ON bookings(status);
CREATE INDEX idx_bookings_date ON bookings(booking_date);

-- Support Tickets Table
CREATE TABLE support_tickets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  subject VARCHAR NOT NULL,
  description TEXT NOT NULL,
  category VARCHAR,
  priority VARCHAR DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high')),
  status VARCHAR DEFAULT 'open' CHECK (status IN ('open', 'in_progress', 'resolved', 'closed')),
  booking_id UUID REFERENCES bookings(id),
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

CREATE INDEX idx_support_user_id ON support_tickets(user_id);
CREATE INDEX idx_support_status ON support_tickets(status);

-- Payments Table
CREATE TABLE payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id UUID NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  amount DECIMAL NOT NULL,
  payment_method VARCHAR NOT NULL CHECK (payment_method IN ('Mpesa', 'Bank Transfer', 'Cash')),
  status VARCHAR DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed', 'refunded')),
  transaction_ref VARCHAR,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

CREATE INDEX idx_payments_booking_id ON payments(booking_id);
CREATE INDEX idx_payments_user_id ON payments(user_id);
CREATE INDEX idx_payments_status ON payments(status);

-- Teams Table (Optional, for company dashboard)
CREATE TABLE teams (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR NOT NULL,
  members TEXT[],
  phone VARCHAR,
  email VARCHAR,
  status VARCHAR DEFAULT 'active',
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);
```

### 4. Run the Server

**Development (with auto-reload):**
```bash
npm run dev
```

**Production:**
```bash
npm start
```

Server will start on `http://localhost:5000`

### 5. Test the API

```bash
# Health check (no auth required)
curl http://localhost:5000/api/health

# Get user bookings (requires JWT token in header)
curl -H "Authorization: Bearer <your_jwt_token>" \
  http://localhost:5000/api/bookings

# Create a booking
curl -X POST http://localhost:5000/api/bookings \
  -H "Authorization: Bearer <your_jwt_token>" \
  -H "Content-Type: application/json" \
  -d '{
    "service_type": "Local Move",
    "from_location": "123 Old St",
    "to_location": "456 New St",
    "booking_date": "2024-01-20",
    "estimated_cost": 15000
  }'
```

---

## Available Routes

### Client Routes (Require Auth)
- `GET /api/bookings` - List user bookings
- `POST /api/bookings` - Create booking
- `GET /api/bookings/:id` - Get booking details
- `PUT /api/bookings/:id` - Update booking
- `DELETE /api/bookings/:id` - Delete booking

- `GET /api/payments` - List user payments
- `POST /api/payments` - Create payment
- `GET /api/payments/booking/:booking_id` - Get payments for booking
- `PUT /api/payments/:id/status` - Update payment status

- `GET /api/support` - List user support tickets
- `POST /api/support` - Create support ticket
- `GET /api/support/:id` - Get ticket details
- `PUT /api/support/:id/status` - Update ticket status

- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `GET /api/users/stats` - Get user statistics

### Admin Routes (Require Auth + Admin Role)
- `GET /api/admin/dashboard/summary` - Dashboard overview
- `GET /api/admin/bookings` - List all bookings (with filters)
- `GET /api/admin/bookings/unassigned/list` - List unassigned bookings
- `PUT /api/admin/bookings/:id/status` - Update booking status
- `PUT /api/admin/bookings/:id/assign-team` - Assign team to booking
- `GET /api/admin/teams` - List all teams
- `POST /api/admin/teams` - Create team
- `PUT /api/admin/teams/:id` - Update team
- `GET /api/admin/support` - List all support tickets
- `PUT /api/admin/support/:id/status` - Update ticket status

---

## Connecting Frontend to Backend

### Update Frontend .env
Add backend URL to your frontend `.env.local`:
```
VITE_API_URL=http://localhost:5000
```

### Update API Calls
In your React components, replace fetch calls to use the backend:

```javascript
// Before (using Supabase directly)
const { data } = await supabase
  .from('bookings')
  .select('*');

// After (using backend API)
const response = await fetch(`${import.meta.env.VITE_API_URL}/api/bookings`, {
  headers: {
    'Authorization': `Bearer ${userToken}`
  }
});
const { data } = await response.json();
```

---

## Troubleshooting

### "Invalid token" Error
- Ensure Supabase credentials are correct in `.env`
- Frontend must send valid JWT token in Authorization header
- Token should be obtained from `supabase.auth.getSession()`

### CORS Error
- Check `CORS_ORIGIN` in `.env` matches your frontend URL
- For local dev: `http://localhost:5173,http://localhost:3000`
- For production: Add your Netlify domain

### Database Connection Error
- Verify `VITE_SUPABASE_URL` and `VITE_SUPABASE_SERVICE_ROLE_KEY` are correct
- Check that required tables exist in Supabase
- Ensure service role key has proper permissions

### Port Already in Use
```bash
# Change PORT in .env or use:
PORT=5001 npm start
```

---

## Production Deployment

### Option 1: Railway
1. Connect GitHub repo to Railway
2. Set environment variables in Railway dashboard
3. Deploy

### Option 2: Heroku
```bash
heroku create ready-one-api
heroku config:set VITE_SUPABASE_URL=your-url
heroku config:set VITE_SUPABASE_SERVICE_ROLE_KEY=your-key
git push heroku main
```

### Option 3: Self-Hosted (VPS)
```bash
# On your server
git clone <your-repo>
cd backend
npm install
npm start

# Or use PM2 for production
npm install -g pm2
pm2 start server.js --name "ready-one-api"
```

---

## Next Steps

1. **Create Supabase tables** (see section above)
2. **Update frontend** to connect to backend API
3. **Test locally** before deploying
4. **Deploy backend** to production (Railway/Heroku)
5. **Update frontend** VITE_API_URL to production backend URL
6. **Deploy frontend** to Netlify

For detailed API documentation, see `API_DOCUMENTATION.md`
