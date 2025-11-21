import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useAuth } from '../../contexts/AuthContext';
import WhatsAppIntegration from '../../components/ui/WhatsAppIntegration';
import WelcomeSection from './components/WelcomeSection';
import MetricsCard from './components/MetricsCard';
import RecentActivity from './components/RecentActivity';
import QuickActions from './components/QuickActions';
import { api } from '../../utils/apiClient';

const DashboardHome = () => {
  const { user, session, loading: authLoading } = useAuth();
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [metricsData, setMetricsData] = useState([]);
  const [loadingMetrics, setLoadingMetrics] = useState(true);

  const userData = {
    name: user?.user_metadata?.full_name || user?.email || 'User',
    email: user?.email || '',
    lastLogin: user?.last_sign_in_at || ''
  };

  // Fetch real metrics from backend
  React.useEffect(() => {
    const fetchMetrics = async () => {
      // Wait for auth to finish loading
      if (authLoading) {
        console.log('[Dashboard] Auth still loading...');
        return;
      }

      if (!session || !session.access_token) {
        console.log('[Dashboard] No active session');
        setLoadingMetrics(false);
        return;
      }
      
      setLoadingMetrics(true);
      try {
        const result = await api.get('/api/users/stats', {
          headers: {
            'Authorization': `Bearer ${session.access_token}`
          }
        });
        
        if (result.success && result.data) {
          const { total_bookings, completed_bookings, pending_bookings, total_spent } = result.data;
          setMetricsData([
            {
              title: "Total Moves",
              value: total_bookings || "0",
              subtitle: "Bookings created",
              icon: "Truck",
              color: "primary",
              trend: { type: "up", value: `${completed_bookings || 0} completed` }
            },
            {
              title: "Pending Requests",
              value: pending_bookings || "0",
              subtitle: "Awaiting confirmation",
              icon: "Clock",
              color: "warning",
              trend: { type: "up", value: "In progress" }
            },
            {
              title: "Completed",
              value: completed_bookings || "0",
              subtitle: "Successful moves",
              icon: "CheckCircle",
              color: "success",
              trend: { type: "up", value: "All time" }
            },
            {
              title: "Total Spent",
              value: `KES ${(total_spent || 0).toLocaleString()}`,
              subtitle: "On moves",
              icon: "CreditCard",
              color: "secondary",
              trend: { type: "up", value: "All time" }
            }
          ]);
        } else {
          console.warn('[Dashboard] Unexpected response format:', result);
        }
      } catch (error) {
        console.error('[Dashboard] Metrics error:', error.message);
        setMetricsData([]);
      } finally {
        setLoadingMetrics(false);
      }
    };

    fetchMetrics();
  }, [session, authLoading]);

  return (
    <div>
      <Helmet>
        <title>Dashboard - Ready One Movers</title>
      </Helmet>

      <div className="space-y-8">
        {/* Welcome Section */}
        <WelcomeSection 
          userName={userData?.name}
          lastLogin={userData?.lastLogin}
        />

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {loadingMetrics ? (
            <div className="col-span-full text-center py-8 text-muted-foreground">Loading metrics...</div>
          ) : metricsData.length > 0 ? (
            metricsData.map((metric, index) => (
              <MetricsCard
                key={index}
                title={metric?.title}
                value={metric?.value}
                subtitle={metric?.subtitle}
                icon={metric?.icon}
                color={metric?.color}
                trend={metric?.trend}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-8 text-muted-foreground">No data available yet</div>
          )}
        </div>

        {/* Main Dashboard Grid - Quick Actions Top, Recent Activity Below */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Quick Actions at top, Recent Activity below */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Actions */}
            <QuickActions />
            
            {/* Recent Activity/Bookings - Compact Table */}
            <RecentActivity />
          </div>

          {/* Right Column - Additional Info (if needed) */}
          <div className="space-y-8">
            {/* Placeholder for additional widgets */}
            <div className="bg-card border border-border rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Need Help?</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Our support team is available 24/7 to assist you with any questions or concerns.
              </p>
              <a href="/dashboard/support" className="text-primary hover:text-primary/80 text-sm font-medium">
                Contact Support →
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Detail Modal */}
      {selectedBooking && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-card rounded-2xl border border-border max-w-2xl w-full max-h-96 overflow-y-auto">
            <div className="p-6 border-b border-border flex justify-between items-start">
              <h2 className="text-2xl font-bold text-foreground">Booking Details</h2>
              <button
                onClick={() => setSelectedBooking(null)}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                ✕
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Service Type</p>
                  <p className="font-semibold text-foreground">{selectedBooking?.service_type || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Status</p>
                  <p className="font-semibold">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      selectedBooking?.status === 'completed' ? 'bg-success/10 text-success' :
                      selectedBooking?.status === 'pending' ? 'bg-warning/10 text-warning' :
                      selectedBooking?.status === 'confirmed' ? 'bg-primary/10 text-primary' :
                      'bg-muted text-muted-foreground'
                    }`}>
                      {selectedBooking?.status || 'N/A'}
                    </span>
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">From</p>
                  <p className="font-semibold text-foreground">{selectedBooking?.from_location || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">To</p>
                  <p className="font-semibold text-foreground">{selectedBooking?.to_location || 'N/A'}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Date</p>
                  <p className="font-semibold text-foreground">
                    {selectedBooking?.booking_date ? new Date(selectedBooking.booking_date).toLocaleDateString() : 'N/A'}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Estimated Cost</p>
                  <p className="font-semibold text-foreground">
                    KES {selectedBooking?.estimated_cost ? selectedBooking.estimated_cost.toLocaleString() : '0'}
                  </p>
                </div>
              </div>

              {selectedBooking?.special_instructions && (
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Special Instructions</p>
                  <p className="text-foreground bg-muted/50 p-3 rounded-lg text-sm">
                    {selectedBooking.special_instructions}
                  </p>
                </div>
              )}

              <div className="pt-4 border-t border-border flex gap-3">
                <button
                  onClick={() => setSelectedBooking(null)}
                  className="flex-1 px-4 py-2 rounded-lg border border-border hover:border-primary/50 text-foreground hover:bg-muted/50 transition-colors font-medium"
                >
                  Close
                </button>
                <a
                  href={`/dashboard/bookings/${selectedBooking?.id}`}
                  className="flex-1 px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors font-medium text-center"
                >
                  View Full Details
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* WhatsApp Integration */}
      <WhatsAppIntegration
        phoneNumber="+254700000000"
        defaultMessage="Hi! I need help with my Ready One Movers dashboard."
        position="bottom-right"
        showTooltip={true}
      />
    </div>
  );
};

export default DashboardHome;