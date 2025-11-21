import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { useAuth } from '../../../contexts/AuthContext';
import { api } from '../../../utils/apiClient';

const UpcomingPage = () => {
  const navigate = useNavigate();
  const { session } = useAuth();
  const [upcomingMoves, setUpcomingMoves] = useState([]);
  const [filteredMoves, setFilteredMoves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('card'); // 'card' or 'timeline'
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [selectedMove, setSelectedMove] = useState(null);
  const [showRescheduleModal, setShowRescheduleModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showChecklist, setShowChecklist] = useState(false);

  // Fetch upcoming bookings
  useEffect(() => {
    const fetchUpcomingMoves = async () => {
      try {
        setLoading(true);
        const data = await api.get('/api/bookings', {
          headers: {
            'Authorization': `Bearer ${session?.access_token}`
          }
        });

        // Filter for future bookings only
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        const upcoming = (data || [])
          .filter(booking => {
            const bookingDate = new Date(booking?.booking_date);
            bookingDate.setHours(0, 0, 0, 0);
            return bookingDate >= today && booking?.status !== 'cancelled';
          })
          .sort((a, b) => new Date(a?.booking_date) - new Date(b?.booking_date))
          .map(booking => ({
            id: booking?.id,
            type: booking?.service_type || "Moving Service",
            category: booking?.property_type || "Standard",
            from: booking?.pickup_location || "N/A",
            to: booking?.delivery_location || "N/A",
            date: new Date(booking?.booking_date).toLocaleDateString('en-CA'),
            time: booking?.preferred_time || "Not specified",
            status: booking?.status === 'confirmed' ? 'confirmed' : 'pending_confirmation',
            daysLeft: Math.ceil((new Date(booking?.booking_date) - today) / (1000 * 60 * 60 * 24)),
            estimatedCost: `KES ${(booking?.estimated_cost || 0).toLocaleString()}`,
            teamAssigned: booking?.assigned_team || "Team TBD",
            specialInstructions: booking?.special_notes || "",
            bookingId: booking?.id
          }));

        setUpcomingMoves(upcoming);
      } catch (error) {
        console.error('Upcoming moves fetch error:', error);
        console.warn('Failed to load upcoming bookings. Ensure the server is running at http://localhost:5000');
        setUpcomingMoves([]);
      } finally {
        setLoading(false);
      }
    };

    if (session?.access_token) {
      fetchUpcomingMoves();
    }
  }, [session?.access_token]);

  // Apply filters and sorting
  useEffect(() => {
    let result = [...upcomingMoves];

    // Filter by status
    if (filterStatus !== 'all') {
      result = result.filter(move => move.status === filterStatus);
    }

    // Sort
    if (sortBy === 'date') {
      result.sort((a, b) => new Date(a.date) - new Date(b.date));
    } else if (sortBy === 'cost') {
      result.sort((a, b) => 
        parseInt(b.estimatedCost.replace(/[^\d]/g, '')) - 
        parseInt(a.estimatedCost.replace(/[^\d]/g, ''))
      );
    } else if (sortBy === 'urgent') {
      result.sort((a, b) => a.daysLeft - b.daysLeft);
    }

    setFilteredMoves(result);
  }, [upcomingMoves, filterStatus, sortBy]);

  // Calculate summary stats
  const stats = {
    total: upcomingMoves.length,
    thisWeek: upcomingMoves.filter(m => m.daysLeft <= 7).length,
    urgent: upcomingMoves.filter(m => m.daysLeft <= 3).length,
    confirmed: upcomingMoves.filter(m => m.status === 'confirmed').length
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      confirmed: { 
        class: "bg-success/10 text-success border-success/20", 
        text: "Confirmed" 
      },
      pending_confirmation: { 
        class: "bg-warning/10 text-warning border-warning/20", 
        text: "Pending Confirmation" 
      }
    };

    const config = statusConfig?.[status] || statusConfig?.confirmed;
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${config?.class}`}>
        {config?.text}
      </span>
    );
  };

  const getDaysLeftBadge = (days) => {
    if (days <= 3) {
      return (
        <div className="flex items-center space-x-1 text-warning">
          <Icon name="AlertTriangle" size={14} />
          <span className="text-sm font-medium">{days} days left</span>
        </div>
      );
    }
    return (
      <div className="flex items-center space-x-1 text-muted-foreground">
        <Icon name="Calendar" size={14} />
        <span className="text-sm">{days} days left</span>
      </div>
    );
  };

  return (
    <div>
      <Helmet>
        <title>Upcoming Moves</title>
      </Helmet>

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Upcoming Moves</h1>
            <p className="text-muted-foreground mt-1">Manage and track your scheduled moves now</p>
          </div>
          <Button cls

            variant="default" 
            size="lg" 
            iconName="Plus" 
            iconPosition="left"
            onClick={() => navigate('/dashboard/services')}
          >
            New Booking
          </Button>
        </div>

        {/* Summary Stats */}
        {!loading && upcomingMoves.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            <div className="bg-card border border-border rounded-xl p-4">
              <p className="text-muted-foreground text-xs uppercase tracking-wide mb-1">Total Moves</p>
              <p className="text-2xl font-bold text-foreground">{stats.total}</p>
            </div>
            <div className="bg-card border border-border rounded-xl p-4">
              <p className="text-muted-foreground text-xs uppercase tracking-wide mb-1">This Week</p>
              <p className="text-2xl font-bold text-primary">{stats.thisWeek}</p>
            </div>
            <div className="bg-card border border-border rounded-xl p-4">
              <p className="text-muted-foreground text-xs uppercase tracking-wide mb-1">Urgent (≤3 days)</p>
              <p className="text-2xl font-bold text-warning">{stats.urgent}</p>
            </div>
            <div className="bg-card border border-border rounded-xl p-4">
              <p className="text-muted-foreground text-xs uppercase tracking-wide mb-1">Confirmed</p>
              <p className="text-2xl font-bold text-success">{stats.confirmed}</p>
            </div>
          </div>
        )}

        {/* Filters & View Toggle */}
        {!loading && upcomingMoves.length > 0 && (
          <div className="bg-card border border-border rounded-2xl p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
              {/* Filter by Status */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Filter by Status</label>
                <select 
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-border bg-muted text-foreground focus:outline-none focus:border-primary"
                >
                  <option value="all">All Moves</option>
                  <option value="confirmed">Confirmed Only</option>
                  <option value="pending_confirmation">Pending Confirmation</option>
                </select>
              </div>

              {/* Sort by */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Sort by</label>
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-border bg-muted text-foreground focus:outline-none focus:border-primary"
                >
                  <option value="date">Date (Nearest First)</option>
                  <option value="urgent">Urgency (Most Urgent)</option>
                  <option value="cost">Cost (Highest First)</option>
                </select>
              </div>

              {/* View Toggle */}
              <div className="flex gap-2">
                <button
                  onClick={() => setViewMode('card')}
                  className={`flex-1 px-4 py-2 rounded-lg border transition-colors ${
                    viewMode === 'card' 
                      ? 'border-primary bg-primary/10 text-primary' 
                      : 'border-border hover:border-primary/50'
                  }`}
                  title="Card view"
                >
                  <Icon name="Rows4" size={18} className="mx-auto" />
                </button>
                <button
                  onClick={() => setViewMode('timeline')}
                  className={`flex-1 px-4 py-2 rounded-lg border transition-colors ${
                    viewMode === 'timeline' 
                      ? 'border-primary bg-primary/10 text-primary' 
                      : 'border-border hover:border-primary/50'
                  }`}
                  title="Timeline view"
                >
                  <Icon name="CalendarDays" size={18} className="mx-auto" />
                </button>
              </div>
            </div>
          </div>
        )}

        {loading ? (
          <div className="bg-card border border-border rounded-2xl p-12 text-center">
            <p className="text-muted-foreground">Loading upcoming moves...</p>
          </div>
        ) : filteredMoves?.length === 0 ? (
          <div className="bg-card border border-border rounded-2xl p-12 text-center">
            <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
              <Icon name="Calendar" size={40} className="text-muted-foreground" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-3">No Upcoming Moves</h2>
            <p className="text-muted-foreground mb-6">You don't have any scheduled moves at the moment.</p>
            <Button 
              variant="default" 
              size="lg" 
              iconName="Plus" 
              iconPosition="left"
              onClick={() => navigate('/dashboard/services')}
            >
              Schedule a Move
            </Button>
          </div>
        ) : viewMode === 'card' ? (
          <div className="space-y-6">
            {filteredMoves?.map((move) => (
              <div key={move?.id} className="bg-card border border-border rounded-2xl p-6 hover:shadow-lg transition-all">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-6">
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-3 gap-3 mb-3">
                      <h2 className="text-xl font-bold text-foreground">
                        {move?.type} - {move?.category}
                      </h2>
                      {getStatusBadge(move?.status)}
                    </div>
                    {getDaysLeftBadge(move?.daysLeft)}
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-primary">{move?.estimatedCost}</p>
                    <p className="text-sm text-muted-foreground">Estimated cost</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="p-2 bg-error/20 rounded-lg flex-shrink-0">
                        <Icon name="MapPin" size={18} className="text-error" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-foreground">From</p>
                        <p className="text-muted-foreground">{move?.from}</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="p-2 bg-success/20 rounded-lg flex-shrink-0">
                        <Icon name="MapPin" size={18} className="text-success" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-foreground">To</p>
                        <p className="text-muted-foreground">{move?.to}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-primary/20 rounded-lg flex-shrink-0">
                        <Icon name="Calendar" size={18} className="text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-foreground">Date & Time</p>
                        <p className="text-muted-foreground">{move?.date} at {move?.time}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-secondary/20 rounded-lg flex-shrink-0">
                        <Icon name="Users" size={18} className="text-secondary" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-foreground">Assigned Team</p>
                        <p className="text-muted-foreground">{move?.teamAssigned}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {move?.specialInstructions && (
                  <div className="bg-muted/50 rounded-lg p-4 mb-6 border border-border">
                    <div className="flex items-start space-x-3">
                      <Icon name="Info" size={18} className="text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-semibold text-foreground">Special Instructions</p>
                        <p className="text-sm text-muted-foreground">{move?.specialInstructions}</p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex flex-wrap items-center justify-between gap-3 pt-6 border-t border-border">
                  <div className="flex flex-wrap gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      iconName="MessageCircle" 
                      iconPosition="left"
                      onClick={() => navigate('/dashboard/support')}
                    >
                      Contact Support
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      iconName="ListTodo" 
                      iconPosition="left"
                      onClick={() => {
                        setSelectedMove(move);
                        setShowChecklist(true);
                      }}
                      title="Pre-move preparation checklist"
                    >
                      Prepare
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      iconName="RotateCw" 
                      iconPosition="left"
                      onClick={() => {
                        setSelectedMove(move);
                        setShowRescheduleModal(true);
                      }}
                      title="Change move date"
                    >
                      Reschedule
                    </Button>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      variant="destructive" 
                      size="sm"
                      iconName="X"
                      iconPosition="left"
                      onClick={() => {
                        setSelectedMove(move);
                        setShowCancelModal(true);
                      }}
                      title="Cancel this move"
                    >
                      Cancel Move
                    </Button>
                    <Button 
                      variant="default" 
                      size="sm" 
                      iconName="FileText" 
                      iconPosition="left"
                      onClick={() => navigate(`/dashboard/bookings/${move?.bookingId}`)}
                      title="View full booking details"
                    >
                      Full Details
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // Timeline View
          <div className="bg-card border border-border rounded-2xl p-8">
            <div className="space-y-8">
              {filteredMoves?.map((move, index) => (
                <div key={move?.id} className="relative">
                  {index !== filteredMoves.length - 1 && (
                    <div className="absolute left-6 top-16 bottom-0 w-0.5 bg-border"></div>
                  )}
                  <div className="flex gap-6">
                    <div className="flex flex-col items-center">
                      <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center ${
                        move.daysLeft <= 3 
                          ? 'bg-warning/10 border-warning' 
                          : move.status === 'confirmed' 
                          ? 'bg-success/10 border-success' 
                          : 'bg-primary/10 border-primary'
                      }`}>
                        <Icon 
                          name={move.daysLeft <= 3 ? 'AlertTriangle' : move.status === 'confirmed' ? 'CheckCircle' : 'Clock'} 
                          size={20} 
                          className={move.daysLeft <= 3 ? 'text-warning' : move.status === 'confirmed' ? 'text-success' : 'text-primary'}
                        />
                      </div>
                    </div>
                    <div className="flex-1 pb-8">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                        <h3 className="text-lg font-bold text-foreground">{move?.date}</h3>
                        <div className="flex gap-2">
                          {getStatusBadge(move?.status)}
                          {getDaysLeftBadge(move?.daysLeft)}
                        </div>
                      </div>
                      <p className="text-foreground font-semibold mb-1">{move?.type} - {move?.category}</p>
                      <p className="text-sm text-muted-foreground mb-3">{move?.from} → {move?.to}</p>
                      <p className="text-sm text-primary font-semibold mb-4">{move?.estimatedCost}</p>
                      <Button 
                        variant="default" 
                        size="sm"
                        onClick={() => navigate(`/dashboard/bookings/${move?.bookingId}`)}
                      >
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Reschedule Modal */}
      {showRescheduleModal && selectedMove && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-card rounded-2xl border border-border max-w-md w-full">
            <div className="p-6 border-b border-border flex justify-between items-center">
              <h3 className="text-xl font-bold">Reschedule Move</h3>
              <button
                onClick={() => setShowRescheduleModal(false)}
                className="text-muted-foreground hover:text-foreground"
              >
                ✕
              </button>
            </div>
            <div className="p-6">
              <div className="mb-4">
                <p className="text-sm text-muted-foreground mb-1">Current Date</p>
                <p className="text-foreground font-semibold">{selectedMove?.date} at {selectedMove?.time}</p>
              </div>
              <div className="mb-6">
                <label className="block text-sm font-semibold text-foreground mb-2">New Date</label>
                <input 
                  type="date" 
                  className="w-full px-4 py-2 rounded-lg border border-border bg-muted text-foreground focus:outline-none focus:border-primary"
                />
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowRescheduleModal(false)}
                  className="flex-1 px-4 py-2 rounded-lg border border-border hover:bg-muted transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setShowRescheduleModal(false);
                    // TODO: Handle reschedule API call
                  }}
                  className="flex-1 px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors"
                >
                  Confirm Reschedule
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cancel Modal */}
      {showCancelModal && selectedMove && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-card rounded-2xl border border-border max-w-md w-full">
            <div className="p-6 border-b border-border">
              <h3 className="text-xl font-bold text-foreground">Cancel Move</h3>
            </div>
            <div className="p-6">
              <p className="text-foreground mb-4">Are you sure you want to cancel this move?</p>
              <p className="text-sm text-muted-foreground mb-6">
                <strong>Move:</strong> {selectedMove?.type} on {selectedMove?.date}
              </p>
              <div className="bg-warning/10 border border-warning/20 rounded-lg p-4 mb-6">
                <p className="text-sm text-warning">
                  <strong>Note:</strong> Cancellations made within 48 hours may incur fees.
                </p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowCancelModal(false)}
                  className="flex-1 px-4 py-2 rounded-lg border border-border hover:bg-muted transition-colors"
                >
                  Keep Move
                </button>
                <button
                  onClick={() => {
                    setShowCancelModal(false);
                    // TODO: Handle cancel API call
                  }}
                  className="flex-1 px-4 py-2 rounded-lg bg-error text-white hover:bg-error/90 transition-colors"
                >
                  Cancel Move
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Move Preparation Checklist Modal */}
      {showChecklist && selectedMove && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-card rounded-2xl border border-border max-w-md w-full max-h-96 overflow-y-auto">
            <div className="p-6 border-b border-border flex justify-between items-center sticky top-0 bg-card">
              <h3 className="text-xl font-bold">Move Preparation</h3>
              <button
                onClick={() => setShowChecklist(false)}
                className="text-muted-foreground hover:text-foreground"
              >
                ✕
              </button>
            </div>
            <div className="p-6 space-y-3">
              <div className="flex items-start gap-3">
                <input type="checkbox" className="mt-1" />
                <label className="text-sm text-foreground">Clear and declutter items</label>
              </div>
              <div className="flex items-start gap-3">
                <input type="checkbox" className="mt-1" />
                <label className="text-sm text-foreground">Pack fragile items carefully</label>
              </div>
              <div className="flex items-start gap-3">
                <input type="checkbox" className="mt-1" />
                <label className="text-sm text-foreground">Label all boxes with room names</label>
              </div>
              <div className="flex items-start gap-3">
                <input type="checkbox" className="mt-1" />
                <label className="text-sm text-foreground">Arrange for utilities disconnection</label>
              </div>
              <div className="flex items-start gap-3">
                <input type="checkbox" className="mt-1" />
                <label className="text-sm text-foreground">Update address with banks/services</label>
              </div>
              <div className="flex items-start gap-3">
                <input type="checkbox" className="mt-1" />
                <label className="text-sm text-foreground">Confirm moving team details</label>
              </div>
              <div className="flex items-start gap-3">
                <input type="checkbox" className="mt-1" />
                <label className="text-sm text-foreground">Prepare parking space</label>
              </div>
              <div className="flex items-start gap-3">
                <input type="checkbox" className="mt-1" />
                <label className="text-sm text-foreground">Have a contact person ready</label>
              </div>
            </div>
            <div className="p-6 border-t border-border">
              <button
                onClick={() => setShowChecklist(false)}
                className="w-full px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const getStatusBadge = (status) => {
  const statusConfig = {
    confirmed: { 
      class: "bg-success/10 text-success border-success/20", 
      text: "Confirmed" 
    },
    pending_confirmation: { 
      class: "bg-warning/10 text-warning border-warning/20", 
      text: "Pending Confirmation" 
    }
  };

  const config = statusConfig?.[status] || statusConfig?.confirmed;
  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${config?.class}`}>
      {config?.text}
    </span>
  );
};

const getDaysLeftBadge = (days) => {
  if (days <= 3) {
    return (
      <div className="flex items-center space-x-1 text-warning">
        <Icon name="AlertTriangle" size={14} />
        <span className="text-sm font-medium">{days} days left</span>
      </div>
    );
  }
  return (
    <div className="flex items-center space-x-1 text-muted-foreground">
      <Icon name="Calendar" size={14} />
      <span className="text-sm">{days} days left</span>
    </div>
  );
};

export default UpcomingPage;
