import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const LocationMap = () => {
  const [selectedLocation, setSelectedLocation] = useState(0);

  const officeLocations = [
    {
      id: 1,
      name: "Main Office - Westlands",
      address: "Westlands Business Center, Waiyaki Way",
      city: "Nairobi, Kenya",
      phone: "+254 700 123 456",
      email: "westlands@readyonemovers.co.ke",
      hours: "Mon-Sat: 8AM-6PM",
      lat: -1.2676,
      lng: 36.8108,
      isMain: true
    },
    {
      id: 2,
      name: "Branch Office - Karen",
      address: "Karen Shopping Center, Langata Road",
      city: "Nairobi, Kenya",
      phone: "+254 722 987 654",
      email: "karen@readyonemovers.co.ke",
      hours: "Mon-Fri: 9AM-5PM",
      lat: -1.3197,
      lng: 36.6859,
      isMain: false
    },
    {
      id: 3,
      name: "Warehouse - Industrial Area",
      address: "Enterprise Road, Industrial Area",
      city: "Nairobi, Kenya",
      phone: "+254 733 456 789",
      email: "warehouse@readyonemovers.co.ke",
      hours: "Mon-Sat: 7AM-7PM",
      lat: -1.3032,
      lng: 36.8856,
      isMain: false
    }
  ];

  const currentLocation = officeLocations?.[selectedLocation];

  const handleGetDirections = () => {
    const query = encodeURIComponent(`${currentLocation?.address}, ${currentLocation?.city}`);
    window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank');
  };

  const handleCallOffice = () => {
    window.open(`tel:${currentLocation?.phone}`, '_self');
  };

  return (
    <div className="bg-card rounded-2xl p-6 lg:p-8 border border-border shadow-sm">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-2">Our Locations</h2>
        <p className="text-muted-foreground">
          Visit us at any of our convenient locations across Nairobi for in-person consultations.
        </p>
      </div>
      {/* Location Selector */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-2">
          {officeLocations?.map((location, index) => (
            <button
              key={location?.id}
              onClick={() => setSelectedLocation(index)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                selectedLocation === index
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground'
              }`}
            >
              {location?.isMain && (
                <Icon name="Star" size={14} className="inline mr-1" />
              )}
              {location?.name?.split(' - ')?.[1]}
            </button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Map Container */}
        <div className="order-2 lg:order-1">
          <div className="relative w-full h-80 bg-muted rounded-xl overflow-hidden">
            <iframe
              width="100%"
              height="100%"
              loading="lazy"
              title={currentLocation?.name}
              referrerPolicy="no-referrer-when-downgrade"
              src={`https://www.google.com/maps?q=${currentLocation?.lat},${currentLocation?.lng}&z=15&output=embed`}
              className="border-0"
            />
            
            {/* Map Overlay Controls */}
            <div className="absolute top-4 right-4 space-y-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={handleGetDirections}
                iconName="Navigation"
                iconPosition="left"
                className="shadow-lg"
              >
                Directions
              </Button>
            </div>
          </div>
        </div>

        {/* Location Details */}
        <div className="order-1 lg:order-2">
          <div className="space-y-6">
            {/* Main Info */}
            <div>
              <div className="flex items-center mb-2">
                <h3 className="text-xl font-bold text-foreground">{currentLocation?.name}</h3>
                {currentLocation?.isMain && (
                  <span className="ml-2 px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
                    Main Office
                  </span>
                )}
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex items-start space-x-3">
                  <Icon name="MapPin" size={16} className="text-primary mt-0.5" />
                  <div>
                    <p className="text-foreground font-medium">{currentLocation?.address}</p>
                    <p className="text-muted-foreground">{currentLocation?.city}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Icon name="Phone" size={16} className="text-primary" />
                <div>
                  <p className="text-sm font-medium text-foreground">{currentLocation?.phone}</p>
                  <button
                    onClick={handleCallOffice}
                    className="text-xs text-primary hover:text-primary/80 transition-colors duration-200"
                  >
                    Tap to call
                  </button>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Icon name="Mail" size={16} className="text-primary" />
                <div>
                  <p className="text-sm font-medium text-foreground">{currentLocation?.email}</p>
                  <a
                    href={`mailto:${currentLocation?.email}`}
                    className="text-xs text-primary hover:text-primary/80 transition-colors duration-200"
                  >
                    Send email
                  </a>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Icon name="Clock" size={16} className="text-primary" />
                <p className="text-sm font-medium text-foreground">{currentLocation?.hours}</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button
                variant="default"
                fullWidth
                onClick={handleGetDirections}
                iconName="Navigation"
                iconPosition="left"
              >
                Get Directions
              </Button>
              
              <Button
                variant="outline"
                fullWidth
                onClick={handleCallOffice}
                iconName="Phone"
                iconPosition="left"
              >
                Call This Office
              </Button>
            </div>

            {/* Additional Info */}
            <div className="p-4 bg-muted/50 rounded-xl">
              <div className="flex items-start space-x-3">
                <Icon name="Info" size={16} className="text-primary mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-foreground mb-1">Visit Us</h4>
                  <p className="text-xs text-muted-foreground">
                    No appointment necessary during business hours. Free consultations and quotes available on-site.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationMap;