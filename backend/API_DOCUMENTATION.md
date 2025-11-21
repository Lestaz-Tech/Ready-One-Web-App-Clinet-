# Ready One Backend API Documentation

## Overview
REST API backend for Ready One Movers client app and company management dashboard. Built with Node.js + Express + Supabase.

## Getting Started

### Prerequisites
- Node.js 14+
- npm or yarn
- Supabase project with required tables

### Installation
```bash
cd backend
npm install
```

### Environment Setup
1. Copy `.env.example` to `.env`
2. Fill in your Supabase credentials:
   - `VITE_SUPABASE_URL`: Your Supabase project URL
   - `VITE_SUPABASE_SERVICE_ROLE_KEY`: Service role key (for admin operations)
3. Set `CORS_ORIGIN` to your frontend URL

### Running the Server
```bash
# Development (watch mode)
npm run dev

# Production
npm start
```

Server runs on `http://localhost:5000` by default.

---

## Authentication

All endpoints (except `/api/health`) require Bearer token authentication via Supabase JWT.

**Header Required:**
```
Authorization: Bearer <supabase_jwt_token>
```

---

## API Endpoints

### Health Check
```
GET /api/health
```
No auth required. Returns server status.

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2024-01-15T10:30:00Z"
}
```

---

## Client Endpoints

### Bookings

#### Get All User Bookings
```
GET /api/bookings
```
Fetch all bookings for authenticated user.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "user_id": "uuid",
      "service_type": "Local Move",
      "from_location": "123 Old St, Nairobi",
      "to_location": "456 New St, Nairobi",
      "booking_date": "2024-01-20",
      "estimated_cost": 15000,
      "status": "confirmed",
      "team_id": null,
      "special_instructions": "Handle fragile items",
      "created_at": "2024-01-15T08:00:00Z",
      "updated_at": "2024-01-15T08:00:00Z"
    }
  ]
}
```

#### Get Single Booking
```
GET /api/bookings/:id
```
Fetch booking details by ID (must own booking).

#### Create Booking
```
POST /api/bookings
Content-Type: application/json

{
  "service_type": "Local Move",
  "from_location": "123 Old St, Nairobi",
  "to_location": "456 New St, Nairobi",
  "booking_date": "2024-01-20",
  "estimated_cost": 15000,
  "special_instructions": "Handle fragile items"
}
```

**Response:** `201 Created` with booking object

#### Update Booking
```
PUT /api/bookings/:id
Content-Type: application/json

{
  "from_location": "789 New Address",
  "booking_date": "2024-01-21"
}
```

#### Delete Booking
```
DELETE /api/bookings/:id
```

---

### Payments

#### Get All User Payments
```
GET /api/payments
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "booking_id": "uuid",
      "user_id": "uuid",
      "amount": 15000,
      "payment_method": "Mpesa",
      "status": "completed",
      "transaction_ref": "MPE123456",
      "created_at": "2024-01-15T10:00:00Z",
      "updated_at": "2024-01-15T10:00:00Z"
    }
  ]
}
```

#### Get Payments for Specific Booking
```
GET /api/payments/booking/:booking_id
```

#### Create Payment
```
POST /api/payments
Content-Type: application/json

{
  "booking_id": "uuid",
  "amount": 15000,
  "payment_method": "Mpesa",
  "transaction_ref": "MPE123456"
}
```

**Required Fields:**
- `booking_id`: UUID of the booking
- `amount`: Payment amount (required)
- `payment_method`: "Mpesa" | "Bank Transfer" | "Cash"

#### Update Payment Status
```
PUT /api/payments/:id/status
Content-Type: application/json

{
  "status": "completed"
}
```

**Valid Statuses:** `pending`, `completed`, `failed`, `refunded`

---

### Support Tickets

#### Get All User Support Tickets
```
GET /api/support
```

#### Get Single Support Ticket
```
GET /api/support/:id
```

#### Create Support Ticket
```
POST /api/support
Content-Type: application/json

{
  "subject": "Question about booking",
  "description": "I need to reschedule my move",
  "category": "Reschedule",
  "priority": "medium",
  "booking_id": "uuid (optional)"
}
```

#### Update Support Ticket Status
```
PUT /api/support/:id/status
Content-Type: application/json

{
  "status": "in_progress"
}
```

**Valid Statuses:** `open`, `in_progress`, `resolved`, `closed`

---

### User Profile

#### Get User Profile
```
GET /api/users/profile
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "email": "user@example.com",
    "phone": "254798940935",
    "user_metadata": {
      "full_name": "John Doe"
    }
  }
}
```

#### Update User Profile
```
PUT /api/users/profile
Content-Type: application/json

{
  "full_name": "Jane Doe",
  "phone": "254798940936"
}
```

#### Get User Statistics
```
GET /api/users/stats
```

**Response:**
```json
{
  "success": true,
  "data": {
    "total_bookings": 5,
    "completed_bookings": 3,
    "pending_bookings": 2,
    "total_spent": 45000
  }
}
```

---

## Admin Endpoints

**Note:** Admin endpoints require `is_admin: true` in user metadata. Requires separate admin authentication setup.

### Admin Dashboard

#### Get Dashboard Summary
```
GET /api/admin/dashboard/summary
```

**Response:**
```json
{
  "success": true,
  "data": {
    "by_status": {
      "pending": 5,
      "confirmed": 8,
      "in_progress": 3,
      "completed": 42,
      "cancelled": 2
    },
    "today_bookings": 3,
    "total_bookings": 60
  }
}
```

---

### Admin Bookings Management

#### Get All Bookings (Company-wide)
```
GET /api/admin/bookings?status=pending&limit=50&offset=0
```

**Query Parameters:**
- `status`: Filter by status (optional)
- `date_from`: Filter from date (optional, ISO format)
- `date_to`: Filter to date (optional, ISO format)
- `limit`: Results per page (default: 100)
- `offset`: Pagination offset (default: 0)

#### Get Single Booking (Company Context)
```
GET /api/admin/bookings/:id
```

#### Update Booking Status
```
PUT /api/admin/bookings/:id/status
Content-Type: application/json

{
  "status": "confirmed"
}
```

#### Assign Team to Booking
```
PUT /api/admin/bookings/:id/assign-team
Content-Type: application/json

{
  "team_id": "uuid",
  "assigned_date": "2024-01-15T10:00:00Z (optional)"
}
```

#### Get Unassigned Bookings
```
GET /api/admin/bookings/unassigned/list
```
Returns all pending bookings without team assignments.

---

### Admin Team Management

#### Get All Teams
```
GET /api/admin/teams
```

#### Create Team
```
POST /api/admin/teams
Content-Type: application/json

{
  "name": "Team Alpha",
  "members": ["John", "Jane", "Bob"],
  "phone": "+254798940935",
  "email": "team@readyonemovers.com"
}
```

#### Update Team
```
PUT /api/admin/teams/:id
Content-Type: application/json

{
  "name": "Team Alpha Updated",
  "status": "active"
}
```

---

### Admin Support Management

#### Get All Support Tickets
```
GET /api/admin/support?status=open&priority=high&limit=50&offset=0
```

**Query Parameters:**
- `status`: Filter by status (optional)
- `priority`: Filter by priority (optional)
- `limit`: Results per page (default: 50)
- `offset`: Pagination offset (default: 0)

#### Update Support Ticket Status
```
PUT /api/admin/support/:id/status
Content-Type: application/json

{
  "status": "resolved"
}
```

---

## Database Schema

### Tables Required in Supabase

#### bookings
```sql
CREATE TABLE bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id),
  service_type VARCHAR NOT NULL,
  from_location VARCHAR NOT NULL,
  to_location VARCHAR NOT NULL,
  booking_date DATE NOT NULL,
  estimated_cost DECIMAL,
  actual_cost DECIMAL,
  status VARCHAR DEFAULT 'pending',
  team_id UUID,
  special_instructions TEXT,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);
```

#### support_tickets
```sql
CREATE TABLE support_tickets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id),
  subject VARCHAR NOT NULL,
  description TEXT NOT NULL,
  category VARCHAR,
  priority VARCHAR DEFAULT 'medium',
  status VARCHAR DEFAULT 'open',
  booking_id UUID REFERENCES bookings(id),
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);
```

#### payments
```sql
CREATE TABLE payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id UUID NOT NULL REFERENCES bookings(id),
  user_id UUID NOT NULL REFERENCES auth.users(id),
  amount DECIMAL NOT NULL,
  payment_method VARCHAR NOT NULL,
  status VARCHAR DEFAULT 'pending',
  transaction_ref VARCHAR,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);
```

#### teams (Optional for company dashboard)
```sql
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

---

## Error Handling

All errors follow this format:

```json
{
  "error": "Error message",
  "status": 400,
  "timestamp": "2024-01-15T10:30:00Z"
}
```

**Common Status Codes:**
- `200`: Success
- `201`: Created
- `400`: Bad Request (invalid data)
- `401`: Unauthorized (missing/invalid token)
- `403`: Forbidden (insufficient permissions)
- `404`: Not Found
- `500`: Server Error

---

## Frontend Integration

### Example: Fetch Bookings
```javascript
const token = localStorage.getItem('supabase_token'); // From AuthContext

const response = await fetch('http://localhost:5000/api/bookings', {
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
});

const { data } = await response.json();
```

### Example: Create Booking
```javascript
const response = await fetch('http://localhost:5000/api/bookings', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    service_type: 'Local Move',
    from_location: '123 Old St',
    to_location: '456 New St',
    booking_date: '2024-01-20',
    estimated_cost: 15000
  })
});

const { data } = await response.json();
```

---

## Deployment

### Deploy to Railway
1. Connect GitHub repo to Railway
2. Add environment variables (copy from `.env.example`)
3. Deploy

### Deploy to Heroku
```bash
heroku create ready-one-api
git push heroku main
heroku config:set VITE_SUPABASE_URL=...
heroku config:set VITE_SUPABASE_SERVICE_ROLE_KEY=...
```

---

## Support
For issues or questions, contact: support@readyonemovers.com
