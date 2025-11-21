const express = require('express');
const { createClient } = require('@supabase/supabase-js');

const router = express.Router();
const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_SERVICE_ROLE_KEY
);

// Middleware to check admin status (can be expanded based on your company structure)
const requireAdmin = async (req, res, next) => {
  try {
    // For now, check if user has admin role in user_metadata or a separate admin table
    // This can be enhanced based on your Supabase schema
    const { data: user } = await supabase.auth.admin.getUserById(req.user.id);
    
    if (!user?.user_metadata?.is_admin) {
      return res.status(403).json({ error: 'Admin access required' });
    }
    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET all bookings (company-wide)
router.get('/bookings', requireAdmin, async (req, res) => {
  try {
    const { status, date_from, date_to, limit = 100, offset = 0 } = req.query;

    let query = supabase.from('bookings').select('*', { count: 'exact' });

    if (status) {
      query = query.eq('status', status);
    }

    if (date_from) {
      query = query.gte('booking_date', date_from);
    }

    if (date_to) {
      query = query.lte('booking_date', date_to);
    }

    const { data, count, error } = await query
      .order('booking_date', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) throw error;

    res.json({
      success: true,
      data,
      pagination: {
        total: count,
        limit: parseInt(limit),
        offset: parseInt(offset)
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET single booking detail
router.get('/bookings/:id', requireAdmin, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .eq('id', req.params.id)
      .single();

    if (error || !data) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT update booking status
router.put('/bookings/:id/status', requireAdmin, async (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ['pending', 'confirmed', 'in_progress', 'completed', 'cancelled'];

    if (!status || !validStatuses.includes(status)) {
      return res.status(400).json({ error: 'Invalid status value' });
    }

    const { data, error } = await supabase
      .from('bookings')
      .update({ status, updated_at: new Date() })
      .eq('id', req.params.id)
      .select()
      .single();

    if (error || !data) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    res.json({ success: true, message: 'Booking status updated', data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT assign team to booking
router.put('/bookings/:id/assign-team', requireAdmin, async (req, res) => {
  try {
    const { team_id, assigned_date } = req.body;

    if (!team_id) {
      return res.status(400).json({ error: 'team_id is required' });
    }

    const { data, error } = await supabase
      .from('bookings')
      .update({ 
        team_id,
        assigned_date: assigned_date || new Date(),
        status: 'confirmed',
        updated_at: new Date()
      })
      .eq('id', req.params.id)
      .select()
      .single();

    if (error || !data) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    res.json({ success: true, message: 'Team assigned to booking', data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET all teams
router.get('/teams', requireAdmin, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('teams')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    res.json({ success: true, data: data || [] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST create team
router.post('/teams', requireAdmin, async (req, res) => {
  try {
    const { name, members, phone, email } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'Team name is required' });
    }

    const { data, error } = await supabase
      .from('teams')
      .insert([{
        name,
        members: members || [],
        phone,
        email,
        created_at: new Date(),
        status: 'active'
      }])
      .select()
      .single();

    if (error) throw error;

    res.status(201).json({ success: true, data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT update team
router.put('/teams/:id', requireAdmin, async (req, res) => {
  try {
    const { name, members, phone, email, status } = req.body;

    const { data, error } = await supabase
      .from('teams')
      .update({
        ...(name && { name }),
        ...(members && { members }),
        ...(phone && { phone }),
        ...(email && { email }),
        ...(status && { status }),
        updated_at: new Date()
      })
      .eq('id', req.params.id)
      .select()
      .single();

    if (error || !data) {
      return res.status(404).json({ error: 'Team not found' });
    }

    res.json({ success: true, message: 'Team updated', data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET bookings by status (dashboard summary)
router.get('/dashboard/summary', requireAdmin, async (req, res) => {
  try {
    // Get counts by status
    const statuses = ['pending', 'confirmed', 'in_progress', 'completed', 'cancelled'];
    const summary = {};

    for (const status of statuses) {
      const { count } = await supabase
        .from('bookings')
        .select('id', { count: 'exact', head: true })
        .eq('status', status);
      summary[status] = count || 0;
    }

    // Get today's bookings
    const today = new Date().toISOString().split('T')[0];
    const { count: todayBookings } = await supabase
      .from('bookings')
      .select('id', { count: 'exact', head: true })
      .gte('booking_date', `${today}T00:00:00`)
      .lte('booking_date', `${today}T23:59:59`);

    res.json({
      success: true,
      data: {
        by_status: summary,
        today_bookings: todayBookings || 0,
        total_bookings: Object.values(summary).reduce((a, b) => a + b, 0)
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET unassigned bookings
router.get('/bookings/unassigned/list', requireAdmin, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .is('team_id', null)
      .eq('status', 'pending')
      .order('booking_date', { ascending: true });

    if (error) throw error;

    res.json({ success: true, data: data || [] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET support tickets (company-wide)
router.get('/support', requireAdmin, async (req, res) => {
  try {
    const { status, priority, limit = 50, offset = 0 } = req.query;

    let query = supabase.from('support_tickets').select('*', { count: 'exact' });

    if (status) {
      query = query.eq('status', status);
    }

    if (priority) {
      query = query.eq('priority', priority);
    }

    const { data, count, error } = await query
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) throw error;

    res.json({
      success: true,
      data,
      pagination: {
        total: count,
        limit: parseInt(limit),
        offset: parseInt(offset)
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT update support ticket status
router.put('/support/:id/status', requireAdmin, async (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ['open', 'in_progress', 'resolved', 'closed'];

    if (!status || !validStatuses.includes(status)) {
      return res.status(400).json({ error: 'Invalid status value' });
    }

    const { data, error } = await supabase
      .from('support_tickets')
      .update({ status, updated_at: new Date() })
      .eq('id', req.params.id)
      .select()
      .single();

    if (error || !data) {
      return res.status(404).json({ error: 'Support ticket not found' });
    }

    res.json({ success: true, message: 'Ticket status updated', data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
