import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActions = () => {
  const quickActions = [
    {
      id: 1,
      title: "Book New Move",
      description: "Schedule your next moving service",
      icon: "Plus",
      color: "primary",
      path: "/dashboard/services",
      bgColor: "bg-primary/10",
      textColor: "text-primary"
    },
    {
      id: 2,
      title: "View Bookings",
      description: "Check your booking history",
      icon: "Calendar",
      color: "secondary",
      path: "/dashboard/bookings",
      bgColor: "bg-secondary/10",
      textColor: "text-secondary"
    },
    {
      id: 3,
      title: "Get Support",
      description: "Contact our support team",
      icon: "HelpCircle",
      color: "success",
      path: "/dashboard/support",
      bgColor: "bg-success/10",
      textColor: "text-success"
    },
    {
      id: 4,
      title: "Account Settings",
      description: "Manage your profile",
      icon: "Settings",
      color: "warning",
      path: "/dashboard/profile",
      bgColor: "bg-warning/10",
      textColor: "text-warning"
    }
  ];

  return (
    <div className="bg-card border border-border rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-foreground">Quick Actions</h2>
        <Icon name="Zap" size={24} className="text-primary" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {quickActions?.map((action) => (
          <Link
            key={action?.id}
            to={action?.path}
            className="group block p-4 rounded-xl border border-border hover:border-primary/30 hover:shadow-md transition-all duration-200"
          >
            <div className="flex items-start space-x-4">
              <div className={`p-3 rounded-xl ${action?.bgColor} group-hover:scale-110 transition-transform duration-200`}>
                <Icon name={action?.icon} size={24} className={action?.textColor} />
              </div>
              
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors duration-200 mb-1">
                  {action?.title}
                </h3>
                <p className="text-xs text-muted-foreground line-clamp-2">
                  {action?.description}
                </p>
              </div>
              
              <Icon 
                name="ChevronRight" 
                size={16} 
                className="text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all duration-200" 
              />
            </div>
          </Link>
        ))}
      </div>
      <div className="mt-6 pt-6 border-t border-border">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-1">Need immediate assistance?</h3>
            <p className="text-xs text-muted-foreground">Our team is available 24/7 to help you</p>
          </div>
          <Button variant="outline" size="sm" iconName="Phone" iconPosition="left">
            Call Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuickActions;