import React from 'react';
import Icon from '../../../components/AppIcon';

const ServiceAreas = () => {
  const serviceAreas = [
    {
      id: 1,
      region: "Nairobi County",
      areas: [
        "Westlands", "Karen", "Kilimani", "Lavington", "Kileleshwa",
        "Parklands", "Eastleigh", "South B", "South C", "Langata"
      ],
      coverage: "Full Coverage",
      responseTime: "30-60 minutes"
    },
    {
      id: 2,
      region: "Kiambu County",
      areas: [
        "Thika", "Ruiru", "Kikuyu", "Limuru", "Kiambu Town",
        "Githunguri", "Lari", "Gatundu", "Juja", "Kabete"
      ],
      coverage: "Full Coverage",
      responseTime: "45-90 minutes"
    },
    {
      id: 3,
      region: "Machakos County",
      areas: [
        "Machakos Town", "Athi River", "Mavoko", "Kangundo", "Matungulu",
        "Kathiani", "Masinga", "Yatta", "Mwala", "Kalama"
      ],
      coverage: "Full Coverage",
      responseTime: "60-120 minutes"
    },
    {
      id: 4,
      region: "Kajiado County",
      areas: [
        "Ngong", "Ongata Rongai", "Kitengela", "Kajiado Town", "Magadi",
        "Namanga", "Bissil", "Loitokitok", "Kimana", "Mashuru"
      ],
      coverage: "Full Coverage",
      responseTime: "60-120 minutes"
    }
  ];

  const longDistanceRoutes = [
    { from: "Nairobi", to: "Mombasa", duration: "8-10 hours" },
    { from: "Nairobi", to: "Kisumu", duration: "5-6 hours" },
    { from: "Nairobi", to: "Nakuru", duration: "2-3 hours" },
    { from: "Nairobi", to: "Eldoret", duration: "4-5 hours" },
    { from: "Nairobi", to: "Nyeri", duration: "2-3 hours" },
    { from: "Nairobi", to: "Meru", duration: "3-4 hours" }
  ];

  return (
    <div className="bg-card rounded-2xl p-6 lg:p-8 border border-border shadow-sm">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-2">Service Coverage Areas</h2>
        <p className="text-muted-foreground">
          We provide comprehensive moving services across Kenya with guaranteed response times.
        </p>
      </div>
      {/* Local Service Areas */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
          <Icon name="MapPin" size={20} className="mr-2 text-primary" />
          Local Service Areas
        </h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {serviceAreas?.map((area) => (
            <div key={area?.id} className="p-4 border border-border rounded-xl hover:border-primary/20 transition-colors duration-200">
              <div className="flex items-start justify-between mb-3">
                <h4 className="text-lg font-semibold text-foreground">{area?.region}</h4>
                <span className="px-2 py-1 bg-success/10 text-success text-xs font-medium rounded-full">
                  {area?.coverage}
                </span>
              </div>
              
              <div className="mb-3">
                <div className="flex flex-wrap gap-1">
                  {area?.areas?.map((location, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-md"
                    >
                      {location}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center text-sm text-muted-foreground">
                <Icon name="Clock" size={16} className="mr-2" />
                Response Time: <span className="ml-1 font-medium text-foreground">{area?.responseTime}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Long Distance Routes */}
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
          <Icon name="Truck" size={20} className="mr-2 text-primary" />
          Long Distance Moving Routes
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {longDistanceRoutes?.map((route, index) => (
            <div key={index} className="p-4 border border-border rounded-xl hover:border-primary/20 transition-colors duration-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-foreground">{route?.from}</span>
                <Icon name="ArrowRight" size={16} className="text-muted-foreground" />
                <span className="text-sm font-medium text-foreground">{route?.to}</span>
              </div>
              <div className="flex items-center text-xs text-muted-foreground">
                <Icon name="Clock" size={14} className="mr-1" />
                {route?.duration}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Coverage Note */}
      <div className="mt-6 p-4 bg-primary/5 border border-primary/20 rounded-xl">
        <div className="flex items-start space-x-3">
          <Icon name="Info" size={20} className="text-primary mt-0.5" />
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-1">Extended Coverage Available</h4>
            <p className="text-xs text-muted-foreground">
              Don't see your area listed? We also provide services to remote locations across Kenya. 
              Contact us for a custom quote and availability in your specific location.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceAreas;