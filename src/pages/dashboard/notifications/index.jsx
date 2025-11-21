import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { useAuth } from '../../../contexts/AuthContext';
import { api } from '../../../utils/apiClient';

const NotificationsPage = () => {
  const { session } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [filterType, setFilterType] = useState('all');
  const [notificationPrefs, setNotificationPrefs] = useState({
    email: true,
    push: true,
    sms: false,
    bookingUpdates: true,
    paymentNotifications: true,
    supportUpdates: true,
    promotions: false
  });

  // Fetch support tickets as notifications
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        setLoading(true);
        const data = await api.get('/api/support', {
          headers: {
            'Authorization': `Bearer ${session?.access_token}`
          }
        });

        // Convert support tickets to notifications format
        const notificationsList = (data || []).map(ticket => ({
          id: ticket?.id,
          type: "support_ticket",
          title: ticket?.subject || 'Support Ticket',
          message: ticket?.description || ticket?.message || '',
          timestamp: ticket?.created_at,
          isRead: ticket?.status === 'resolved',
          priority: ticket?.status === 'urgent' ? 'high' : ticket?.status === 'open' ? 'medium' : 'low',
          icon: ticket?.status === 'resolved' ? 'CheckCircle' : ticket?.status === 'urgent' ? 'AlertTriangle' : 'MessageCircle',
          color: ticket?.status === 'resolved' ? 'success' : ticket?.status === 'urgent' ? 'error' : 'primary',
          status: ticket?.status
        }));

        setNotifications(notificationsList);
      } catch (error) {
        console.error('Notifications fetch error:', error);
        console.warn('Failed to load notifications. Ensure the server is running at http://localhost:5000');
        setNotifications([]);
      } finally {
        setLoading(false);
      }
    };

    if (session?.access_token) {
      fetchNotifications();
    }
  }, [session?.access_token]);

  const unreadCount = notifications?.filter(n => !n?.isRead)?.length;

  const filteredNotifications = filterType === 'all' 
    ? notifications 
    : notifications.filter(n => n.status === filterType);

  const handleTogglePref = (key) => {
    setNotificationPrefs(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

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
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8"
        >
          <div className="flex items-center space-x-4">
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground">Notifications</h1>
            {unreadCount > 0 && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="flex items-center justify-center w-8 h-8 bg-error text-white text-sm font-bold rounded-full"
              >
                {unreadCount}
              </motion.div>
            )}
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            {unreadCount > 0 && (
              <Button variant="outline" size="sm" onClick={markAllAsRead}>
                Mark all read
              </Button>
            )}
            <Button 
              variant="default" 
              size="sm" 
              iconName="Settings" 
              iconPosition="left"
              onClick={() => setShowSettingsModal(true)}
            >
              Settings
            </Button>
          </div>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap gap-2 mb-6"
        >
          {['all', 'open', 'resolved', 'urgent'].map(type => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                filterType === type
                  ? 'bg-primary text-white shadow-lg shadow-primary/30'
                  : 'bg-muted text-foreground hover:bg-muted/80'
              }`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </motion.div>

        {loading ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-card border border-border rounded-2xl p-12 text-center"
          >
            <Icon name="Loader2" size={40} className="text-primary animate-spin mx-auto mb-4" />
            <p className="text-muted-foreground">Loading notifications...</p>
          </motion.div>
        ) : filteredNotifications?.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card border border-border rounded-2xl p-12 text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
              className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <Icon name="Bell" size={40} className="text-muted-foreground" />
            </motion.div>
            <h2 className="text-2xl font-bold text-foreground mb-3">No Notifications</h2>
            <p className="text-muted-foreground">You're all caught up! Check back later for updates.</p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4"
          >
            <AnimatePresence>
              {filteredNotifications?.map((notification, index) => (
                <motion.div
                  key={notification?.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: index * 0.05 }}
                  className={`p-6 rounded-2xl border transition-all duration-200 cursor-pointer hover:shadow-md ${
                    notification?.isRead 
                      ? 'border-border bg-card hover:bg-muted/30' 
                      : 'border-primary/30 bg-primary/5 hover:bg-primary/10'
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
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Notification Preferences Modal */}
        <AnimatePresence>
          {showSettingsModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
              onClick={() => setShowSettingsModal(false)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="bg-card border border-border rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
                onClick={e => e.stopPropagation()}
              >
                {/* Modal Header */}
                <div className="sticky top-0 flex items-center justify-between p-6 border-b border-border bg-card">
                  <h2 className="text-2xl font-bold text-foreground">Notification Settings</h2>
                  <button
                    onClick={() => setShowSettingsModal(false)}
                    className="p-2 hover:bg-muted rounded-lg transition-colors"
                  >
                    <Icon name="X" size={24} className="text-foreground" />
                  </button>
                </div>

                {/* Modal Content */}
                <div className="p-6 space-y-6">
                  {/* Delivery Methods */}
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-4">Delivery Methods</h3>
                    <div className="space-y-3">
                      {[
                        { key: 'email', label: 'Email Notifications', description: 'Get updates via email' },
                        { key: 'push', label: 'Push Notifications', description: 'Browser notifications' },
                        { key: 'sms', label: 'SMS Notifications', description: 'Text message alerts' }
                      ].map(method => (
                        <div key={method.key} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg hover:bg-muted/80 transition-colors">
                          <div>
                            <p className="font-medium text-foreground">{method.label}</p>
                            <p className="text-sm text-muted-foreground">{method.description}</p>
                          </div>
                          <button
                            onClick={() => handleTogglePref(method.key)}
                            className={`relative w-12 h-7 rounded-full transition-colors ${
                              notificationPrefs[method.key] ? 'bg-success' : 'bg-muted'
                            }`}
                          >
                            <motion.div
                              initial={false}
                              animate={{ x: notificationPrefs[method.key] ? 22 : 2 }}
                              className="absolute top-1 w-5 h-5 bg-white rounded-full"
                            />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Notification Types */}
                  <div className="border-t border-border pt-6">
                    <h3 className="text-lg font-semibold text-foreground mb-4">Notification Types</h3>
                    <div className="space-y-3">
                      {[
                        { key: 'bookingUpdates', label: 'Booking Updates', description: 'Status changes and reminders' },
                        { key: 'paymentNotifications', label: 'Payment Notifications', description: 'Payment confirmations and reminders' },
                        { key: 'supportUpdates', label: 'Support Updates', description: 'Support ticket responses' },
                        { key: 'promotions', label: 'Promotions & Offers', description: 'Special deals and discounts' }
                      ].map(type => (
                        <div key={type.key} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg hover:bg-muted/80 transition-colors">
                          <div>
                            <p className="font-medium text-foreground">{type.label}</p>
                            <p className="text-sm text-muted-foreground">{type.description}</p>
                          </div>
                          <button
                            onClick={() => handleTogglePref(type.key)}
                            className={`relative w-12 h-7 rounded-full transition-colors ${
                              notificationPrefs[type.key] ? 'bg-success' : 'bg-muted'
                            }`}
                          >
                            <motion.div
                              initial={false}
                              animate={{ x: notificationPrefs[type.key] ? 22 : 2 }}
                              className="absolute top-1 w-5 h-5 bg-white rounded-full"
                            />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="border-t border-border pt-6 flex flex-col sm:flex-row gap-3 justify-end">
                    <Button
                      variant="outline"
                      onClick={() => setShowSettingsModal(false)}
                      className="w-full sm:w-auto"
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="default"
                      onClick={() => {
                        setShowSettingsModal(false);
                      }}
                      className="w-full sm:w-auto"
                    >
                      Save Preferences
                    </Button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default NotificationsPage;
