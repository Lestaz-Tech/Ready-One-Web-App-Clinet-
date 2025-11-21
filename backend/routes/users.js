const express = require('express');
const { createClient } = require('@supabase/supabase-js');

const router = express.Router();
const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_SERVICE_ROLE_KEY
);

// Initialize Supabase Storage
const storage = supabase.storage.from('profile_pictures');

// GET user profile
router.get('/profile', async (req, res) => {
  try {
    const { data: user, error } = await supabase.auth.admin.getUserById(req.user.id);

    if (error || !user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Also fetch from public.users table for complete profile data
    const { data: profile } = await supabase
      .from('users')
      .select('*')
      .eq('id', req.user.id)
      .single();

    res.json({
      success: true,
      data: {
        id: user.id,
        email: user.email,
        phone: user.phone,
        user_metadata: user.user_metadata || {},
        profile_picture_url: profile?.profile_picture_url || null,
        has_profile_picture: profile?.has_profile_picture || false
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT update user profile with optional profile picture
router.put('/profile', async (req, res) => {
  try {
    const { full_name, phone, profile_picture_base64 } = req.body;

    console.log('[Users] Profile update request:', {
      user_id: req.user.id,
      full_name,
      phone,
      has_profile_picture: !!profile_picture_base64
    });

    let profilePictureUrl = null;

    // Handle profile picture upload to Supabase Storage
    if (profile_picture_base64) {
      try {
        // Convert base64 to buffer
        const base64Data = profile_picture_base64.split(',')[1] || profile_picture_base64;
        const buffer = Buffer.from(base64Data, 'base64');

        // Generate unique filename
        const filename = `${req.user.id}_${Date.now()}.jpg`;
        const filepath = `${req.user.id}/${filename}`;

        console.log('[Users] Uploading profile picture to Storage:', { filepath, size: buffer.length });

        // Upload to Supabase Storage
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('profile_pictures')
          .upload(filepath, buffer, {
            contentType: 'image/jpeg',
            upsert: false
          });

        if (uploadError) {
          console.error('[Users] Storage upload error:', uploadError);
          throw new Error(`Failed to upload profile picture: ${uploadError.message}`);
        }

        // Get public URL
        const { data: urlData } = supabase.storage
          .from('profile_pictures')
          .getPublicUrl(filepath);

        profilePictureUrl = urlData.publicUrl;
        console.log('[Users] Profile picture uploaded successfully:', { url: profilePictureUrl });
      } catch (uploadErr) {
        console.error('[Users] Profile picture upload failed:', uploadErr.message);
        return res.status(400).json({ error: `Profile picture upload failed: ${uploadErr.message}` });
      }
    }

    // Update user metadata in auth.users
    const updates = {
      user_metadata: {}
    };

    if (full_name) updates.user_metadata.full_name = full_name;
    if (phone) updates.user_metadata.phone = phone;
    if (profilePictureUrl) {
      updates.user_metadata.profile_picture_url = profilePictureUrl;
      updates.user_metadata.has_profile_picture = true;
    }

    // Only update if there are actual changes
    if (Object.keys(updates.user_metadata).length === 0) {
      console.warn('[Users] No fields to update');
      return res.status(400).json({ error: 'No fields to update' });
    }

    console.log('[Users] Sending update to Supabase:', { user_id: req.user.id, metadata_fields: Object.keys(updates.user_metadata) });

    const { data, error } = await supabase.auth.admin.updateUserById(
      req.user.id,
      updates
    );

    if (error) {
      console.error('[Users] Supabase auth update error:', error);
      throw error;
    }

    // Also update public.users table for record keeping
    const { error: dbError } = await supabase
      .from('users')
      .update({
        full_name,
        phone,
        profile_picture_url: profilePictureUrl || undefined,
        has_profile_picture: !!profilePictureUrl
      })
      .eq('id', req.user.id);

    if (dbError) {
      console.warn('[Users] Database update warning (non-critical):', dbError);
      // Don't throw error here, as auth metadata is more important
    }

    console.log('[Users] Profile updated successfully');

    res.json({
      success: true,
      message: 'Profile updated successfully',
      data: {
        id: data.user.id,
        email: data.user.email,
        phone: data.user.phone,
        user_metadata: data.user.user_metadata,
        profile_picture_url: profilePictureUrl
      }
    });
  } catch (err) {
    console.error('[Users] Error updating profile:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// GET user statistics
router.get('/stats', async (req, res) => {
  try {
    // Get total bookings
    const { count: totalBookings } = await supabase
      .from('bookings')
      .select('id', { count: 'exact', head: true })
      .eq('user_id', req.user.id);

    // Get completed bookings
    const { count: completedBookings } = await supabase
      .from('bookings')
      .select('id', { count: 'exact', head: true })
      .eq('user_id', req.user.id)
      .eq('status', 'completed');

    // Get pending bookings
    const { count: pendingBookings } = await supabase
      .from('bookings')
      .select('id', { count: 'exact', head: true })
      .eq('user_id', req.user.id)
      .eq('status', 'pending');

    // Get total spent
    const { data: payments } = await supabase
      .from('payments')
      .select('amount')
      .eq('user_id', req.user.id)
      .eq('status', 'completed');

    const totalSpent = payments?.reduce((sum, p) => sum + (p.amount || 0), 0) || 0;

    res.json({
      success: true,
      data: {
        total_bookings: totalBookings || 0,
        completed_bookings: completedBookings || 0,
        pending_bookings: pendingBookings || 0,
        total_spent: totalSpent
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
