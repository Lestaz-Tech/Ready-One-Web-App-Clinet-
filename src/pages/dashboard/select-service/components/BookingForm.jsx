import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Input from '../../../../components/ui/Input';
import Button from '../../../../components/ui/Button';
import { supabase } from '../../../../lib/supabaseClient';
import { useAuth } from '../../../../contexts/AuthContext';

const BookingForm = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [form, setForm] = useState({
    service_type: 'House Moving',
    from_location: '',
    to_location: '',
    floor_number: '',
    move_date: '',
    notes: '',
    price_estimate: '',
    payment_method: 'Cash'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!user) {
      setError('You must be logged in to make a booking.');
      return;
    }

    setLoading(true);
    try {
      const payload = {
        user_id: user?.id,
        service_type: form.service_type,
        from_location: form.from_location,
        to_location: form.to_location,
        floor_number: form.floor_number,
        move_date: form.move_date ? new Date(form.move_date).toISOString() : null,
        images: [],
        notes: form.notes,
        price_estimate: form.price_estimate ? Number(form.price_estimate) : null,
        payment_method: form.payment_method,
        payment_status: 'pending',
        status: 'pending'
      };

      const { data, error: insertError } = await supabase.from('bookings').insert([payload]).select();
      if (insertError) throw insertError;

      // redirect to bookings list
      navigate('/dashboard/bookings');
    } catch (err) {
      setError(err.message || 'Failed to create booking');
    } finally {
      setLoading(false);
    }
  };

  // Prefill from query param `service`
  const location = useLocation();
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const service = params.get('service');
    if (service) {
      setForm(prev => ({ ...prev, service_type: decodeURIComponent(service) }));
    }
  }, [location.search]);

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-card p-6 rounded-2xl border border-border shadow-sm">
      {error && <div className="p-3 bg-error/10 text-error rounded">{error}</div>}

      <label className="block">
        <span className="text-sm font-medium">Service Type</span>
        <select name="service_type" value={form.service_type} onChange={handleChange} className="mt-2 block w-full rounded-md border border-border p-2">
          <option>House Moving</option>
          <option>Office Moving</option>
          <option>Long Distance Moving</option>
          <option>Furniture Moving</option>
          <option>Packing & Unpacking</option>
        </select>
      </label>

      <Input label="From (Pick-up location)" name="from_location" value={form.from_location} onChange={handleChange} required />
      <Input label="To (Destination)" name="to_location" value={form.to_location} onChange={handleChange} required />
      <Input label="Floor / Access" name="floor_number" value={form.floor_number} onChange={handleChange} />
      <Input label="Move Date" name="move_date" type="date" value={form.move_date} onChange={handleChange} />
      <Input label="Price Estimate (KES)" name="price_estimate" type="number" value={form.price_estimate} onChange={handleChange} />
      <label className="block">
        <span className="text-sm font-medium">Payment Method</span>
        <select name="payment_method" value={form.payment_method} onChange={handleChange} className="mt-2 block w-full rounded-md border border-border p-2">
          <option>Cash</option>
          <option>Mpesa</option>
          <option>Card</option>
        </select>
      </label>

      <label className="block">
        <span className="text-sm font-medium">Notes (optional)</span>
        <textarea name="notes" value={form.notes} onChange={handleChange} className="mt-2 block w-full rounded-md border border-border p-2" rows={4} />
      </label>

      <div className="flex items-center justify-end">
        <Button type="submit" variant="default" loading={loading}>{loading ? 'Booking...' : 'Confirm & Book'}</Button>
      </div>
    </form>
  );
};

export default BookingForm;
