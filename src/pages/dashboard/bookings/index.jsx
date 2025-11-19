import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { supabase } from '../../../lib/supabaseClient';
import { useAuth } from '../../../contexts/AuthContext';
import Button from '../../../components/ui/Button';

const BookingsPage = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      if (!user) return;
      setLoading(true);
      const { data, error } = await supabase.from('bookings').select('*').eq('user_id', user.id).order('created_at', { ascending: false });
      if (error) {
        console.warn('Failed to load bookings', error);
      } else {
        setBookings(data || []);
      }
      setLoading(false);
    };

    load();
  }, [user]);

  return (
    <div>
      <Helmet>
        <title>My Bookings</title>
      </Helmet>

      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Booking History</h2>
        {loading ? (
          <div>Loading...</div>
        ) : bookings.length === 0 ? (
          <div className="p-6 bg-card rounded text-muted-foreground">No bookings found. Create a new booking from Select Service.</div>
        ) : (
          <div className="space-y-4">
            {bookings.map(b => (
              <div key={b.id} className="bg-card p-4 rounded shadow-sm border border-border flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-lg">{b.service_type}</h3>
                  <p className="text-sm text-muted-foreground">{b.from_location} → {b.to_location}</p>
                  <p className="text-sm text-muted-foreground">Move date: {b.move_date ? new Date(b.move_date).toLocaleString() : '—'}</p>
                  <p className="text-sm text-muted-foreground mt-2">Status: <span className="font-medium">{b.status}</span></p>
                </div>
                <div className="text-right">
                  <div className="text-sm text-muted-foreground">{b.payment_method}</div>
                  <div className="text-lg font-bold mt-2">{b.price_estimate ? `KES ${b.price_estimate}` : '-'}</div>
                  <div className="mt-3">
                    <a href={`/dashboard/bookings/${b.id}`}>
                      <Button variant="outline" size="sm">View</Button>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingsPage;
