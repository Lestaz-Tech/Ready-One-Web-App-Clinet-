import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "booking_confirmation",
      title: "Booking Confirmed",
      message: "Your 3-bedroom house move has been confirmed for November 20th at 8:00 AM.",
      timestamp: "2025-11-16 14:30",
      isRead: false,
      priority: "high",
      icon: "CheckCircle",
      color: "success"
    },
    {
      id: 2,
      type: "payment_reminder",
      title: "Payment Due Soon",
      message: "Payment of KES 35,000 is due in 3 days for your upcoming move.",
      timestamp: "2025-11-16 10:15",
      isRead: false,
      priority: "medium",
      icon: "CreditCard",
      color: "warning"
    },
    {
      id: 3,
      type: "team_assignment",
      title: "Team Assigned",
      message: "Team Alpha has been assigned to your move. Contact: +254 700 123 456",
      timestamp: "2025-11-15 16:45",
      isRead: true,
      priority: "medium",
      icon: "Users",
      color: "primary"
    },
    {
      id: 4,
      type: "service_update",
      title: "New Service Available",
      message: "We now offer international moving services to Uganda and Tanzania.",
      timestamp: "2025-11-14 09:20",
      isRead: true,
      priority: "low",
      icon: "Truck",
      color: "secondary"
    },
    {
      id: 5,
      type: "support_response",
      title: "Support Ticket Resolved",
      message: "Your query about packing materials has been answered. Check your email for details.",
      timestamp: "2025-11-13 11:30",
      isRead: true,
      priority: "low",
      icon: "MessageCircle",
      color: "success"
    }
  ]);

  const unreadCount = notifications?.filter(n => !n?.isRead)?.length;

  const markAsRead = (id) => {
    setNotifications(prev => 
      prev?.map(notification => 
        notification?.id === id 
          ? { ...notification, isRead: true }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev?.map(notification => ({ ...notification, isRead: true }))
    );
  };

  const getPriorityBadge = (priority) => {
    const priorityConfig = {
      high: { class: "bg-error/10 text-error border-error/20", text: "High" },
      medium: { class: "bg-warning/10 text-warning border-warning/20", text: "Medium" },
      low: { class: "bg-muted text-muted-foreground border-border", text: "Low" }
    };

    const config = priorityConfig?.[priority] || priorityConfig?.low;
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${config?.class}`}>
        {config?.text}
      </span>
    );
  };

  const getIconColor = (color) => {
    const colors = {
      primary: "text-primary",
      success: "text-success",
      warning: "text-warning",
      secondary: "text-secondary",
      error: "text-error"
    };
    return colors?.[color] || "text-muted-foreground";
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 48) return "Yesterday";
    return date?.toLocaleDateString();
  };

  return (
    <div>
      <Helmet>
        <title>Notifications</title>
      </Helmet>

      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <h1 className="text-3xl font-bold">Notifications</h1>
            {unreadCount > 0 && (
              <div className="flex items-center justify-center w-8 h-8 bg-error text-white text-sm font-bold rounded-full">
                {unreadCount}
              </div>
            )}
          </div>
          <div className="flex items-center gap-2">
            {unreadCount > 0 && (
              <Button variant="outline" size="lg" onClick={markAllAsRead}>
                Mark all read
              </Button>
            )}
            <Button variant="outline" size="lg" iconName="Settings" iconPosition="left">
              Settings
            </Button>
          </div>
        </div>

        {notifications?.length === 0 ? (
          <div className="bg-card border border-border rounded-2xl p-12 text-center">
            <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
              <Icon name="Bell" size={40} className="text-muted-foreground" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-3">No Notifications</h2>
            <p className="text-muted-foreground">You're all caught up! Check back later for updates.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {notifications?.map((notification) => (
              <div
                key={notification?.id}
                className={`p-6 rounded-2xl border transition-all duration-200 cursor-pointer hover:shadow-md ${
                  notification?.isRead 
                    ? 'border-border bg-card hover:bg-muted/30' :'border-primary/30 bg-primary/5 hover:bg-primary/10'
                }`}
                onClick={() => markAsRead(notification?.id)}
              >
                <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                  <div className={`p-3 rounded-lg bg-muted flex-shrink-0 ${getIconColor(notification?.color)}`}>
                    <Icon name={notification?.icon} size={20} />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                      <h2 className={`text-lg font-semibold truncate ${
                        notification?.isRead ? 'text-foreground' : 'text-foreground'
                      }`}>
                        {notification?.title}
                      </h2>
                      <div className="flex items-center space-x-2 flex-shrink-0">
                        {getPriorityBadge(notification?.priority)}
                        {!notification?.isRead && (
                          <div className="w-3 h-3 bg-primary rounded-full flex-shrink-0"></div>
                        )}
                      </div>
                    </div>
                    
                    <p className={`text-sm mb-4 ${
                      notification?.isRead ? 'text-muted-foreground' : 'text-foreground/80'
                    }`}>
                      {notification?.message}
                    </p>
                    
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-3 border-t border-border/50">
                      <span className="text-xs text-muted-foreground">
                        {formatTimestamp(notification?.timestamp)}
                      </span>
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm">
                          View
                        </Button>
                        {notification?.type === 'booking_confirmation' && (
                          <Button variant="outline" size="sm">
                            Details
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="bg-card border border-border rounded-2xl p-6 mt-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-1">Notification Preferences</h3>
              <p className="text-sm text-muted-foreground">Manage how you receive updates</p>
            </div>
            <Button variant="ghost" size="lg" iconName="Bell" iconPosition="left">
              Preferences
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationsPage;
