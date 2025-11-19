import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const ServiceHero = () => {
  return (
    <section className="relative bg-gradient-to-br from-primary via-primary/90 to-secondary overflow-hidden">
      <div className="absolute inset-0 bg-black/20" />
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-20 h-20 border-2 border-white rounded-full" />
        <div className="absolute top-32 right-20 w-16 h-16 border-2 border-white rounded-xl rotate-45" />
        <div className="absolute bottom-20 left-1/4 w-12 h-12 border-2 border-white rounded-full" />
        <div className="absolute bottom-32 right-1/3 w-8 h-8 bg-white rounded-full" />
      </div>
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start space-x-2 mb-4">
              <div className="flex items-center justify-center w-10 h-10 bg-white/20 rounded-lg backdrop-blur-sm">
                <Icon name="Truck" size={24} color="white" />
              </div>
              <span className="text-white/90 font-medium">Professional Moving Services</span>
            </div>
            
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-6 leading-tight">
              Complete Moving
              <span className="block text-accent"> Solutions in Kenya</span>
            </h1>
            
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto lg:mx-0">
              From bedsitters to mansions, offices to warehouses - we handle every type of move with professional care and efficiency across Kenya.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">500+</div>
                <div className="text-white/80 text-sm">Happy Clients</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">47</div>
                <div className="text-white/80 text-sm">Counties Covered</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">24/7</div>
                <div className="text-white/80 text-sm">Support</div>
              </div>
            </div>

            {/* Service Highlights */}
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                <Icon name="Shield" size={16} color="white" />
                <span className="text-white text-sm font-medium">Insured & Licensed</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                <Icon name="Clock" size={16} color="white" />
                <span className="text-white text-sm font-medium">Same Day Service</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                <Icon name="Star" size={16} color="white" />
                <span className="text-white text-sm font-medium">5-Star Rated</span>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="relative z-10">
              <Image
                src="https://res.cloudinary.com/dknnzeppw/image/upload/v1763442303/house-movers-nairobi-6_kyyrdr.jpg"
                alt="Professional movers loading furniture into moving truck with care and efficiency"
                className="w-full h-96 lg:h-[500px] object-cover rounded-2xl shadow-2xl" />

              
              {/* Floating Card */}
              <div className="absolute -bottom-6 -left-6 bg-card rounded-2xl p-6 shadow-xl border border-border max-w-xs">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="flex items-center justify-center w-12 h-12 bg-success/10 rounded-xl">
                    <Icon name="CheckCircle" size={24} className="text-success" />
                  </div>
                  <div>
                    <div className="font-bold text-foreground">Move Completed</div>
                    <div className="text-sm text-muted-foreground">2 hours ago</div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  "Excellent service! The team was professional and handled everything with care."
                </p>
                <div className="flex items-center mt-3">
                  <div className="flex text-warning">
                    {[...Array(5)]?.map((_, i) =>
                    <Icon key={i} name="Star" size={14} className="fill-current" />
                    )}
                  </div>
                  <span className="text-sm text-muted-foreground ml-2">- Sarah M.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>);

};

export default ServiceHero;