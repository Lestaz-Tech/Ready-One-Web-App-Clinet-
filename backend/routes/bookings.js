const express = require('express');
const { createClient } = require('@supabase/supabase-js');
const { v4: uuidv4 } = require('uuid');

const router = express.Router();
const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_SERVICE_ROLE_KEY
);

// GET all bookings for user
router.get('/', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .eq('user_id', req.user.id)
      .order('created_at', { ascending: false });

    if (error) throw error;

    res.json({
      success: true,
      data,
      count: data?.length || 0
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET single booking
router.get('/:id', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .eq('id', req.params.id)
      .eq('user_id', req.user.id)
      .single();

    if (error || !data) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST create booking
router.post('/', async (req, res) => {
  try {
    const {
      service_type,
      from_location,
      to_location,
      booking_date,
      notes,
      estimated_cost,
      payment_method
    } = req.body;

    console.log('[Bookings] POST request received:', {
      service_type,
      from_location,
      to_location,
      booking_date,
      user_id: req.user.id
    });

    // Validate required fields
    if (!service_type || !from_location || !to_location || !booking_date) {
      console.error('[Bookings] Missing required fields:', { service_type, from_location, to_location, booking_date });
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const booking = {
      id: uuidv4(),
      user_id: req.user.id,
      service_type,
      from_location,
      to_location,
      booking_date: booking_date.split('T')[0], // Convert to DATE format (YYYY-MM-DD)
      special_instructions: notes || null,
      estimated_cost: estimated_cost ? Number(estimated_cost) : null,
      status: 'pending',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    console.log('[Bookings] Inserting booking:', booking);

    const { data, error } = await supabase
      .from('bookings')
      .insert([booking])
      .select();

    if (error) {
      console.error('[Bookings] Supabase insert error:', error);
      throw error;
    }

    console.log('[Bookings] Booking created successfully:', data);

    res.status(201).json({
      success: true,
      message: 'Booking created successfully',
      data: data[0]
    });
  } catch (err) {
    console.error('[Bookings] Error creating booking:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// PUT update booking
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // Verify ownership
    const { data: booking, error: fetchError } = await supabase
      .from('bookings')
      .select('user_id')
      .eq('id', id)
      .single();

    if (fetchError || !booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    if (booking.user_id !== req.user.id) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    // Update booking
    const { data, error } = await supabase
      .from('bookings')
      .update({
        ...updates,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select();

    if (error) throw error;

    res.json({
      success: true,
      message: 'Booking updated successfully',
      data: data[0]
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE booking
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Verify ownership
    const { data: booking, error: fetchError } = await supabase
      .from('bookings')
      .select('user_id')
      .eq('id', id)
      .single();

    if (fetchError || !booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    if (booking.user_id !== req.user.id) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    const { error } = await supabase
      .from('bookings')
      .delete()
      .eq('id', id);

    if (error) throw error;

    res.json({
      success: true,
      message: 'Booking deleted successfully'
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
