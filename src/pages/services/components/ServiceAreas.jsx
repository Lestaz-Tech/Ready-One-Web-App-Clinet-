import React from 'react';
import Icon from '../../../components/AppIcon';


const ServiceAreas = () => {
  const majorRoutes = [
    {
      id: 1,
      from: "Nairobi",
      to: "Mombasa",
      distance: "480 km",
      duration: "6-8 hours",
      price: "KES 25,000+",
      popular: true
    },
    {
      id: 2,
      from: "Nairobi",
      to: "Kisumu",
      distance: "350 km",
      duration: "5-6 hours",
      price: "KES 20,000+",
      popular: true
    },
    {
      id: 3,
      from: "Nairobi",
      to: "Eldoret",
      distance: "310 km",
      duration: "4-5 hours",
      price: "KES 18,000+",
      popular: false
    },
    {
      id: 4,
      from: "Mombasa",
      to: "Malindi",
      distance: "120 km",
      duration: "2-3 hours",
      price: "KES 12,000+",
      popular: false
    }
  ];

  const counties = [
    "Nairobi", "Mombasa", "Kisumu", "Nakuru", "Eldoret", "Thika", "Malindi", "Kitale",
    "Garissa", "Kakamega", "Machakos", "Meru", "Nyeri", "Kericho", "Embu", "Migori",
    "Bungoma", "Homa Bay", "Kilifi", "Kwale", "Lamu", "Mandera", "Marsabit", "Moyale",
    "Naivasha", "Nanyuki", "Nyahururu", "Voi", "Wajir", "Webuye", "Busia", "Isiolo"
  ];

  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
              <Icon name="Map" size={24} className="text-primary" />
            </div>
            <span className="text-primary font-medium">Service Coverage</span>
          </div>
          
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
            We Cover All
            <span className="block text-primary">47 Counties in Kenya</span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From the bustling streets of Nairobi to the coastal beauty of Mombasa, 
            we provide reliable moving services across every county in Kenya.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Map Section */}
          <div className="relative">
            <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
              <div className="p-6 border-b border-border">
                <h3 className="text-xl font-bold text-foreground mb-2">Interactive Coverage Map</h3>
                <p className="text-muted-foreground">Click on any region to see detailed service information</p>
              </div>
              
              {/* Google Maps Embed */}
              <div className="relative h-96">
                <iframe
                  width="100%"
                  height="100%"
                  loading="lazy"
                  title="Ready One Movers Service Areas in Kenya"
                  referrerPolicy="no-referrer-when-downgrade"
                  src="https://www.google.com/maps?q=-1.2921,36.8219&z=6&output=embed"
                  className="border-0"
                />
                
                {/* Overlay with service points */}
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-full border-4 border-white shadow-lg animate-pulse">
                      <Icon name="MapPin" size={16} color="white" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Coverage Stats */}
            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="bg-card rounded-xl border border-border p-6 text-center">
                <div className="text-3xl font-bold text-primary mb-2">47</div>
                <div className="text-sm text-muted-foreground">Counties Covered</div>
              </div>
              <div className="bg-card rounded-xl border border-border p-6 text-center">
                <div className="text-3xl font-bold text-primary mb-2">200+</div>
                <div className="text-sm text-muted-foreground">Towns & Cities</div>
              </div>
            </div>
          </div>

          {/* Routes & Areas */}
          <div className="space-y-8">
            {/* Popular Routes */}
            <div className="bg-card rounded-2xl border border-border shadow-sm p-6">
              <div className="flex items-center space-x-2 mb-6">
                <Icon name="Route" size={24} className="text-primary" />
                <h3 className="text-xl font-bold text-foreground">Popular Moving Routes</h3>
              </div>
              
              <div className="space-y-4">
                {majorRoutes?.map((route) => (
                  <div key={route?.id} className="flex items-center justify-between p-4 bg-muted/30 rounded-xl hover:bg-muted/50 transition-colors">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-primary rounded-full"></div>
                        <span className="font-medium text-foreground">{route?.from}</span>
                        <Icon name="ArrowRight" size={16} className="text-muted-foreground" />
                        <span className="font-medium text-foreground">{route?.to}</span>
                        <div className="w-3 h-3 bg-accent rounded-full"></div>
                      </div>
                      {route?.popular && (
                        <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full font-medium">
                          Popular
                        </span>
                      )}
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-foreground">{route?.price}</div>
                      <div className="text-xs text-muted-foreground">{route?.distance} • {route?.duration}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* All Counties */}
            <div className="bg-card rounded-2xl border border-border shadow-sm p-6">
              <div className="flex items-center space-x-2 mb-6">
                <Icon name="MapPin" size={24} className="text-primary" />
                <h3 className="text-xl font-bold text-foreground">Service Areas</h3>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {counties?.map((county, index) => (
                  <div key={index} className="flex items-center space-x-2 p-3 bg-muted/20 rounded-lg hover:bg-muted/40 transition-colors cursor-pointer">
                    <Icon name="Check" size={14} className="text-success flex-shrink-0" />
                    <span className="text-sm text-foreground">{county}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 p-4 bg-primary/5 rounded-xl">
                <div className="flex items-start space-x-3">
                  <Icon name="Info" size={20} className="text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-medium text-foreground mb-1">Complete Coverage Guarantee</div>
                    <div className="text-sm text-muted-foreground">
                      Don't see your location? We provide services to remote areas too. 
                      Contact us for availability and custom pricing for your specific location.
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Special Services */}
            <div className="bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-foreground mb-4">Special Route Services</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Icon name="Plane" size={18} className="text-primary" />
                  <span className="text-foreground">Airport pickup & delivery services</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Icon name="Ship" size={18} className="text-primary" />
                  <span className="text-foreground">Port of Mombasa cargo handling</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Icon name="Mountain" size={18} className="text-primary" />
                  <span className="text-foreground">Remote & highland area access</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Icon name="Building2" size={18} className="text-primary" />
                  <span className="text-foreground">Industrial zone relocations</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceAreas;