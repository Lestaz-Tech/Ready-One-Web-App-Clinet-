import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const PublicNavigation = ({ isAuthenticated = false, onLogout }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navigationItems = [
    { label: 'Home', path: '/home', icon: 'Home' },
    { label: 'About', path: '/about', icon: 'Info' },
    { label: 'Services', path: '/services', icon: 'Truck' },
    { label: 'Contact', path: '/contact', icon: 'Phone' },
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

  return (
    <header className="sticky top-0 z-50 w-full bg-card border-b border-border shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link 
            to="/home" 
            className="flex items-center space-x-2 hover:opacity-80 transition-opacity duration-200"
            onClick={closeMobileMenu}
          >
            <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
              <Icon name="Truck" size={24} color="white" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-foreground">Ready One</span>
              <span className="text-sm font-medium text-primary -mt-1">Movers</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigationItems?.map((item) => (
              <Link
                key={item?.path}
                to={item?.path}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  isActivePath(item?.path)
                    ? 'text-primary bg-accent/10' :'text-foreground hover:text-primary hover:bg-accent/5'
                }`}
              >
                <Icon name={item?.icon} size={18} />
                <span>{item?.label}</span>
              </Link>
            ))}
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            {isAuthenticated ? (
              <div className="flex items-center space-x-3">
                <Link to="/dashboard">
                  <Button variant="outline" size="sm">
                    Dashboard
                  </Button>
                </Link>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={handleLogout}
                  iconName="LogOut"
                  iconPosition="left"
                >
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link to="/login">
                  <Button variant="ghost" size="sm">
                    Login
                  </Button>
                </Link>
                <Link to="/sign-up">
                  <Button variant="default" size="sm">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-md text-foreground hover:bg-accent/10 transition-colors duration-200"
            aria-label="Toggle mobile menu"
          >
            <Icon name={isMobileMenuOpen ? 'X' : 'Menu'} size={24} />
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-border bg-card animate-slide-in">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigationItems?.map((item) => (
                <Link
                  key={item?.path}
                  to={item?.path}
                  onClick={closeMobileMenu}
                  className={`flex items-center space-x-3 px-3 py-3 rounded-md text-base font-medium transition-colors duration-200 ${
                    isActivePath(item?.path)
                      ? 'text-primary bg-accent/10' :'text-foreground hover:text-primary hover:bg-accent/5'
                  }`}
                >
                  <Icon name={item?.icon} size={20} />
                  <span>{item?.label}</span>
                </Link>
              ))}
              
              <div className="border-t border-border pt-3 mt-3">
                {isAuthenticated ? (
                  <div className="space-y-2">
                    <Link 
                      to="/dashboard" 
                      onClick={closeMobileMenu}
                      className="flex items-center space-x-3 px-3 py-3 rounded-md text-base font-medium text-foreground hover:text-primary hover:bg-accent/5 transition-colors duration-200"
                    >
                      <Icon name="LayoutDashboard" size={20} />
                      <span>Dashboard</span>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center space-x-3 px-3 py-3 rounded-md text-base font-medium text-foreground hover:text-primary hover:bg-accent/5 transition-colors duration-200 w-full text-left"
                    >
                      <Icon name="LogOut" size={20} />
                      <span>Logout</span>
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Link 
                      to="/login" 
                      onClick={closeMobileMenu}
                      className="flex items-center space-x-3 px-3 py-3 rounded-md text-base font-medium text-foreground hover:text-primary hover:bg-accent/5 transition-colors duration-200"
                    >
                      <Icon name="LogIn" size={20} />
                      <span>Login</span>
                    </Link>
                    <Link 
                      to="/sign-up" 
                      onClick={closeMobileMenu}
                      className="flex items-center space-x-3 px-3 py-3 rounded-md text-base font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-200"
                    >
                      <Icon name="UserPlus" size={20} />
                      <span>Sign Up</span>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default PublicNavigation;