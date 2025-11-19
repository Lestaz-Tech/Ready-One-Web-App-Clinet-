import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import { supabase } from '../../../lib/supabaseClient';
import { useAuth } from '../../../contexts/AuthContext';

const SupportPage = () => {
  const { user } = useAuth();
  const [form, setForm] = useState({ subject: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (!user) {
      setError('You must be logged in to submit a ticket.');
      return;
    }
    setLoading(true);
    try {
      const { data, error } = await supabase.from('support_tickets').insert([{ user_id: user.id, subject: form.subject, message: form.message }]).select();
      if (error) throw error;
      setSuccess('Ticket submitted successfully. We will get back to you shortly.');
      setForm({ subject: '', message: '' });
    } catch (err) {
      setError(err.message || 'Failed to submit ticket');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Helmet><title>Support & Help</title></Helmet>
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Support & Help Center</h2>
        <p className="text-sm text-muted-foreground mb-6">Submit a support ticket or complaint and our team will respond.</p>

        <form onSubmit={handleSubmit} className="bg-card p-6 rounded-2xl border border-border space-y-4">
          {error && <div className="p-3 bg-error/10 text-error rounded">{error}</div>}
          {success && <div className="p-3 bg-success/10 text-success rounded">{success}</div>}

          <Input label="Subject" name="subject" value={form.subject} onChange={handleChange} required />
          <label className="block">
            <span className="text-sm font-medium">Message</span>
            <textarea name="message" value={form.message} onChange={handleChange} rows={6} className="mt-2 block w-full rounded-md border border-border p-2" />
          </label>

          <div className="flex justify-end">
            <Button type="submit" loading={loading}>{loading ? 'Submitting...' : 'Submit Ticket'}</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SupportPage;
