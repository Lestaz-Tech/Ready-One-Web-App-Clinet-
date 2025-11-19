import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/Appimage';

const ServicesSection = () => {
  const [imageLoaded, setImageLoaded] = useState({});

  const services = [
  {
    id: 1,
    title: "House Moving",
    description: "Complete residential moving services from bedsitters to 5-bedroom houses and mansions.",
    icon: "Home",
    image: "https://res.cloudinary.com/dknnzeppw/image/upload/v1763447982/ready-one-movers-kenya-55_fd17mi.jpg",
    imageAlt: "Professional movers carefully packing household items into boxes in a bright living room",
    features: ["Packing & Unpacking", "Furniture Assembly", "Fragile Item Care", "Same Day Service"],
    price: "From KES 5,000"
  },
  {
    id: 2,
    title: "Office Moving",
    description: "Professional business relocation services with minimal downtime and secure handling.",
    icon: "Building2",
    image: "https://res.cloudinary.com/dknnzeppw/image/upload/v1763448741/photo-1706689656095-168768dc20a5_iic430.jpg",
    imageAlt: "Business professionals and movers organizing office equipment and computers for relocation",
    features: ["IT Equipment Care", "Document Security", "Weekend Moving", "Setup Assistance"],
    price: "From KES 15,000"
  },
  {
    id: 3,
    title: "Long Distance Moving",
    description: "Reliable inter-county and cross-country moving services across all 47 counties.",
    icon: "MapPin",
    image: "https://images.unsplash.com/photo-1682924754765-75832404fd1d?w=500&h=400&fit=crop&q=75",
    imageAlt: "Large moving truck loaded with household goods on a Kenyan highway with scenic landscape",
    features: ["GPS Tracking", "Insurance Coverage", "Storage Options", "Delivery Guarantee"],
    price: "From KES 25,000"
  },
  {
    id: 4,
    title: "Furniture Moving",
    description: "Specialized furniture transportation with expert handling and assembly services.",
    icon: "Sofa",
    image: "https://res.cloudinary.com/dknnzeppw/image/upload/v1763448303/ready-one-movers-kenya-38_lxwrje.jpg",
    imageAlt: "Skilled movers using proper equipment to transport a large wooden dining table safely",
    features: ["Disassembly/Assembly", "Protective Wrapping", "Heavy Item Specialists", "Custom Crating"],
    price: "From KES 3,000"
  }];


  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  const handleImageLoad = (id) => {
    setImageLoaded(prev => ({ ...prev, [id]: true }));
  };

  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16">

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Our Moving Services
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Professional moving solutions tailored to your needs. From residential to commercial moves, 
            we provide comprehensive services across Kenya.
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "0px 0px -100px 0px" }}
          className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 mb-12">

          {services?.map((service) =>
          <motion.div
            key={service?.id}
            variants={itemVariants}
            className="group bg-card rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-border">

              {/* Service Image */}
              <div className="relative h-48 overflow-hidden bg-muted">
                <img
                  src={service?.image}
                  alt={service?.imageAlt}
                  loading="lazy"
                  decoding="async"
                  onLoad={() => handleImageLoad(service?.id)}
                  className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ${
                    imageLoaded[service?.id] ? 'opacity-100' : 'opacity-0'
                  }`}
                />
                {!imageLoaded[service?.id] && (
                  <div className="absolute inset-0 bg-gradient-to-r from-muted to-muted-foreground/20 animate-pulse" />
                )}

                <div className="absolute top-4 left-4 bg-primary text-primary-foreground rounded-full p-3 shadow-lg">
                  <Icon name={service?.icon} size={24} />
                </div>
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-foreground rounded-lg px-3 py-1 text-sm font-semibold shadow-md">
                  {service?.price}
                </div>
              </div>

              {/* Service Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-200">
                  {service?.title}
                </h3>
                <p className="text-muted-foreground mb-4 leading-relaxed text-sm">
                  {service?.description}
                </p>

                {/* Features */}
                <div className="grid grid-cols-2 gap-2 mb-6">
                  {service?.features?.map((feature, index) =>
                <div key={index} className="flex items-center gap-2">
                      <Icon name="Check" size={16} className="text-success flex-shrink-0" />
                      <span className="text-xs md:text-sm text-muted-foreground">{feature}</span>
                    </div>
                )}
                </div>

                {/* Action Button */}
                <Link to="/services">
                  <Button
                  variant="outline"
                  className="w-full group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all duration-200"
                  iconName="ArrowRight"
                  iconPosition="right">

                    Learn More
                  </Button>
                </Link>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -100px 0px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center">

          <div className="bg-gradient-to-r from-primary to-orange-600 rounded-2xl p-8 md:p-12">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Ready to Move? Get Your Free Quote Today!
            </h3>
            <p className="text-white/90 mb-6 text-lg">
              Professional moving services with transparent pricing and no hidden fees.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/services">
                <Button
                  variant="secondary"
                  size="lg"
                  iconName="Calculator"
                  iconPosition="left"
                  className="w-full sm:w-auto">

                  Get Free Quote
                </Button>
              </Link>
              <Link to="/contact">
                <Button
                  variant="outline"
                  size="lg"
                  iconName="Phone"
                  iconPosition="left"
                  className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-primary">

                  Call Us Now
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>);

};

export default ServicesSection;