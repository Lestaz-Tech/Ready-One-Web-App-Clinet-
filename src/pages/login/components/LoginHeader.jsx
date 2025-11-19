import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const LoginHeader = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="text-center mb-12"
    >
      {/* Logo */}
      <Link 
        to="/home" 
        className="inline-flex items-center space-x-3 hover:opacity-80 transition-opacity duration-200 mb-8"
      >
        <div className="flex items-center justify-center w-12 h-12 bg-primary rounded-2xl">
          <Icon name="Truck" size={28} color="white" />
        </div>
        <div className="flex flex-col text-left">
          <span className="text-2xl font-bold text-foreground">Ready One</span>
          <span className="text-lg font-medium text-primary -mt-1">Movers</span>
        </div>
      </Link>
      {/* Welcome Message */}
      <div className="space-y-2">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground">
          Access Your Account
        </h2>
        <p className="text-lg text-muted-foreground max-w-md mx-auto">
          Manage your bookings, track your moves, and access our premium moving services
        </p>
      </div>
      {/* Trust Indicators */}
      <div className="flex items-center justify-center space-x-6 mt-8 text-sm text-muted-foreground">
        <div className="flex items-center space-x-2">
          <Icon name="Shield" size={16} className="text-success" />
          <span>Secure Login</span>
        </div>
        <div className="flex items-center space-x-2">
          <Icon name="Clock" size={16} className="text-primary" />
          <span>24/7 Support</span>
        </div>
        <div className="flex items-center space-x-2">
          <Icon name="MapPin" size={16} className="text-accent" />
          <span>Kenya Wide</span>
        </div>
      </div>
    </motion.div>
  );
};

export default LoginHeader;