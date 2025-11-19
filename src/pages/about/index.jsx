import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import PublicNavigation from '../../components/ui/PublicNavigation';
import WhatsAppIntegration from '../../components/ui/WhatsAppIntegration';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import { Link } from 'react-router-dom';

const AboutPage = () => {
  const stats = [
    { number: '10,000+', label: 'Happy Customers', icon: 'Users' },
    { number: '5+', label: 'Years Experience', icon: 'Award' },
    { number: '47', label: 'Counties Covered', icon: 'MapPin' },
    { number: '99%', label: 'Success Rate', icon: 'CheckCircle2' }
  ];

  const values = [
    {
      title: 'Reliability',
      description: 'We show up on time, every time. Your move is our priority.',
      icon: 'Clock'
    },
    {
      title: 'Professional',
      description: 'Our trained team handles your belongings with care and expertise.',
      icon: 'Briefcase'
    },
    {
      title: 'Transparent',
      description: 'No hidden fees. Clear pricing and honest communication always.',
      icon: 'Eye'
    },
    {
      title: 'Secure',
      description: 'Insured services and secure handling of all your items.',
      icon: 'Shield'
    }
  ];

  const team = [
    {
      name: 'John Kariuki',
      role: 'Founder & CEO',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&q=75',
      bio: 'Visionary leader with 15+ years in logistics and moving industry.'
    },
    {
      name: 'Sarah Mwangi',
      role: 'Operations Manager',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&q=75',
      bio: 'Expert in fleet management and customer satisfaction.'
    },
    {
      name: 'David Ochieng',
      role: 'Head of Customer Service',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&q=75',
      bio: 'Dedicated to ensuring every customer has an exceptional experience.'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>About Ready One Movers Kenya | Professional Moving Company</title>
        <meta 
          name="description" 
          content="Learn about Ready One Movers Kenya. Kenya's most trusted moving company with 10,000+ satisfied customers, covering all 47 counties with professional and reliable moving services." 
        />
        <meta name="keywords" content="about Ready One Movers, Kenya moving company, professional movers Kenya, moving services" />
      </Helmet>

      {/* Navigation */}
      <PublicNavigation onLogout={() => {}} />

      {/* Hero Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-r from-primary to-orange-600">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              About Ready One Movers
            </h1>
            <p className="text-xl text-white/90 leading-relaxed">
              Kenya's most trusted moving company, dedicated to providing professional, reliable, 
              and affordable moving services across all 47 counties.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Our Story
                </h2>
                <p className="text-muted-foreground leading-relaxed text-lg mb-4">
                  Ready One Movers was founded with a simple mission: to make moving in Kenya easy, 
                  affordable, and stress-free. What started as a small team with a single truck has 
                  grown into Kenya's most trusted moving company.
                </p>
                <p className="text-muted-foreground leading-relaxed text-lg mb-4">
                  Over the years, we've helped over 10,000 customers move safely across all 47 counties. 
                  From bedsitters to mansions, from office relocations to long-distance moves, we handle 
                  every project with the same level of care and professionalism.
                </p>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  Today, Ready One Movers is recognized as the gold standard in professional moving services 
                  in Kenya. We continue to grow and innovate to serve our customers better.
                </p>
              </div>
            </motion.div>

            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative">
              <div className="relative h-96 rounded-2xl overflow-hidden shadow-xl">
                <img
                  src="=https://res.cloudinary.com/dknnzeppw/image/upload/v1763554291/WhatsApp_Image_2025-11-19_at_3.10.24_PM_txhppj.jpg"
                  alt="Ready One Movers team working together"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 w-48 h-48 bg-primary/20 rounded-2xl -z-10"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 lg:py-24 bg-secondary">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="flex items-center justify-center w-16 h-16 bg-primary/20 rounded-full">
                    <Icon name={stat.icon} size={32} className="text-primary" />
                  </div>
                </div>
                <h3 className="text-4xl font-bold text-primary mb-2">{stat.number}</h3>
                <p className="text-secondary-foreground text-lg">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Our Core Values
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              These principles guide everything we do at Ready One Movers
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-card rounded-2xl p-8 border border-border shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="flex items-center justify-center w-12 h-12 bg-primary/20 rounded-full mb-4">
                  <Icon name={value.icon} size={24} className="text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">{value.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 lg:py-24 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Our Leadership Team
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Experienced professionals committed to your moving success
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-border">
                <div className="relative h-64 overflow-hidden bg-muted">
                  <img
                    src={member.image}
                    alt={member.name}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-foreground mb-1">{member.name}</h3>
                  <p className="text-primary font-semibold mb-3">{member.role}</p>
                  <p className="text-muted-foreground leading-relaxed">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative order-2 md:order-1">
              <div className="relative h-96 rounded-2xl overflow-hidden shadow-xl">
                <img
                  src="https://res.cloudinary.com/dknnzeppw/image/upload/v1763442413/house-movers-nairobi-3_bulo3h.jpg"
                  alt="Why choose Ready One Movers"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -top-6 -right-6 w-48 h-48 bg-primary/20 rounded-2xl -z-10"></div>
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6 order-1 md:order-2">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                Why Choose Ready One Movers?
              </h2>

              <div className="space-y-4">
                {[
                  'Professional and trained team members',
                  'Transparent pricing with no hidden fees',
                  'Insured services for complete peace of mind',
                  'Available 24/7 for your convenience',
                  'Serving all 47 counties in Kenya',
                  'Over 10,000 satisfied customers',
                  'Same-day and emergency moving available',
                  'Eco-friendly moving practices'
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <Icon name="Check" size={24} className="text-success flex-shrink-0 mt-1" />
                    <span className="text-lg text-muted-foreground">{item}</span>
                  </div>
                ))}
              </div>

              <Link to="/services">
                <Button size="lg" iconName="ArrowRight" iconPosition="right">
                  Explore Our Services
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-r from-primary to-orange-600">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              Ready for Your Next Move?
            </h2>
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              Get a free quote today and experience the Ready One Movers difference
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
                  Contact Us
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* WhatsApp Integration */}
      <WhatsAppIntegration 
        phoneNumber="+254700000000"
        defaultMessage="Hi! I'd like to know more about Ready One Movers and your services."
        position="bottom-right"
        showTooltip={true}
      />

      {/* Footer */}
      <footer className="bg-secondary text-secondary-foreground py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-lg">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"/>
                    <path d="M3 4a1 1 0 00-1 1v1a1 1 0 001 1h1l1.68 5.39a3 3 0 002.84 2.11h5.95a3 3 0 002.84-2.11L18.32 7H5a1 1 0 01-1-1V5a1 1 0 00-1-1H3z"/>
                  </svg>
                </div>
                <div>
                  <div className="text-lg font-bold">Ready One</div>
                  <div className="text-sm text-primary -mt-1">Movers</div>
                </div>
              </div>
              <p className="text-secondary-foreground/80 text-sm leading-relaxed">
                Kenya's most trusted moving company, providing professional relocation services across all 47 counties.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="/home" className="text-secondary-foreground/80 hover:text-primary transition-colors">Home</a></li>
                <li><a href="/about" className="text-secondary-foreground/80 hover:text-primary transition-colors">About</a></li>
                <li><a href="/services" className="text-secondary-foreground/80 hover:text-primary transition-colors">Services</a></li>
                <li><a href="/contact" className="text-secondary-foreground/80 hover:text-primary transition-colors">Contact</a></li>
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="font-semibold mb-4">Our Services</h4>
              <ul className="space-y-2 text-sm">
                <li><span className="text-secondary-foreground/80">House Moving</span></li>
                <li><span className="text-secondary-foreground/80">Office Relocation</span></li>
                <li><span className="text-secondary-foreground/80">Long Distance Moving</span></li>
                <li><span className="text-secondary-foreground/80">Packing Services</span></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="font-semibold mb-4">Contact Info</h4>
              <div className="space-y-2 text-sm text-secondary-foreground/80">
                <div>📞 +254 700 000 000</div>
                <div>📧 info@readyonemovers.co.ke</div>
                <div>📍 Nairobi CBD, Kenya</div>
                <div>🕒 24/7 Support Available</div>
              </div>
            </div>
          </div>

          <div className="border-t border-secondary-foreground/20 mt-8 pt-8 text-center">
            <p className="text-sm text-secondary-foreground/60">
              &copy; {new Date()?.getFullYear()} Ready One Movers. All rights reserved. | Licensed Moving Company in Kenya
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AboutPage;
