import React from 'react';
import { Helmet } from 'react-helmet';
import PublicNavigation from '../../components/ui/PublicNavigation';
import WhatsAppIntegration from '../../components/ui/WhatsAppIntegration';
import ContactInfo from './components/ContactInfo';
import ContactForm from './components/ContactForm';
import ServiceAreas from './components/ServiceAreas';
import LocationMap from './components/LocationMap';
import SocialMedia from './components/SocialMedia';

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Contact Us - Ready One Movers Kenya | Get Moving Quotes & Support</title>
        <meta 
          name="description" 
          content="Contact Ready One Movers Kenya for professional moving services. Get instant quotes, book consultations, and access 24/7 support. Serving Nairobi, Kiambu, Machakos & beyond." 
        />
        <meta name="keywords" content="contact ready one movers, moving company kenya, nairobi movers contact, moving quotes kenya, professional movers contact" />
      </Helmet>
      <PublicNavigation onLogout={() => {}} />
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/5 via-background to-accent/5 py-12 lg:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Get In Touch With
              <span className="text-primary"> Ready One Movers</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Ready to make your move? Contact Kenya's most trusted moving company for professional service, 
              competitive rates, and peace of mind. We're here to help 24/7.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+254700123456"
                className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary/90 transition-colors duration-200"
              >
                📞 Call Now: +254 700 123 456
              </a>
              <a
                href="https://wa.me/254700123456?text=Hi! I need information about Ready One Movers services."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 bg-success text-success-foreground font-semibold rounded-xl hover:bg-success/90 transition-colors duration-200"
              >
                💬 WhatsApp Chat
              </a>
            </div>
          </div>
        </div>
      </section>
      {/* Main Content */}
      <main className="py-12 lg:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Contact Information and Form */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <ContactInfo />
            <ContactForm />
          </div>

          {/* Location Map */}
          <div className="mb-12">
            <LocationMap />
          </div>

          {/* Service Areas and Social Media */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <ServiceAreas />
            <SocialMedia />
          </div>
        </div>
      </main>
      {/* Emergency Contact Banner */}
      <section className="bg-error/5 border-t border-error/20 py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-foreground mb-2">Emergency Moving Services</h2>
            <p className="text-muted-foreground mb-4">
              Need urgent moving assistance? Our emergency response team is available 24/7 for critical relocations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+254700123456"
                className="inline-flex items-center justify-center px-6 py-3 bg-error text-error-foreground font-semibold rounded-xl hover:bg-error/90 transition-colors duration-200"
              >
                🚨 Emergency Hotline: +254 700 123 456
              </a>
              <p className="text-sm text-muted-foreground self-center">
                Available 24/7 • Response within 30 minutes in Nairobi
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Footer */}
      <footer className="bg-secondary text-secondary-foreground py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
                <span className="text-primary-foreground font-bold text-lg">🚛</span>
              </div>
              <div>
                <h3 className="text-xl font-bold">Ready One Movers</h3>
                <p className="text-sm opacity-80">Kenya's Trusted Moving Partner</p>
              </div>
            </div>
            <p className="text-sm opacity-80 mb-4">
              Professional moving services across Kenya since 2018. Licensed, insured, and committed to excellence.
            </p>
            <p className="text-xs opacity-60">
              © {new Date()?.getFullYear()} Ready One Movers Kenya. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
      <WhatsAppIntegration />
    </div>
  );
};

export default ContactPage;