import React from 'react';
import { Helmet } from 'react-helmet';
import PublicNavigation from '../../components/ui/PublicNavigation';
import WhatsAppIntegration from '../../components/ui/WhatsAppIntegration';
import ServiceHero from './components/ServiceHero';
import ServiceCategories from './components/ServiceCategories';
import ServiceComparison from './components/ServiceComparison';
import ServiceAreas from './components/ServiceAreas';

const ServicesPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Our Services - Ready One Movers Kenya | Professional Moving Solutions</title>
        <meta 
          name="description" 
          content="Explore Ready One Movers' comprehensive moving services. House moving, office relocation, long-distance moving, and specialized furniture transportation across Kenya." 
        />
        <meta name="keywords" content="moving services Kenya, house moving, office relocation, long distance moving, furniture moving, professional movers" />
      </Helmet>

      {/* Navigation */}
      <PublicNavigation onLogout={() => {}} />

      {/* Main Content */}
      <main className="relative">
        {/* Hero Section */}
        <ServiceHero />

        {/* Service Categories */}
        <ServiceCategories />

        {/* Service Comparison */}
        <ServiceComparison />

        {/* Service Areas */}
        <ServiceAreas />
      </main>

      {/* WhatsApp Integration */}
      <WhatsAppIntegration 
        phoneNumber="+254700000000"
        defaultMessage="Hi! I'm interested in Ready One Movers services. Can you help me with a quote?"
        position="bottom-right"
        showTooltip={true}
      />

      {/* Footer */}
      <footer className="bg-secondary text-secondary-foreground py-12 mt-12">
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
                <li><a href="/services" className="text-secondary-foreground/80 hover:text-primary transition-colors">Services</a></li>
                <li><a href="/contact" className="text-secondary-foreground/80 hover:text-primary transition-colors">Contact</a></li>
                <li><a href="/login" className="text-secondary-foreground/80 hover:text-primary transition-colors">Login</a></li>
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

export default ServicesPage;