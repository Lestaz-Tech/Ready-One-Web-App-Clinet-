import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { useAuth } from '../../../contexts/AuthContext';
import { api } from '../../../utils/apiClient';

const UpcomingMoves = () => {
  const navigate = useNavigate();
  const { session, user } = useAuth();
  const [upcomingMoves, setUpcomingMoves] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUpcomingBookings = async () => {
      if (!user || !session?.access_token) {
        setLoading(false);
        return;
      }

      try {
        const result = await api.get('/api/bookings', {
          headers: {
            'Authorization': `Bearer ${session.access_token}`
          }
        });

        if (result.success && result.data) {
          // Filter for pending and confirmed bookings, sort by date
          const upcoming = result.data
            .filter(booking => ['pending', 'confirmed', 'in_progress'].includes(booking.status))
            .sort((a, b) => new Date(a.booking_date) - new Date(b.booking_date))
            .slice(0, 5)
            .map(booking => {
              const bookingDate = new Date(booking.booking_date);
              const today = new Date();
              today.setHours(0, 0, 0, 0);
              const daysLeft = Math.ceil((bookingDate - today) / (1000 * 60 * 60 * 24));

              return {
                id: booking.id,
                type: booking.service_type || "Moving Service",
                category: booking.service_type,
                from: booking.from_location,
                to: booking.to_location,
                date: booking.booking_date,
                time: "08:00",
                status: booking.status === 'pending' ? 'pending_confirmation' : booking.status,
                daysLeft: Math.max(0, daysLeft),
                estimatedCost: booking.estimated_cost ? `KES ${booking.estimated_cost.toLocaleString()}` : "N/A",
                teamAssigned: booking.status === 'pending' ? "Not assigned yet" : "Team Assigned",
                specialInstructions: booking.special_instructions
              };
            });

          setUpcomingMoves(upcoming);
        }
      } catch (error) {
        console.error('Failed to load upcoming bookings:', error);
      } finally {
        setLoading(false);
      }
    };

    loadUpcomingBookings();
  }, [user, session]);

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
    <div className="bg-card border border-border rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-foreground">Upcoming Moves</h2>
        <Button 
          variant="outline" 
          size="sm" 
          iconName="Plus" 
          iconPosition="left"
          onClick={() => navigate('/dashboard/select-service')}
        >
          New Booking
        </Button>
      </div>
      {loading ? (
        <div className="text-center py-8">
          <div className="w-12 h-12 rounded-full border-4 border-primary border-t-transparent animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading your bookings...</p>
        </div>
      ) : upcomingMoves?.length === 0 ? (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="Calendar" size={32} className="text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">No Upcoming Moves</h3>
          <p className="text-muted-foreground mb-4">You don't have any scheduled moves at the moment.</p>
          <Button 
            variant="default" 
            iconName="Plus" 
            iconPosition="left"
            onClick={() => navigate('/dashboard/select-service')}
          >
            Schedule a Move
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {upcomingMoves?.map((move) => (
            <div key={move?.id} className="border border-border rounded-xl p-5 hover:shadow-md transition-all duration-200">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-semibold text-foreground">
                      {move?.type} - {move?.category}
                    </h3>
                    {getStatusBadge(move?.status)}
                  </div>
                  {getDaysLeftBadge(move?.daysLeft)}
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-primary">{move?.estimatedCost}</p>
                  <p className="text-sm text-muted-foreground">Estimated cost</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <Icon name="MapPin" size={16} className="text-error mt-1" />
                    <div>
                      <p className="text-sm font-medium text-foreground">From</p>
                      <p className="text-sm text-muted-foreground">{move?.from}</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Icon name="MapPin" size={16} className="text-success mt-1" />
                    <div>
                      <p className="text-sm font-medium text-foreground">To</p>
                      <p className="text-sm text-muted-foreground">{move?.to}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Icon name="Calendar" size={16} className="text-primary" />
                    <div>
                      <p className="text-sm font-medium text-foreground">Date & Time</p>
                      <p className="text-sm text-muted-foreground">{move?.date} at {move?.time}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Icon name="Users" size={16} className="text-secondary" />
                    <div>
                      <p className="text-sm font-medium text-foreground">Assigned Team</p>
                      <p className="text-sm text-muted-foreground">{move?.teamAssigned}</p>
                    </div>
                  </div>
                </div>
              </div>

              {move?.specialInstructions && (
                <div className="bg-muted/50 rounded-lg p-3 mb-4">
                  <div className="flex items-start space-x-2">
                    <Icon name="Info" size={16} className="text-primary mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-foreground">Special Instructions</p>
                      <p className="text-sm text-muted-foreground">{move?.specialInstructions}</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between pt-4 border-t border-border">
                <div className="flex items-center space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    iconName="MessageCircle" 
                    iconPosition="left"
                    onClick={() => navigate('/dashboard/support')}
                  >
                    Contact Team
                  </Button>
                </div>
                <Button 
                  variant="default" 
                  size="sm" 
                  iconName="Eye" 
                  iconPosition="left"
                  onClick={() => navigate(`/dashboard/bookings/${move.id}`)}
                >
                  View Details
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UpcomingMoves;