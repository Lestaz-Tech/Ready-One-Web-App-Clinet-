import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const RegistrationBenefits = () => {
  const benefits = [
  {
    id: 1,
    icon: "Calendar",
    title: "Easy Booking",
    description: "Schedule your moves with just a few clicks. Choose dates, services, and get instant quotes."
  },
  {
    id: 2,
    icon: "MapPin",
    title: "Track Your Move",
    description: "Real-time updates on your moving team\'s location and estimated arrival times."
  },
  {
    id: 3,
    icon: "CreditCard",
    title: "Flexible Payments",
    description: "Pay with Mpesa, card, or cash. Choose to pay before or after service completion."
  },
  {
    id: 4,
    icon: "Headphones",
    title: "24/7 Support",
    description: "Get help anytime through WhatsApp, phone, or our support ticket system."
  },
  {
    id: 5,
    icon: "Star",
    title: "Quality Guarantee",
    description: "Professional movers, insured services, and satisfaction guarantee on every move."
  },
  {
    id: 6,
    icon: "Clock",
    title: "Time Savings",
    description: "No more phone calls. Manage all your moving needs from your dashboard."
  }];


  const testimonials = [
  {
    id: 1,
    name: "Sarah Wanjiku",
    location: "Nairobi",
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1f6ec5602-1762273613310.png",
    imageAlt: "Professional headshot of African woman with short black hair wearing white blouse",
    rating: 5,
    comment: "Ready One Movers made my office relocation seamless. The online booking was so convenient!"
  },
  {
    id: 2,
    name: "James Kiprotich",
    location: "Mombasa",
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1389e373a-1762273824994.png",
    imageAlt: "Professional headshot of African man with beard wearing navy blue shirt",
    rating: 5,
    comment: "Excellent service from booking to completion. The team was professional and careful with my furniture."
  }];


  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl p-8 text-center">
        <div className="flex items-center justify-center w-20 h-20 bg-primary rounded-2xl mx-auto mb-6">
          <Icon name="Truck" size={40} color="white" />
        </div>
        <h2 className="text-3xl font-bold text-foreground mb-4">
          Join Kenya's #1 Moving Platform
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Over 10,000 successful moves completed. Experience the convenience of digital moving services with Ready One Movers Kenya.
        </p>
      </div>
      {/* Benefits Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {benefits?.map((benefit) =>
        <div key={benefit?.id} className="bg-card rounded-xl p-6 border border-border hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-xl mb-4">
              <Icon name={benefit?.icon} size={24} className="text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">{benefit?.title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">{benefit?.description}</p>
          </div>
        )}
      </div>
      
      {/* Trust Indicators */}
      <div className="bg-gradient-to-r from-secondary/5 to-primary/5 rounded-2xl p-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-3xl font-bold text-primary mb-2">10,000+</div>
            <p className="text-muted-foreground">Successful Moves</p>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary mb-2">4.9/5</div>
            <p className="text-muted-foreground">Customer Rating</p>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary mb-2">24/7</div>
            <p className="text-muted-foreground">Support Available</p>
          </div>
        </div>
      </div>
    </div>);

};

export default RegistrationBenefits;