import React, { useState, useEffect } from 'react';
import DashboardSidebar from '../../components/ui/DashboardSidebar';
import { useAuth } from '../../contexts/AuthContext';
import WhatsAppIntegration from '../../components/ui/WhatsAppIntegration';
import WelcomeSection from './components/WelcomeSection';
import MetricsCard from './components/MetricsCard';
import RecentActivity from './components/RecentActivity';
import QuickActions from './components/QuickActions';

const DashboardHome = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const { user, signOut } = useAuth();

  const userData = {
    name: user?.user_metadata?.full_name || user?.email || 'User',
    email: user?.email || '',
    lastLogin: user?.last_sign_in_at || ''
  };

  // Mock metrics data
  const metricsData = [
    {
      title: "Total Moves",
      value: "12",
      subtitle: "Completed successfully",
      icon: "Truck",
      color: "primary",
      trend: { type: "up", value: "+2 this month" }
    },
    {
      title: "Pending Requests",
      value: "2",
      subtitle: "Awaiting confirmation",
      icon: "Clock",
      color: "warning",
      trend: { type: "up", value: "+1 new" }
    },
    {
      title: "This Month",
      value: "3",
      subtitle: "Moves scheduled",
      icon: "Calendar",
      color: "success",
      trend: { type: "up", value: "+50% vs last month" }
    },
    {
      title: "Total Saved",
      value: "KES 45K",
      subtitle: "With our services",
      icon: "PiggyBank",
      color: "secondary",
      trend: { type: "up", value: "+15% savings" }
    }
  ];

  const handleSidebarToggle = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const handleLogout = async () => {
    await signOut();
    window.location.href = '/login';
  };

  useEffect(() => {
    // nothing here; ProtectedRoute guards access
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Dashboard Sidebar */}
      <DashboardSidebar
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={handleSidebarToggle}
        onLogout={handleLogout}
      />
      {/* Main Content */}
      <div className={`transition-all duration-300 ease-out ${
        isSidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'
      }`}>
        <main className="p-4 lg:p-8">
          <div className="max-w-7xl mx-auto space-y-8">
            {/* Welcome Section */}
            <WelcomeSection 
              userName={userData?.name}
              lastLogin={userData?.lastLogin}
            />

            {/* Metrics Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {metricsData?.map((metric, index) => (
                <MetricsCard
                  key={index}
                  title={metric?.title}
                  value={metric?.value}
                  subtitle={metric?.subtitle}
                  icon={metric?.icon}
                  color={metric?.color}
                  trend={metric?.trend}
                />
              ))}
            </div>

            {/* Main Dashboard Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column - Main Content */}
              <div className="lg:col-span-2 space-y-8">
                <RecentActivity />
              </div>

              {/* Right Column - Sidebar Content */}
              <div className="space-y-8">
                <QuickActions />
              </div>
            </div>
          </div>
        </main>
      </div>
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