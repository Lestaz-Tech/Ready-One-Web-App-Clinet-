import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import DashboardSidebar from '../../components/ui/DashboardSidebar';
import { useAuth } from '../../contexts/AuthContext';

const DashboardLayout = () => {
  const { signOut } = useAuth();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleLogout = async () => {
    try {
      await signOut();
    } catch (err) {
      console.warn('Logout failed', err);
    }
  };

  const handleToggleCollapse = () => setIsCollapsed(prev => !prev);

  return (
    <div className="min-h-screen bg-background">
      <DashboardSidebar
        isCollapsed={isCollapsed}
        onToggleCollapse={handleToggleCollapse}
        onLogout={handleLogout}
      />
      <div className={`transition-all duration-300 ease-out p-4 lg:p-8 ${isCollapsed ? 'lg:ml-16' : 'lg:ml-64'}`}>
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
