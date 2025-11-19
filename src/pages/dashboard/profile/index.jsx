import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import { useAuth } from '../../../contexts/AuthContext';
import { supabase } from '../../../lib/supabaseClient';

const ProfilePage = () => {
  const { user } = useAuth();
  const [fullName, setFullName] = useState(user?.user_metadata?.full_name || '');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleUpdate = async (e) => {
    e.preventDefault();
    setMessage('');
    setLoading(true);
    try {
      const updates = { data: { full_name: fullName } };
      const { error } = await supabase.auth.updateUser(updates);
      if (error) throw error;
      setMessage('Profile updated');
    } catch (err) {
      setMessage(err.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Helmet><title>Profile Settings</title></Helmet>
      <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Profile</h2>
        <p className="text-sm text-muted-foreground mb-6">Manage your account and profile details.</p>

        <form onSubmit={handleUpdate} className="bg-card p-6 rounded-2xl border border-border space-y-4">
          {message && <div className="p-3 bg-muted text-muted-foreground rounded">{message}</div>}

          <Input label="Full Name" name="fullName" value={fullName} onChange={(e) => setFullName(e.target.value)} />
          <Input label="Email" name="email" value={user?.email || ''} disabled />

          <div className="flex justify-end">
            <Button type="submit" loading={loading}>{loading ? 'Saving...' : 'Save Changes'}</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
