import React from 'react';
import ServiceCard from './ServiceCard';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';



const ServiceCategories = ({ isAuthenticated }) => {
  const serviceCategories = [
  {
    id: 1,
    title: "House Moving",
    category: "Residential",
    description: "Complete household relocation services for all types of Kenyan homes including bedsitters, apartments, bungalows, and mansions. We handle everything from packing to unpacking with professional care.",
    features: [
    "Bedsitter to 5-bedroom homes",
    "Professional packing materials",
    "Furniture disassembly & assembly",
    "Fragile items protection",
    "Same-day service available",
    "Insurance coverage included"],

    priceRange: "5,000 - 50,000",
    image: "https://res.cloudinary.com/dknnzeppw/image/upload/v1763447982/ready-one-movers-kenya-55_fd17mi.jpg",
    imageAlt: "Professional movers carefully packing household items and furniture in cardboard boxes",
    icon: "Home",
    popular: true
  },
  {
    id: 2,
    title: "Office Moving",
    category: "Commercial",
    description: "Specialized business relocation services for offices, shops, and commercial spaces. Minimize downtime with our efficient corporate moving solutions designed for Kenyan businesses.",
    features: [
    "IT equipment handling",
    "Document secure transport",
    "Weekend & after-hours moves",
    "Office furniture setup",
    "Minimal business disruption",
    "Professional team coordination"],

    priceRange: "15,000 - 100,000",
    image: "https://images.unsplash.com/photo-1706689656095-168768dc20a5",
    imageAlt: "Modern office space with computers, desks and filing cabinets being prepared for relocation",
    icon: "Building2",
    popular: false
  },
  {
    id: 3,
    title: "Long Distance Moving",
    category: "Interstate",
    description: "Reliable long-distance moving services across Kenya. From Nairobi to Mombasa, Kisumu to Eldoret - we ensure your belongings reach safely anywhere in the country.",
    features: [
    "All 47 counties coverage",
    "GPS tracking available",
    "Secure transportation",
    "Flexible delivery dates",
    "Storage options available",
    "Real-time updates"],

    priceRange: "20,000 - 150,000",
    image: "https://images.unsplash.com/photo-1644316554029-7ea9b57113a5",
    imageAlt: "Large moving truck on Kenyan highway carrying household goods for long distance relocation",
    icon: "MapPin",
    popular: false
  },
  {
    id: 4,
    title: "Packing Services",
    category: "Add-on",
    description: "Professional packing and unpacking services using high-quality materials. Perfect for fragile items, artwork, electronics, and valuable possessions requiring special care.",
    features: [
    "Premium packing materials",
    "Fragile items specialty",
    "Custom crating available",
    "Unpacking services",
    "Inventory documentation",
    "Damage protection guarantee"],

    priceRange: "2,000 - 25,000",
    image: "https://res.cloudinary.com/dknnzeppw/image/upload/v1763442446/House-move_udiqzo.webp",
    imageAlt: "Professional packer carefully wrapping delicate items in protective bubble wrap and packing materials",
    icon: "Package",
    popular: false
  },
  {
    id: 5,
    title: "Furniture Moving",
    category: "Specialized",
    description: "Specialized furniture transportation for single items or complete sets. Perfect for new purchases, gifts, or when you need specific furniture pieces moved safely.",
    features: [
    "Single item transport",
    "Furniture assembly service",
    "Protective wrapping",
    "Same-day delivery",
    "Stair navigation expertise",
    "Damage-free guarantee"],

    priceRange: "1,500 - 15,000",
    image: "https://res.cloudinary.com/dknnzeppw/image/upload/v1763448303/ready-one-movers-kenya-38_lxwrje.jpg",
    imageAlt: "Movers carefully carrying large sofa and furniture pieces with protective blankets",
    icon: "Sofa",
    popular: false
  },
  {
    id: 6,
    title: "Storage Solutions",
    category: "Additional",
    description: "Secure storage facilities for short-term or long-term needs. Climate-controlled units available for sensitive items with 24/7 security monitoring.",
    features: [
    "Climate-controlled units",
    "24/7 security monitoring",
    "Flexible rental terms",
    "Easy access scheduling",
    "Insurance options",
    "Inventory management"],

    priceRange: "3,000 - 20,000",
    image: "https://www.dematic.com/content/dam/dematic/images/products/storage/autostore/maximize-warehouse-storage-space/3_agv_Dillewijn_FTS_goode_out-2-1.jpg",
    imageAlt: "Clean organized storage facility with secure units and proper lighting for household items",
    icon: "Warehouse",
    popular: false
  }];


  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
              <Icon name="Grid3x3" size={24} className="text-primary" />
            </div>
            <span className="text-primary font-medium">Our Services</span>
          </div>
          
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
            Complete Moving Solutions
            <span className="block text-primary">For Every Need</span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Whether you're moving a bedsitter in Nairobi or relocating your entire office to Mombasa, 
            we have the expertise and equipment to handle your move professionally.
          </p>
        </div>

        {/* Service Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {serviceCategories?.map((service) =>
          <ServiceCard
            key={service?.id}
            service={service}
            isAuthenticated={isAuthenticated} />

          )}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 rounded-2xl p-8 lg:p-12">
            <h3 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">
              Need a Custom Moving Solution?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Every move is unique. Contact our experts for a personalized quote and moving plan 
              tailored to your specific requirements and budget.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="default" size="lg" iconName="Phone" iconPosition="left">
                Get Free Quote
              </Button>
              <Button variant="outline" size="lg" iconName="MessageCircle" iconPosition="left">
                Chat with Expert
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>);

};

export default ServiceCategories;