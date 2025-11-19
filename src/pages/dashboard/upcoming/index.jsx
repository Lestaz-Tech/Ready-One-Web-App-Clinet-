import React from 'react';
import { Helmet } from 'react-helmet';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const UpcomingPage = () => {
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
    <div>
      <Helmet>
        <title>Upcoming Moves</title>
      </Helmet>

      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Upcoming Moves</h1>
          <Button variant="default" size="lg" iconName="Plus" iconPosition="left">
            New Booking
          </Button>
        </div>

        {upcomingMoves?.length === 0 ? (
          <div className="bg-card border border-border rounded-2xl p-12 text-center">
            <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
              <Icon name="Calendar" size={40} className="text-muted-foreground" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-3">No Upcoming Moves</h2>
            <p className="text-muted-foreground mb-6">You don't have any scheduled moves at the moment.</p>
            <Button variant="default" size="lg" iconName="Plus" iconPosition="left">
              Schedule a Move
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            {upcomingMoves?.map((move) => (
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
    </div>
  );
};

export default UpcomingPage;
