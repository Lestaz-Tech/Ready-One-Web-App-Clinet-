import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const LoginBenefits = () => {
  const benefits = [
    {
      id: 1,
      icon: 'Calendar',
      title: 'Easy Booking',
      description: 'Schedule your moves with just a few clicks and track progress in real-time'
    },
    {
      id: 2,
      icon: 'CreditCard',
      title: 'Flexible Payments',
      description: 'Pay with M-Pesa, card, or cash - before or after service completion'
    },
    {
      id: 3,
      icon: 'History',
      title: 'Booking History',
      description: 'Access all your past and upcoming moves in one convenient dashboard'
    },
    {
      id: 4,
      icon: 'Headphones',
      title: '24/7 Support',
      description: 'Get instant help through WhatsApp or our dedicated support center'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Section Header */}
      <div className="text-center">
        <h3 className="text-2xl font-bold text-foreground mb-3">
          Why Choose Ready One Movers?
        </h3>
        <p className="text-muted-foreground">
          Join thousands of satisfied customers across Kenya
        </p>
      </div>
      {/* Benefits Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {benefits?.map((benefit, index) => (
          <motion.div
            key={benefit?.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-card rounded-2xl p-6 border border-border hover:shadow-lg transition-shadow duration-300"
          >
            <div className="flex items-start space-x-4">
              <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-xl flex-shrink-0">
                <Icon name={benefit?.icon} size={24} className="text-primary" />
              </div>
              <div className="flex-1">
                <h4 className="text-lg font-semibold text-foreground mb-2">
                  {benefit?.title}
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {benefit?.description}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      {/* Statistics */}
      <div className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-2xl p-6 border border-primary/10">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-primary mb-1">5000+</div>
            <div className="text-sm text-muted-foreground">Happy Customers</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-primary mb-1">47</div>
            <div className="text-sm text-muted-foreground">Counties Covered</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-primary mb-1">99%</div>
            <div className="text-sm text-muted-foreground">Success Rate</div>
          </div>
        </div>
      </div>
      {/* Contact Info */}
      <div className="text-center space-y-3">
        <p className="text-sm text-muted-foreground">
          Need immediate assistance?
        </p>
        <div className="flex items-center justify-center space-x-6 text-sm">
          <div className="flex items-center space-x-2">
            <Icon name="Phone" size={16} className="text-primary" />
            <span className="text-foreground">+254 700 000 000</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="MessageCircle" size={16} className="text-success" />
            <span className="text-foreground">WhatsApp Support</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginBenefits;