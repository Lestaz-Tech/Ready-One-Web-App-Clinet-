import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { supabase } from '../../../../lib/supabaseClient';
import { useAuth } from '../../../../contexts/AuthContext';
import Button from '../../../../components/ui/Button';

const BookingDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      if (!user) return;
      setLoading(true);
      const { data, error } = await supabase.from('bookings').select('*').eq('id', id).single();
      if (error) {
        console.warn('Failed to load booking', error);
      } else {
        setBooking(data);
      }
      setLoading(false);
    };
    load();
  }, [id, user]);

  if (loading) return <div>Loading booking...</div>;

  if (!booking) return (
    <div className="p-6 bg-card rounded border border-border">Booking not found.</div>
  );

  return (
    <div>
      <Helmet>
        <title>Booking #{booking?.id}</title>
      </Helmet>

      <div className="max-w-3xl mx-auto bg-card p-6 rounded border border-border shadow-sm">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold mb-2">{booking?.service_type || 'Booking Details'}</h2>
            <p className="text-sm text-muted-foreground">{booking?.from_location} → {booking?.to_location}</p>
            <p className="text-sm text-muted-foreground">Move date: {booking?.move_date ? new Date(booking.move_date).toLocaleString() : '—'}</p>
            <p className="text-sm text-muted-foreground">Status: <span className="font-medium">{booking?.status}</span></p>
          </div>
          <div className="text-right">
            <div className="text-lg font-bold">{booking?.price_estimate ? `KES ${booking.price_estimate}` : '-'}</div>
            <div className="mt-3">
              <Button variant="outline" size="sm" onClick={() => navigate(-1)}>Back</Button>
            </div>
          </div>
        </div>

        {booking?.notes && (
          <div className="mt-6">
            <h4 className="font-semibold mb-2">Notes</h4>
            <p className="text-muted-foreground">{booking.notes}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingDetail;
