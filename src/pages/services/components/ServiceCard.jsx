import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ServiceCard = ({ service, isAuthenticated }) => {
  const {
    id,
    title,
    description,
    features,
    priceRange,
    image,
    imageAlt,
    icon,
    popular,
    category
  } = service;

  return (
    <div className={`relative bg-card rounded-2xl border border-border shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group ${
      popular ? 'ring-2 ring-primary/20' : ''
    }`}>
      {/* Popular Badge */}
      {popular && (
        <div className="absolute top-4 right-4 z-10 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-medium">
          Most Popular
        </div>
      )}
      {/* Service Image */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={image}
          alt={imageAlt}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        {/* Icon Overlay */}
        <div className="absolute bottom-4 left-4 flex items-center justify-center w-12 h-12 bg-primary rounded-xl">
          <Icon name={icon} size={24} color="white" />
        </div>
      </div>
      {/* Content */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="text-xl font-bold text-foreground mb-1">{title}</h3>
            <span className="text-sm text-primary font-medium">{category}</span>
          </div>
          <div className="text-right">
            <div className="text-lg font-bold text-foreground">KES {priceRange}</div>
            <div className="text-xs text-muted-foreground">Starting from</div>
          </div>
        </div>

        <p className="text-muted-foreground text-sm mb-4 line-clamp-3">{description}</p>

        {/* Features */}
        <div className="space-y-2 mb-6">
          {features?.slice(0, 3)?.map((feature, index) => (
            <div key={index} className="flex items-center space-x-2">
              <Icon name="Check" size={16} className="text-success flex-shrink-0" />
              <span className="text-sm text-foreground">{feature}</span>
            </div>
          ))}
          {features?.length > 3 && (
            <div className="text-xs text-muted-foreground">
              +{features?.length - 3} more features
            </div>
          )}
        </div>

        {/* Action Button */}
        <div className="flex space-x-3">
          {isAuthenticated ? (
            <Link to={`/dashboard/services?service=${encodeURIComponent(title)}`} className="flex-1">
              <Button variant="default" fullWidth iconName="Calendar" iconPosition="left">
                Book Now
              </Button>
            </Link>
          ) : (
            <Link to="/sign-up" className="flex-1">
              <Button variant="default" fullWidth iconName="UserPlus" iconPosition="left">
                Sign Up to Book
              </Button>
            </Link>
          )}
          <Link to={`/services?service=${id}`} className="inline-block">
            <Button variant="outline" size="icon">
              <Icon name="Info" size={18} />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;