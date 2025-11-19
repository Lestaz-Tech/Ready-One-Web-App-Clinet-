import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const ContactSection = () => {
  const contactMethods = [
    {
      icon: "Phone",
      title: "Call Us",
      primary: "+254 700 000 000",
      secondary: "+254 711 111 111",
      description: "Available 24/7 for urgent moves",
      action: "tel:+254700000000",
      actionText: "Call Now"
    },
    {
      icon: "MessageCircle",
      title: "WhatsApp",
      primary: "+254 700 000 000",
      secondary: "Quick responses guaranteed",
      description: "Chat with us instantly",
      action: "https://wa.me/254700000000",
      actionText: "Chat Now"
    },
    {
      icon: "Mail",
      title: "Email Us",
      primary: "info@readyonemovers.co.ke",
      secondary: "support@readyonemovers.co.ke",
      description: "Get detailed quotes via email",
      action: "mailto:info@readyonemovers.co.ke",
      actionText: "Send Email"
    },
    {
      icon: "MapPin",
      title: "Visit Our Office",
      primary: "Nairobi CBD, Kenya",
      secondary: "Moi Avenue, 2nd Floor",
      description: "Monday - Saturday: 8AM - 6PM",
      action: "/contact",
      actionText: "Get Directions"
    }
  ];

  const quickServices = [
    {
      icon: "Home",
      title: "House Moving",
      description: "Residential relocations",
      link: "/services"
    },
    {
      icon: "Building2",
      title: "Office Moving",
      description: "Commercial relocations",
      link: "/services"
    },
    {
      icon: "Package",
      title: "Packing Services",
      description: "Professional packing",
      link: "/services"
    },
    {
      icon: "Truck",
      title: "Long Distance",
      description: "Inter-county moves",
      link: "/services"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
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

  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Get In Touch
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Ready to move? Contact us today for a free quote and experience 
            Kenya's most reliable moving services.
          </p>
        </motion.div>

        {/* Contact Methods Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16"
        >
          {contactMethods?.map((method, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group bg-card rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-border hover:border-primary/20 text-center"
            >
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                <Icon 
                  name={method?.icon} 
                  size={28} 
                  className="text-primary group-hover:text-white transition-colors duration-300" 
                />
              </div>
              
              <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-200">
                {method?.title}
              </h3>
              
              <div className="mb-3">
                <div className="font-medium text-foreground">{method?.primary}</div>
                <div className="text-sm text-muted-foreground">{method?.secondary}</div>
              </div>
              
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                {method?.description}
              </p>

              {method?.action?.startsWith('http') || method?.action?.startsWith('tel:') || method?.action?.startsWith('mailto:') ? (
                <a 
                  href={method?.action}
                  target={method?.action?.startsWith('http') ? '_blank' : '_self'}
                  rel={method?.action?.startsWith('http') ? 'noopener noreferrer' : ''}
                  className="inline-block"
                >
                  <Button variant="outline" size="sm" className="w-full">
                    {method?.actionText}
                  </Button>
                </a>
              ) : (
                <Link to={method?.action}>
                  <Button variant="outline" size="sm" className="w-full">
                    {method?.actionText}
                  </Button>
                </Link>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Quick Services */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Quick Service Access
            </h3>
            <p className="text-muted-foreground text-lg">
              Jump straight to the service you need
            </p>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {quickServices?.map((service, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
              >
                <Link 
                  to={service?.link}
                  className="group block bg-card rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-border hover:border-primary/20 text-center"
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                    <Icon 
                      name={service?.icon} 
                      size={24} 
                      className="text-primary group-hover:text-white transition-colors duration-300" 
                    />
                  </div>
                  <h4 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors duration-200">
                    {service?.title}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {service?.description}
                  </p>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Emergency Contact */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="bg-gradient-to-r from-error/10 to-warning/10 rounded-2xl p-8 border border-error/20">
            <div className="text-center">
              <div className="w-16 h-16 bg-error/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Icon name="AlertCircle" size={28} className="text-error" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                Emergency Moving Services
              </h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Need urgent moving assistance? Our emergency team is available 24/7 
                for last-minute relocations and urgent moves.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="tel:+254700000000">
                  <Button 
                    variant="destructive" 
                    size="lg"
                    iconName="Phone"
                    iconPosition="left"
                    className="w-full sm:w-auto"
                  >
                    Emergency Hotline
                  </Button>
                </a>
                <a 
                  href="https://wa.me/254700000000?text=Emergency%20moving%20assistance%20needed"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button 
                    variant="outline" 
                    size="lg"
                    iconName="MessageCircle"
                    iconPosition="left"
                    className="w-full sm:w-auto border-error text-error hover:bg-error hover:text-white"
                  >
                    WhatsApp Emergency
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Final CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-primary to-orange-600 rounded-2xl p-8 md:p-12">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Ready to Get Started?
            </h3>
            <p className="text-white/90 mb-6 text-lg max-w-2xl mx-auto">
              Join hundreds of satisfied customers. Get your free moving quote today 
              and experience the Ready One Movers difference.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/services">
                <Button 
                  variant="secondary" 
                  size="lg"
                  iconName="Calculator"
                  iconPosition="left"
                  className="w-full sm:w-auto"
                >
                  Get Free Quote
                </Button>
              </Link>
              <Link to="/sign-up">
                <Button 
                  variant="outline" 
                  size="lg"
                  iconName="UserPlus"
                  iconPosition="left"
                  className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-primary"
                >
                  Create Account
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;