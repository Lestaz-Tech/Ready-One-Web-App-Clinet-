import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const UpcomingMoves = () => {
  const upcomingMoves = [
    {
      id: 1,
      type: "House Moving",
      category: "3-Bedroom Apartment",
      from: "Westlands, Nairobi",
      to: "Karen, Nairobi",
      date: "2025-11-20",
      time: "08:00",
      status: "confirmed",
      daysLeft: 3,
      estimatedCost: "KES 35,000",
      teamAssigned: "Team Alpha",
      specialInstructions: "Fragile items - handle with care"
    },
    {
      id: 2,
      type: "Office Moving",
      category: "Small Office",
      from: "CBD, Nairobi",
      to: "Kilimani, Nairobi",
      date: "2025-11-25",
      time: "09:30",
      status: "pending_confirmation",
      daysLeft: 8,
      estimatedCost: "KES 28,000",
      teamAssigned: "Team Beta",
      specialInstructions: "IT equipment requires special handling"
    }
  ];

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
        <Button variant="outline" size="sm" iconName="Plus" iconPosition="left">
          New Booking
        </Button>
      </div>
      {upcomingMoves?.length === 0 ? (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="Calendar" size={32} className="text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">No Upcoming Moves</h3>
          <p className="text-muted-foreground mb-4">You don't have any scheduled moves at the moment.</p>
          <Button variant="default" iconName="Plus" iconPosition="left">
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
                  <Button variant="outline" size="sm" iconName="MessageCircle" iconPosition="left">
                    Contact Team
                  </Button>
                  <Button variant="ghost" size="sm" iconName="Edit" iconPosition="left">
                    Modify
                  </Button>
                </div>
                <Button variant="default" size="sm" iconName="Eye" iconPosition="left">
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