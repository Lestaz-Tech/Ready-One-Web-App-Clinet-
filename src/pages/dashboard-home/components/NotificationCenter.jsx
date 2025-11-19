import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const NotificationCenter = () => {
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
    <div className="bg-card border border-border rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <h2 className="text-xl font-bold text-foreground">Notifications</h2>
          {unreadCount > 0 && (
            <div className="flex items-center justify-center w-6 h-6 bg-error text-white text-xs font-bold rounded-full">
              {unreadCount}
            </div>
          )}
        </div>
        <div className="flex items-center space-x-2">
          {unreadCount > 0 && (
            <Button variant="ghost" size="sm" onClick={markAllAsRead}>
              Mark all read
            </Button>
          )}
          <Button variant="outline" size="sm" iconName="Settings" iconPosition="left">
            Settings
          </Button>
        </div>
      </div>
      {notifications?.length === 0 ? (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="Bell" size={32} className="text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">No Notifications</h3>
          <p className="text-muted-foreground">You're all caught up! Check back later for updates.</p>
        </div>
      ) : (
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {notifications?.map((notification) => (
            <div
              key={notification?.id}
              className={`p-4 rounded-xl border transition-all duration-200 cursor-pointer hover:shadow-sm ${
                notification?.isRead 
                  ? 'border-border bg-card hover:bg-muted/30' :'border-primary/30 bg-primary/5 hover:bg-primary/10'
              }`}
              onClick={() => markAsRead(notification?.id)}
            >
              <div className="flex items-start space-x-3">
                <div className={`p-2 rounded-lg bg-muted ${getIconColor(notification?.color)} flex-shrink-0`}>
                  <Icon name={notification?.icon} size={18} />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className={`text-sm font-semibold ${
                      notification?.isRead ? 'text-foreground' : 'text-foreground'
                    } truncate`}>
                      {notification?.title}
                    </h3>
                    <div className="flex items-center space-x-2 ml-2">
                      {getPriorityBadge(notification?.priority)}
                      {!notification?.isRead && (
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                      )}
                    </div>
                  </div>
                  
                  <p className={`text-sm mb-2 line-clamp-2 ${
                    notification?.isRead ? 'text-muted-foreground' : 'text-foreground/80'
                  }`}>
                    {notification?.message}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      {formatTimestamp(notification?.timestamp)}
                    </span>
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
                        View
                      </Button>
                      {notification?.type === 'booking_confirmation' && (
                        <Button variant="outline" size="sm" className="h-6 px-2 text-xs">
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
      <div className="mt-6 pt-6 border-t border-border">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-1">Notification Preferences</h3>
            <p className="text-xs text-muted-foreground">Manage how you receive updates</p>
          </div>
          <Button variant="ghost" size="sm" iconName="Bell" iconPosition="left">
            Preferences
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotificationCenter;