import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ServiceComparison = ({ isAuthenticated }) => {
  const [activePackage, setActivePackage] = useState('standard');

  const packages = [
    {
      id: 'basic',
      name: 'Basic Package',
      price: 'KES 5,000',
      period: 'Starting from',
      description: 'Essential moving services for small moves and budget-conscious customers.',
      features: [
        'Transportation only',
        'Basic loading/unloading',
        'Standard insurance',
        'Weekday service',
        'Local moves only'
      ],
      limitations: [
        'No packing materials',
        'No assembly service',
        'Limited to 2 movers'
      ],
      popular: false,
      color: 'border-border'
    },
    {
      id: 'standard',
      name: 'Standard Package',
      price: 'KES 15,000',
      period: 'Starting from',
      description: 'Most popular choice with comprehensive services for typical household moves.',
      features: [
        'Professional packing materials',
        'Furniture disassembly/assembly',
        'Comprehensive insurance',
        'Weekend availability',
        'Local & long-distance',
        '3-4 professional movers',
        'Basic unpacking service'
      ],
      limitations: [
        'Standard packing only',
        'No storage included'
      ],
      popular: true,
      color: 'border-primary ring-2 ring-primary/20'
    },
    {
      id: 'premium',
      name: 'Premium Package',
      price: 'KES 35,000',
      period: 'Starting from',
      description: 'Full-service moving experience with premium care and additional services.',
      features: [
        'Premium packing materials',
        'Complete pack/unpack service',
        'Premium insurance coverage',
        'Flexible scheduling',
        'Nationwide coverage',
        '4-6 professional movers',
        'Furniture placement service',
        '30-day storage included',
        'Post-move cleanup'
      ],
      limitations: [],
      popular: false,
      color: 'border-accent'
    }
  ];

  const comparisonFeatures = [
    { feature: 'Professional Movers', basic: '2', standard: '3-4', premium: '4-6' },
    { feature: 'Packing Materials', basic: '❌', standard: '✅', premium: '✅ Premium' },
    { feature: 'Furniture Assembly', basic: '❌', standard: '✅', premium: '✅ Full Service' },
    { feature: 'Insurance Coverage', basic: 'Basic', standard: 'Standard', premium: 'Premium' },
    { feature: 'Weekend Service', basic: '❌', standard: '✅', premium: '✅ Flexible' },
    { feature: 'Storage Included', basic: '❌', standard: '❌', premium: '30 Days' },
    { feature: 'Unpacking Service', basic: '❌', standard: 'Basic', premium: 'Complete' },
    { feature: 'Post-Move Cleanup', basic: '❌', standard: '❌', premium: '✅' }
  ];

  return (
    <section className="py-16 lg:py-24 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
              <Icon name="BarChart3" size={24} className="text-primary" />
            </div>
            <span className="text-primary font-medium">Service Packages</span>
          </div>
          
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
            Choose Your Perfect
            <span className="block text-primary">Moving Package</span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Compare our service packages to find the perfect fit for your moving needs and budget. 
            All packages include professional service and satisfaction guarantee.
          </p>
        </div>

        {/* Package Cards */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {packages?.map((pkg) => (
            <div
              key={pkg?.id}
              className={`relative bg-card rounded-2xl border ${pkg?.color} shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden ${
                pkg?.popular ? 'transform lg:scale-105' : ''
              }`}
            >
              {/* Popular Badge */}
              {pkg?.popular && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground px-6 py-2 rounded-b-lg text-sm font-medium">
                  Most Popular
                </div>
              )}

              <div className="p-8">
                {/* Package Header */}
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-foreground mb-2">{pkg?.name}</h3>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-primary">{pkg?.price}</span>
                    <span className="text-muted-foreground ml-2">{pkg?.period}</span>
                  </div>
                  <p className="text-muted-foreground">{pkg?.description}</p>
                </div>

                {/* Features */}
                <div className="space-y-4 mb-8">
                  {pkg?.features?.map((feature, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <Icon name="Check" size={16} className="text-success flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-foreground">{feature}</span>
                    </div>
                  ))}
                  
                  {pkg?.limitations?.length > 0 && (
                    <>
                      <div className="border-t border-border pt-4 mt-6">
                        <div className="text-sm font-medium text-muted-foreground mb-3">Limitations:</div>
                        {pkg?.limitations?.map((limitation, index) => (
                          <div key={index} className="flex items-start space-x-3 mb-2">
                            <Icon name="X" size={16} className="text-muted-foreground flex-shrink-0 mt-0.5" />
                            <span className="text-sm text-muted-foreground">{limitation}</span>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>

                {/* Action Button */}
                {isAuthenticated ? (
                  <Button 
                    variant={pkg?.popular ? "default" : "outline"} 
                    fullWidth 
                    iconName="Calendar" 
                    iconPosition="left"
                  >
                    Book {pkg?.name}
                  </Button>
                ) : (
                  <Button 
                    variant={pkg?.popular ? "default" : "outline"} 
                    fullWidth 
                    iconName="UserPlus" 
                    iconPosition="left"
                  >
                    Sign Up to Book
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Detailed Comparison Table */}
        <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
          <div className="p-6 border-b border-border">
            <h3 className="text-xl font-bold text-foreground mb-2">Detailed Feature Comparison</h3>
            <p className="text-muted-foreground">Compare all features across our service packages</p>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr>
                  <th className="text-left p-4 font-medium text-foreground">Feature</th>
                  <th className="text-center p-4 font-medium text-foreground">Basic</th>
                  <th className="text-center p-4 font-medium text-primary">Standard</th>
                  <th className="text-center p-4 font-medium text-foreground">Premium</th>
                </tr>
              </thead>
              <tbody>
                {comparisonFeatures?.map((item, index) => (
                  <tr key={index} className="border-t border-border hover:bg-muted/20 transition-colors">
                    <td className="p-4 font-medium text-foreground">{item?.feature}</td>
                    <td className="p-4 text-center text-muted-foreground">{item?.basic}</td>
                    <td className="p-4 text-center text-primary font-medium">{item?.standard}</td>
                    <td className="p-4 text-center text-foreground">{item?.premium}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <div className="bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Still Not Sure Which Package to Choose?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Our moving consultants are here to help you select the perfect package based on your specific needs, 
              timeline, and budget. Get personalized recommendations today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="default" size="lg" iconName="Phone" iconPosition="left">
                Speak to Consultant
              </Button>
              <Button variant="outline" size="lg" iconName="Calculator" iconPosition="left">
                Get Custom Quote
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceComparison;