import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../../contexts/AuthContext';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import { api } from '../../../utils/apiClient';

const BookingDetail = () => {
  const { id } = useParams();
  const { user, session } = useAuth();
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showTracking, setShowTracking] = useState(false);
  const [showContactTeam, setShowContactTeam] = useState(false);
  const [contactLoading, setContactLoading] = useState(false);
  const [invoiceLoading, setInvoiceLoading] = useState(false);
  const [shareLoading, setShareLoading] = useState(false);
  const [cancelLoading, setCancelLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const load = async () => {
      if (!user || !session || !session.access_token) {
        console.warn('No active session');
        setLoading(false);
        return;
      }
      setLoading(true);
      try {
        const result = await api.get(`/api/bookings/${id}`, {
          headers: {
            'Authorization': `Bearer ${session.access_token}`
          }
        });
        if (result.success) {
          setBooking(result.data);
        } else {
          console.warn('Failed to load booking', result.error);
          setErrorMessage('Failed to load booking details');
        }
      } catch (error) {
        console.warn('Failed to load booking', error);
        setErrorMessage('Error loading booking details');
      }
      setLoading(false);
    };
    load();
  }, [id, user, session]);

  // Mock team data (in production, this would come from backend)
  const mockTeam = [
    { id: 1, name: 'John Kipchoge', role: 'Team Lead', phone: '+254712345678', image: '👨‍💼' },
    { id: 2, name: 'James Mutua', role: 'Driver', phone: '+254712345679', image: '👨‍🔧' },
    { id: 3, name: 'Peter Omondi', role: 'Assistant', phone: '+254712345680', image: '👨‍🔨' }
  ];

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

  const timelineSteps = [
    { status: 'pending', label: 'Submitted', completed: booking?.status !== undefined },
    { status: 'confirmed', label: 'Approved', completed: ['confirmed', 'in_progress', 'completed'].includes(booking?.status) },
    { status: 'in_progress', label: 'In Progress', completed: ['in_progress', 'completed'].includes(booking?.status) },
    { status: 'completed', label: 'Completed', completed: booking?.status === 'completed' }
  ];

  // Dynamic button handlers
  const handleDownloadInvoice = async () => {
    setInvoiceLoading(true);
    try {
      // Simulate invoice download
      const invoiceData = `
INVOICE - Ready One Moving Services
Booking ID: ${booking.id}
Service: ${booking.service_type}
From: ${booking.from_location}
To: ${booking.to_location}
Cost: KES ${booking.estimated_cost?.toLocaleString()}
Status: ${booking.status}
Date: ${new Date().toLocaleDateString()}
      `;
      
      const element = document.createElement('a');
      const file = new Blob([invoiceData], {type: 'text/plain'});
      element.href = URL.createObjectURL(file);
      element.download = `Invoice-${booking.id}.txt`;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
      
      setSuccessMessage('Invoice downloaded successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      setErrorMessage('Failed to download invoice');
      setTimeout(() => setErrorMessage(''), 3000);
    } finally {
      setInvoiceLoading(false);
    }
  };

  const handleShareBooking = async () => {
    setShareLoading(true);
    try {
      const shareData = {
        title: `My ${booking.service_type} Booking`,
        text: `Check out my booking: ${booking.service_type} from ${booking.from_location} to ${booking.to_location}`,
        url: window.location.href
      };

      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        // Fallback: copy to clipboard
        await navigator.clipboard.writeText(window.location.href);
        setSuccessMessage('Booking link copied to clipboard!');
        setTimeout(() => setSuccessMessage(''), 3000);
      }
    } catch (error) {
      console.log('Share cancelled or failed', error);
    } finally {
      setShareLoading(false);
    }
  };

  const handleCancelBooking = async () => {
    if (!confirm('Are you sure you want to cancel this booking? This action cannot be undone.')) {
      return;
    }

    setCancelLoading(true);
    try {
      const result = await api.put(`/api/bookings/${id}`, 
        { status: 'cancelled' },
        {
          headers: {
            'Authorization': `Bearer ${session.access_token}`
          }
        }
      );

      if (result.success) {
        setBooking({ ...booking, status: 'cancelled' });
        setSuccessMessage('Booking cancelled successfully');
        setTimeout(() => navigate('/dashboard/bookings'), 2000);
      } else {
        setErrorMessage(result.error || 'Failed to cancel booking');
      }
    } catch (error) {
      setErrorMessage('Error cancelling booking');
    } finally {
      setCancelLoading(false);
    }
  };

  const handleCallTeamMember = (phone) => {
    window.location.href = `tel:${phone}`;
  };

  const handleSendMessage = (phone) => {
    window.location.href = `sms:${phone}`;
  };

  const handleContactSupport = () => {
    navigate('/dashboard/support');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16 px-4">
        <div className="text-center">
          <div className="w-12 h-12 rounded-full border-4 border-primary border-t-transparent animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading booking details...</p>
        </div>
      </div>
    );
  }

  if (!booking) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-16 px-4"
      >
        <Icon name="AlertTriangle" size={48} className="text-muted-foreground mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-foreground mb-2">Booking not found</h3>
        <p className="text-muted-foreground mb-6">The booking you're looking for doesn't exist.</p>
        <Button onClick={() => navigate('/dashboard/bookings')}>
          Back to Bookings
        </Button>
      </motion.div>
    );
  }

  return (
    <div>
      <Helmet>
        <title>Booking Details</title>
      </Helmet>

      {/* Success Toast */}
      <AnimatePresence>
        {successMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-4 right-4 z-50 max-w-sm"
          >
            <div className="bg-success text-white rounded-lg shadow-lg p-4 flex items-center gap-3">
              <Icon name="CheckCircle2" size={20} />
              <span className="text-sm font-medium">{successMessage}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Error Toast */}
      <AnimatePresence>
        {errorMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-4 right-4 z-50 max-w-sm"
          >
            <div className="bg-error text-white rounded-lg shadow-lg p-4 flex items-center gap-3">
              <Icon name="AlertTriangle" size={20} />
              <span className="text-sm font-medium">{errorMessage}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 sm:mb-8"
        >
          <button
            onClick={() => navigate('/dashboard/bookings')}
            className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-4"
          >
            <Icon name="ChevronLeft" size={18} />
            <span className="text-sm sm:text-base">Back to Bookings</span>
          </button>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-3">
                {booking.service_type}
              </h1>
              <div className={`inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg border text-sm font-semibold ${getStatusColor(booking.status)}`}>
                <motion.div animate={{ rotate: booking.status === 'in_progress' ? 360 : 0 }} transition={{ duration: 2, repeat: booking.status === 'in_progress' ? Infinity : 0 }}>
                  <Icon name={getStatusIcon(booking.status)} size={16} />
                </motion.div>
                <span className="capitalize">{booking.status}</span>
              </div>
            </div>
            <div className="text-left sm:text-right">
              <p className="text-xs sm:text-sm text-muted-foreground mb-1 sm:mb-2">Estimated Cost</p>
              <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary">
                KES {booking.estimated_cost?.toLocaleString() || '—'}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-card border border-border rounded-xl sm:rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8"
        >
          <h2 className="text-lg sm:text-xl font-bold text-foreground mb-4 sm:mb-6">Booking Progress</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4">
            {timelineSteps.map((step, idx) => (
              <div key={idx} className="relative">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: idx * 0.1 }}
                  className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center mb-2 sm:mb-3 text-sm sm:text-base ${
                    step.completed ? 'bg-success text-white' : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {step.completed ? (
                    <Icon name="Check" size={20} />
                  ) : (
                    <Icon name="Clock" size={20} />
                  )}
                </motion.div>
                <p className="font-semibold text-foreground text-xs sm:text-sm">{step.label}</p>
                {idx < timelineSteps.length - 1 && (
                  <div className={`absolute w-0.5 h-8 sm:h-12 top-10 sm:top-12 left-5 sm:left-6 ${step.completed ? 'bg-success' : 'bg-border'}`} />
                )}
              </div>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Main Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 space-y-4 sm:space-y-6"
          >
            {/* Trip Details */}
            <div className="bg-card border border-border rounded-xl sm:rounded-2xl p-4 sm:p-6">
              <h3 className="text-base sm:text-lg font-bold text-foreground mb-3 sm:mb-4 flex items-center gap-2">
                <Icon name="MapPin" size={20} className="text-primary" />
                Trip Details
              </h3>
              <div className="space-y-3 sm:space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div className="p-3 sm:p-4 bg-muted/50 rounded-lg border border-border">
                    <p className="text-xs text-muted-foreground mb-1">Pickup Location</p>
                    <p className="font-semibold text-foreground text-sm sm:text-base">{booking.from_location}</p>
                  </div>
                  <div className="p-3 sm:p-4 bg-muted/50 rounded-lg border border-border">
                    <p className="text-xs text-muted-foreground mb-1">Destination</p>
                    <p className="font-semibold text-foreground text-sm sm:text-base">{booking.to_location}</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div className="p-3 sm:p-4 bg-muted/50 rounded-lg border border-border">
                    <p className="text-xs text-muted-foreground mb-1">Booking Date</p>
                    <p className="font-semibold text-foreground text-sm sm:text-base">
                      {booking.booking_date ? new Date(booking.booking_date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      }) : '—'}
                    </p>
                  </div>
                  <div className="p-3 sm:p-4 bg-muted/50 rounded-lg border border-border">
                    <p className="text-xs text-muted-foreground mb-1">Booking ID</p>
                    <p className="font-semibold text-foreground text-xs sm:text-sm">{booking.id?.slice(0, 8)}...</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Special Instructions */}
            {booking.special_instructions && (
              <div className="bg-card border border-border rounded-xl sm:rounded-2xl p-4 sm:p-6">
                <h3 className="text-base sm:text-lg font-bold text-foreground mb-3 sm:mb-4 flex items-center gap-2">
                  <Icon name="FileText" size={20} className="text-primary" />
                  Special Instructions
                </h3>
                <p className="text-foreground text-sm sm:text-base whitespace-pre-wrap">{booking.special_instructions}</p>
              </div>
            )}

            {/* Team Information */}
            <div className="bg-gradient-to-br from-primary/5 to-secondary/5 border border-primary/20 rounded-xl sm:rounded-2xl p-4 sm:p-6">
              <h3 className="text-base sm:text-lg font-bold text-foreground mb-3 sm:mb-4 flex items-center gap-2">
                <Icon name="Users" size={20} className="text-primary" />
                Your Moving Team
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground mb-4">
                {booking.status === 'pending' ? 'Team will be assigned once your booking is approved.' : 'Here\'s your dedicated moving team:'}
              </p>
              {booking.status !== 'pending' ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                  {mockTeam.map((member, idx) => (
                    <motion.div
                      key={member.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="bg-card border border-border rounded-lg sm:rounded-xl p-3 sm:p-4 text-center"
                    >
                      <div className="text-3xl sm:text-4xl mb-2">{member.image}</div>
                      <h4 className="font-semibold text-foreground text-sm sm:text-base mb-1">{member.name}</h4>
                      <p className="text-xs text-primary font-medium mb-3">{member.role}</p>
                      <div className="flex gap-2 flex-col sm:flex-row">
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1 text-xs sm:text-sm"
                          onClick={() => handleCallTeamMember(member.phone)}
                          disabled={contactLoading}
                        >
                          <Icon name="Phone" size={14} />
                          <span className="hidden sm:inline">Call</span>
                          <span className="sm:hidden">📞</span>
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1 text-xs sm:text-sm"
                          onClick={() => handleSendMessage(member.phone)}
                          disabled={contactLoading}
                        >
                          <Icon name="MessageCircle" size={14} />
                          <span className="hidden sm:inline">Text</span>
                          <span className="sm:hidden">💬</span>
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="p-3 sm:p-4 bg-yellow/10 text-yellow rounded-lg border border-yellow/20 flex items-start gap-3">
                  <Icon name="AlertCircle" size={18} className="flex-shrink-0 mt-0.5" />
                  <p className="text-xs sm:text-sm">Your team will be assigned as soon as we approve your booking.</p>
                </div>
              )}
            </div>

            {/* Live Tracking */}
            <div className="bg-card border border-border rounded-xl sm:rounded-2xl p-4 sm:p-6">
              <h3 className="text-base sm:text-lg font-bold text-foreground mb-3 sm:mb-4 flex items-center gap-2">
                <Icon name="Navigation" size={20} className="text-primary" />
                Live Tracking
              </h3>
              {booking.status === 'in_progress' ? (
                <div className="space-y-3 sm:space-y-4">
                  <Button
                    variant="default"
                    className="w-full text-sm sm:text-base"
                    onClick={() => setShowTracking(!showTracking)}
                  >
                    <Icon name={showTracking ? "Eye" : "EyeOff"} size={16} />
                    {showTracking ? 'Hide Tracking' : 'View Live Location'}
                  </Button>
                  <AnimatePresence>
                    {showTracking && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="bg-muted/50 rounded-lg p-4 text-center border border-border"
                      >
                        <div className="mb-3 text-4xl">🗺️</div>
                        <p className="text-muted-foreground text-sm mb-3">Your team is on the way!</p>
                        <div className="bg-card rounded-lg p-3 border border-border">
                          <motion.div animate={{ x: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }}>
                            <p className="text-sm font-semibold text-foreground mb-1">🚚 ETA: 15 minutes</p>
                          </motion.div>
                          <p className="text-xs text-muted-foreground">Currently 2.5 km away</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <div className="p-3 sm:p-4 bg-muted/50 rounded-lg text-center border border-border">
                  <p className="text-xs sm:text-sm text-muted-foreground">Live tracking will be available when your move is in progress.</p>
                </div>
              )}
            </div>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-4 sm:space-y-6"
          >
            {/* Quick Actions */}
            <div className="bg-card border border-border rounded-xl sm:rounded-2xl p-4 sm:p-6">
              <h3 className="text-base sm:text-lg font-bold text-foreground mb-3 sm:mb-4">Quick Actions</h3>
              <div className="space-y-2 sm:space-y-3">
                <Button
                  className="w-full text-sm sm:text-base"
                  variant="outline"
                  onClick={handleDownloadInvoice}
                  disabled={invoiceLoading}
                >
                  <Icon name="Download" size={16} />
                  <span className="hidden sm:inline">{invoiceLoading ? 'Downloading...' : 'Download Invoice'}</span>
                  <span className="sm:hidden">{invoiceLoading ? '⏳' : '📥'}</span>
                </Button>
                <Button
                  className="w-full text-sm sm:text-base"
                  variant="outline"
                  onClick={handleShareBooking}
                  disabled={shareLoading}
                >
                  <Icon name="Share2" size={16} />
                  <span className="hidden sm:inline">{shareLoading ? 'Sharing...' : 'Share Booking'}</span>
                  <span className="sm:hidden">📤</span>
                </Button>
                {booking.status === 'pending' && (
                  <Button
                    className="w-full text-sm sm:text-base text-error border-error/20 hover:bg-error/10"
                    variant="outline"
                    onClick={handleCancelBooking}
                    disabled={cancelLoading}
                  >
                    <Icon name="Trash2" size={16} />
                    <span className="hidden sm:inline">{cancelLoading ? 'Cancelling...' : 'Cancel Booking'}</span>
                    <span className="sm:hidden">🗑️</span>
                  </Button>
                )}
              </div>
            </div>

            {/* Booking Info */}
            <div className="bg-gradient-to-br from-primary/5 to-secondary/5 border border-primary/20 rounded-xl sm:rounded-2xl p-4 sm:p-6">
              <h3 className="text-base sm:text-lg font-bold text-foreground mb-3 sm:mb-4">Booking Info</h3>
              <div className="space-y-3 text-xs sm:text-sm">
                <div>
                  <p className="text-muted-foreground mb-1">Booking ID</p>
                  <p className="font-mono text-xs text-foreground break-all">{booking.id}</p>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1">Status</p>
                  <p className="font-semibold text-foreground capitalize">{booking.status}</p>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1">Created</p>
                  <p className="text-foreground">{booking.created_at ? new Date(booking.created_at).toLocaleDateString() : '—'}</p>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1">Estimated Cost</p>
                  <p className="text-lg sm:text-xl font-bold text-primary">KES {booking.estimated_cost?.toLocaleString() || '—'}</p>
                </div>
              </div>
            </div>

            {/* Support */}
            <div className="bg-card border border-border rounded-xl sm:rounded-2xl p-4 sm:p-6">
              <h3 className="text-base sm:text-lg font-bold text-foreground mb-3 sm:mb-4">Need Help?</h3>
              <p className="text-xs sm:text-sm text-muted-foreground mb-4">Having issues with your booking?</p>
              <Button
                className="w-full text-sm sm:text-base"
                variant="outline"
                onClick={handleContactSupport}
              >
                <Icon name="MessageCircle" size={16} />
                Contact Support
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default BookingDetail;
