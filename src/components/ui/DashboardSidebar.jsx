import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';


const DashboardSidebar = ({ isCollapsed = false, onToggleCollapse, onLogout }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navigationItems = [
    { 
      label: 'Dashboard', 
      path: '/dashboard', 
      icon: 'LayoutDashboard',
      description: 'Overview & Analytics'
    },
    { 
      label: 'My Bookings', 
      path: '/dashboard/bookings', 
      icon: 'Calendar',
      description: 'Manage your moves'
    },
    { 
      label: 'Upcoming Moves', 
      path: '/dashboard/upcoming', 
      icon: 'Truck',
      description: 'View upcoming moves'
    },
    { 
      label: 'Payments', 
      path: '/dashboard/payments', 
      icon: 'CreditCard',
      description: 'Payment history'
    },
    { 
      label: 'Notifications', 
      path: '/dashboard/notifications', 
      icon: 'Bell',
      description: 'All notifications'
    },
    { 
      label: 'Services', 
      path: '/dashboard/services', 
      icon: 'ShoppingCart',
      description: 'Book services'
    },
    { 
      label: 'Profile', 
      path: '/dashboard/profile', 
      icon: 'User',
      description: 'Account settings'
    },
    { 
      label: 'Support', 
      path: '/dashboard/support', 
      icon: 'HelpCircle',
      description: 'Get help'
    }
  ];

  const isActivePath = (path) => location?.pathname === path;

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
    closeMobileMenu();
  };

  const handleToggleCollapse = () => {
    if (onToggleCollapse) {
      onToggleCollapse();
    }
  };

  return (
    <>
      {/* Mobile Header */}
      <div className="lg:hidden sticky top-0 z-50 w-full bg-card border-b border-border shadow-sm">
        <div className="flex items-center justify-between h-16 px-4">
          <Link to="/dashboard" className="flex items-center space-x-2">
            <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-lg">
              <Icon name="Truck" size={18} color="white" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold text-foreground">Ready One</span>
              <span className="text-xs font-medium text-primary -mt-1">Dashboard</span>
            </div>
          </Link>
          
          <button
            onClick={toggleMobileMenu}
            className="flex items-center justify-center w-10 h-10 rounded-md text-foreground hover:bg-accent/10 transition-colors duration-200"
            aria-label="Toggle mobile menu"
          >
            <Icon name={isMobileMenuOpen ? 'X' : 'Menu'} size={24} />
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-card border-b border-border shadow-lg animate-slide-in">
            <div className="px-4 py-3 space-y-1">
              {navigationItems?.map((item) => (
                <Link
                  key={item?.path}
                  to={item?.path}
                  onClick={closeMobileMenu}
                  className={`flex items-center space-x-3 px-3 py-3 rounded-md transition-colors duration-200 ${
                    isActivePath(item?.path)
                      ? 'text-primary bg-accent/10' :'text-foreground hover:text-primary hover:bg-accent/5'
                  }`}
                >
                  <Icon name={item?.icon} size={20} />
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">{item?.label}</span>
                    <span className="text-xs text-muted-foreground">{item?.description}</span>
                  </div>
                </Link>
              ))}
              
              <div className="border-t border-border pt-3 mt-3">
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-3 px-3 py-3 rounded-md text-foreground hover:text-error hover:bg-error/5 transition-colors duration-200 w-full text-left"
                >
                  <Icon name="LogOut" size={20} />
                  <span className="text-sm font-medium">Logout</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Desktop Sidebar */}
      <aside className={`hidden lg:flex lg:fixed lg:inset-y-0 lg:left-0 lg:z-40 lg:flex-col transition-all duration-300 ease-out ${
        isCollapsed ? 'lg:w-16' : 'lg:w-64'
      }`}>
        <div className="flex flex-col flex-1 bg-card border-r border-border shadow-sm">
          {/* Logo Section */}
          <div className="flex items-center justify-between h-16 px-4 border-b border-border">
            <Link 
              to="/dashboard" 
              className={`flex items-center space-x-2 hover:opacity-80 transition-opacity duration-200 ${
                isCollapsed ? 'justify-center' : ''
              }`}
            >
              <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-lg flex-shrink-0">
                <Icon name="Truck" size={18} color="white" />
              </div>
              {!isCollapsed && (
                <div className="flex flex-col">
                  <span className="text-lg font-bold text-foreground">Ready One</span>
                  <span className="text-xs font-medium text-primary -mt-1">Dashboard</span>
                </div>
              )}
            </Link>
            
            {!isCollapsed && (
              <button
                onClick={handleToggleCollapse}
                className="flex items-center justify-center w-8 h-8 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent/10 transition-colors duration-200"
                aria-label="Collapse sidebar"
              >
                <Icon name="ChevronLeft" size={18} />
              </button>
            )}
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
            {navigationItems?.map((item) => (
              <Link
                key={item?.path}
                to={item?.path}
                className={`group flex items-center px-3 py-3 rounded-md text-sm font-medium transition-colors duration-200 ${
                  isActivePath(item?.path)
                    ? 'text-primary bg-accent/10' :'text-foreground hover:text-primary hover:bg-accent/5'
                } ${isCollapsed ? 'justify-center' : ''}`}
                title={isCollapsed ? item?.label : ''}
              >
                <Icon name={item?.icon} size={20} className="flex-shrink-0" />
                {!isCollapsed && (
                  <div className="ml-3 flex flex-col">
                    <span>{item?.label}</span>
                    <span className="text-xs text-muted-foreground group-hover:text-primary/70 transition-colors duration-200">
                      {item?.description}
                    </span>
                  </div>
                )}
              </Link>
            ))}
          </nav>

          {/* Collapse Toggle (when collapsed) */}
          {isCollapsed && (
            <div className="px-3 py-4 border-t border-border">
              <button
                onClick={handleToggleCollapse}
                className="flex items-center justify-center w-full h-10 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent/10 transition-colors duration-200"
                aria-label="Expand sidebar"
              >
                <Icon name="ChevronRight" size={18} />
              </button>
            </div>
          )}

          {/* User Section */}
          <div className="px-3 py-4 border-t border-border">
            <button
              onClick={handleLogout}
              className={`group flex items-center w-full px-3 py-3 rounded-md text-sm font-medium text-foreground hover:text-error hover:bg-error/5 transition-colors duration-200 ${
                isCollapsed ? 'justify-center' : ''
              }`}
              title={isCollapsed ? 'Logout' : ''}
            >
              <Icon name="LogOut" size={20} className="flex-shrink-0" />
              {!isCollapsed && <span className="ml-3">Logout</span>}
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default DashboardSidebar;