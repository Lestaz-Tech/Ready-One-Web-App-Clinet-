import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import ServiceSelection from './components/ServiceSelection';
import ServiceComparisonModal from './components/ServiceComparisonModal';
import SelectedServiceBooking from './components/SelectedServiceBooking';
import QuoteModal from './components/QuoteModal';

const SelectServicePage = () => {
  const [selectedService, setSelectedService] = useState(null);
  const [comparisonOpen, setComparisonOpen] = useState(false);
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [quoteService, setQuoteService] = useState(null);

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSelectService = (service) => {
    setSelectedService(service);
    window.scrollTo(0, 0);
  };

  const handleOpenComparison = (serviceId) => {
    setComparisonOpen(true);
  };

  const handleOpenQuote = (service) => {
    setQuoteService(service);
    setQuoteOpen(true);
  };

  return (
    <div className="w-full min-h-screen">
      <Helmet>
        <title>Select Moving Service - Ready One Movers</title>
        <meta name="description" content="Choose the perfect moving service for your needs" />
      </Helmet>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="space-y-6 sm:space-y-8 md:space-y-10 w-full"
      >
        {/* Page Header */}
        {!selectedService ? (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-1 sm:space-y-2 px-0"
          >
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground">
              Select Moving Service
            </h1>
            <p className="text-xs sm:text-sm md:text-base text-muted-foreground max-w-2xl">
              Choose the service you need and provide move details. We'll help you find the perfect moving solution for your needs.
            </p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-1 sm:space-y-2 md:space-y-3 px-0"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground">
              Confirm Your Booking
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground">
              Complete your booking details for <span className="font-semibold text-foreground">{selectedService?.title}</span>
            </p>
          </motion.div>
        )}

        {/* Content */}
        {!selectedService ? (
          <ServiceSelection
            onSelectService={handleSelectService}
            onOpenComparison={handleOpenComparison}
          />
        ) : (
          <SelectedServiceBooking
            service={selectedService}
            onBack={() => setSelectedService(null)}
            onOpenQuote={handleOpenQuote}
          />
        )}
      </motion.div>

      {/* Modals */}
      <ServiceComparisonModal
        isOpen={comparisonOpen}
        onClose={() => setComparisonOpen(false)}
        onSelectService={handleSelectService}
      />

      <QuoteModal
        isOpen={quoteOpen}
        onClose={() => setQuoteOpen(false)}
        service={quoteService}
      />
    </div>
  );
};

export default SelectServicePage;
