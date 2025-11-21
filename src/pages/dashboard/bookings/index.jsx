import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { useAuth } from '../../../contexts/AuthContext';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import { api } from '../../../utils/apiClient';

const BookingsPage = () => {
  const { user, session } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadBookings = async () => {
    if (!user || !session || !session.access_token) {
      console.warn('[Bookings] No active session');
      setLoading(false);
      return;
    }
    
    try {
      const result = await api.get('/api/bookings', {
        headers: {
          'Authorization': `Bearer ${session.access_token}`
        }
      });
      
      if (result.success) {
        setBookings(result.data || []);
      } else {
        console.warn('Failed to load bookings', result.error);
      }
    } catch (error) {
      console.error('Bookings fetch error:', error.message);
    }
  };

  useEffect(() => {
    setLoading(true);
    loadBookings().then(() => setLoading(false));
  }, [user, session]);

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadBookings();
    setRefreshing(false);
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'pending': return 'bg-yellow/10 text-yellow border-yellow/20';
      case 'confirmed': return 'bg-blue/10 text-blue border-blue/20';
      case 'in_progress': return 'bg-primary/10 text-primary border-primary/20';
      case 'completed': return 'bg-success/10 text-success border-success/20';
      case 'cancelled': return 'bg-error/10 text-error border-error/20';
      default: return 'bg-muted/10 text-muted-foreground border-border';
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'pending': return 'Clock';
      case 'confirmed': return 'CheckCircle';
      case 'in_progress': return 'Loader';
      case 'completed': return 'CheckCircle2';
      case 'cancelled': return 'X';
      default: return 'HelpCircle';
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
    hover: { y: -4, transition: { duration: 0.2 } },
  };

  return (
    <div>
      <Helmet>
        <title>My Bookings</title>
      </Helmet>

      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Booking History</h1>
          <p className="text-muted-foreground">Track and manage all your moving service bookings</p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-16">
            <div className="text-center">
              <div className="w-12 h-12 rounded-full border-4 border-primary border-t-transparent animate-spin mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading your bookings...</p>
            </div>
          </div>
        ) : bookings.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl border border-border"
          >
            <Icon name="Inbox" size={48} className="text-muted-foreground mx-auto mb-4 opacity-50" />
            <h3 className="text-xl font-semibold text-foreground mb-2">No bookings yet</h3>
            <p className="text-muted-foreground mb-6">Create a new booking to get started with our moving services</p>
            <a href="/dashboard/select-service">
              <Button>
                <Icon name="Plus" size={18} />
                Create First Booking
              </Button>
            </a>
          </motion.div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {bookings.map((booking, idx) => (
              <motion.div
                key={booking.id}
                variants={cardVariants}
                whileHover="hover"
                className="h-full"
              >
                <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow h-full flex flex-col">
                  {/* Header with gradient */}
                  <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-4 border-b border-border">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <h3 className="font-bold text-lg text-foreground line-clamp-1">{booking.service_type}</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          {new Date(booking.booking_date).toLocaleDateString('en-US', { 
                            month: 'short', 
                            day: 'numeric', 
                            year: 'numeric' 
                          })}
                        </p>
                      </div>
                      <div className={`px-3 py-1 rounded-lg border flex items-center gap-1 text-sm font-medium ${getStatusColor(booking.status)}`}>
                        <Icon name={getStatusIcon(booking.status)} size={14} />
                        {booking.status}
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4 flex-1 space-y-3">
                    {/* Route */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <Icon name="MapPin" size={16} className="text-primary flex-shrink-0" />
                        <span className="text-muted-foreground">From:</span>
                        <span className="font-medium text-foreground line-clamp-1">{booking.from_location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Icon name="MapPin" size={16} className="text-primary flex-shrink-0" />
                        <span className="text-muted-foreground">To:</span>
                        <span className="font-medium text-foreground line-clamp-1">{booking.to_location}</span>
                      </div>
                    </div>

                    {/* Special Instructions */}
                    {booking.special_instructions && (
                      <div className="pt-2 border-t border-border">
                        <p className="text-xs text-muted-foreground mb-1">Special Instructions</p>
                        <p className="text-sm text-foreground line-clamp-2">{booking.special_instructions}</p>
                      </div>
                    )}

                    {/* Cost */}
                    <div className="bg-muted/50 rounded-lg p-3 mt-auto">
                      <p className="text-xs text-muted-foreground mb-1">Estimated Cost</p>
                      <p className="text-2xl font-bold text-primary">
                        KES {booking.estimated_cost ? booking.estimated_cost.toLocaleString() : '—'}
                      </p>
                    </div>
                  </div>

                  {/* Footer with action */}
                  <div className="p-4 border-t border-border bg-muted/50">
                    <a href={`/dashboard/bookings/${booking.id}`} className="w-full">
                      <Button className="w-full" variant="outline" size="sm">
                        View Details
                        <Icon name="ArrowRight" size={14} />
                      </Button>
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default BookingsPage;
