import React from 'react';
import Icon from '../../../components/AppIcon';

const WelcomeSection = ({ userName = "Agaga Lawrence", lastLogin = "2025-11-16 14:30" }) => {
  const getCurrentGreeting = () => {
    const hour = new Date()?.getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

  return (
    <div className="bg-gradient-to-r from-primary to-secondary rounded-2xl p-6 text-white mb-6">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h1 className="text-2xl lg:text-3xl font-bold mb-2">
            {getCurrentGreeting()}, {userName}!
          </h1>
          <p className="text-white/90 mb-4">
            Welcome back to your Ready One Movers dashboard. Manage your moves with ease.
          </p>
          <div className="flex items-center space-x-4 text-sm text-white/80">
            <div className="flex items-center space-x-2">
              <Icon name="Clock" size={16} />
              <span>Last login: {lastLogin}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Shield" size={16} />
              <span>Account verified</span>
            </div>
          </div>
        </div>
        <div className="hidden lg:block">
          <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center">
            <Icon name="Truck" size={48} color="white" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeSection;