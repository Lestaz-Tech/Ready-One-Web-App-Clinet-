import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RecentActivity = () => {
  const activities = [
    {
      id: 1,
      type: "booking_created",
      title: "New Booking Created",
      description: "3-bedroom house move from Westlands to Karen",
      date: "2025-11-16",
      time: "14:30",
      status: "pending",
      icon: "Calendar",
      color: "warning"
    },
    {
      id: 2,
      type: "booking_completed",
      title: "Move Completed",
      description: "Office relocation from CBD to Kilimani",
      date: "2025-11-15",
      time: "16:45",
      status: "completed",
      icon: "CheckCircle",
      color: "success"
    },
    {
      id: 3,
      type: "payment_received",
      title: "Payment Confirmed",
      description: "Mpesa payment of KES 25,000 received",
      date: "2025-11-14",
      time: "10:20",
      status: "completed",
      icon: "CreditCard",
      color: "primary"
    },
    {
      id: 4,
      type: "support_ticket",
      title: "Support Ticket Resolved",
      description: "Query about packing materials answered",
      date: "2025-11-13",
      time: "09:15",
      status: "resolved",
      icon: "MessageCircle",
      color: "secondary"
    }
  ];

  const getStatusBadge = (status) => {
    const statusClasses = {
      pending: "bg-warning/10 text-warning border-warning/20",
      completed: "bg-success/10 text-success border-success/20",
      resolved: "bg-secondary/10 text-secondary border-secondary/20"
    };

    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${statusClasses?.[status]}`}>
        {status?.charAt(0)?.toUpperCase() + status?.slice(1)}
      </span>
    );
  };

  const getIconColor = (color) => {
    const colors = {
      primary: "text-primary",
      success: "text-success",
      warning: "text-warning",
      secondary: "text-secondary"
    };
    return colors?.[color] || "text-muted-foreground";
  };

  return (
    <div className="bg-card border border-border rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-foreground">Recent Activity</h2>
        <Button variant="outline" size="sm" iconName="ExternalLink" iconPosition="right">
          View All
        </Button>
      </div>
      <div className="space-y-4">
        {activities?.map((activity) => (
          <div key={activity?.id} className="flex items-start space-x-4 p-4 rounded-xl hover:bg-muted/50 transition-colors duration-200">
            <div className={`p-2 rounded-lg bg-muted ${getIconColor(activity?.color)}`}>
              <Icon name={activity?.icon} size={20} />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between mb-1">
                <h3 className="text-sm font-semibold text-foreground truncate">
                  {activity?.title}
                </h3>
                {getStatusBadge(activity?.status)}
              </div>
              
              <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                {activity?.description}
              </p>
              
              <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Icon name="Calendar" size={12} />
                  <span>{activity?.date}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="Clock" size={12} />
                  <span>{activity?.time}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivity;