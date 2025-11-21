import React, { useEffect, useState } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import Icon from '../../../components/AppIcon';

const RecentActivity = ({ onViewBooking }) => {
  const { session } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      if (!session) return;
      setLoading(true);
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/bookings`, {
          headers: {
            'Authorization': `Bearer ${session.access_token}`
          }
        });
        const result = await response.json();
        
        if (result.success && result.data) {
          // Show last 5 bookings in table
          setBookings(result.data.slice(0, 5));
        }
      } catch (error) {
        console.warn('Failed to load bookings', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [session]);

  const getStatusBadge = (status) => {
    const statusClasses = {
      pending: "bg-warning/10 text-warning border-warning/20",
      confirmed: "bg-primary/10 text-primary border-primary/20",
      in_progress: "bg-primary/10 text-primary border-primary/20",
      completed: "bg-success/10 text-success border-success/20",
      cancelled: "bg-error/10 text-error border-error/20"
    };

    const statusLabels = {
      pending: "Pending",
      confirmed: "Confirmed",
      in_progress: "In Progress",
      completed: "Completed",
      cancelled: "Cancelled"
    };

    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${statusClasses?.[status] || statusClasses.pending}`}>
        {statusLabels?.[status] || status?.charAt(0)?.toUpperCase() + status?.slice(1)}
      </span>
    );
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="bg-card border border-border rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold text-foreground">Recent Bookings</h2>
        <a href="/dashboard/bookings" className="text-primary hover:text-primary/80 text-sm font-medium">
          View All →
        </a>
      </div>

      {loading ? (
        <div className="text-center py-8 text-muted-foreground text-sm">Loading bookings...</div>
      ) : bookings.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-3 font-semibold text-muted-foreground text-xs uppercase tracking-wide">Service</th>
                <th className="text-left py-3 px-3 font-semibold text-muted-foreground text-xs uppercase tracking-wide">Location</th>
                <th className="text-left py-3 px-3 font-semibold text-muted-foreground text-xs uppercase tracking-wide">Date</th>
                <th className="text-left py-3 px-3 font-semibold text-muted-foreground text-xs uppercase tracking-wide">Status</th>
                <th className="text-center py-3 px-3 font-semibold text-muted-foreground text-xs uppercase tracking-wide">Action</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                  <td className="py-3 px-3 text-foreground font-medium">{booking.service_type}</td>
                  <td className="py-3 px-3 text-muted-foreground text-xs">
                    <div className="truncate max-w-xs">{booking.from_location}</div>
                  </td>
                  <td className="py-3 px-3 text-muted-foreground text-xs">
                    {formatDate(booking.booking_date || booking.created_at)}
                  </td>
                  <td className="py-3 px-3">
                    {getStatusBadge(booking.status)}
                  </td>
                  <td className="py-3 px-3 text-center">
                    <button
                      onClick={() => onViewBooking(booking)}
                      className="inline-flex items-center justify-center p-2 rounded-lg hover:bg-primary/10 text-primary hover:text-primary/80 transition-colors"
                      title="View booking details"
                    >
                      <Icon name="Eye" size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-8 text-muted-foreground text-sm">
          No bookings yet. <a href="/dashboard/services" className="text-primary hover:text-primary/80 font-medium">Create your first booking</a>
        </div>
      )}
    </div>
  );
};

export default RecentActivity;