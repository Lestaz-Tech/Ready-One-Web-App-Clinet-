import React from 'react';
import { Helmet } from 'react-helmet';
import BookingForm from './components/BookingForm';

const SelectServicePage = () => {
  return (
    <div>
      <Helmet>
        <title>Select Service - Dashboard</title>
      </Helmet>

      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Select Moving Service</h2>
        <p className="text-sm text-muted-foreground mb-6">Choose the service you need and provide move details.</p>

        <BookingForm />
      </div>
    </div>
  );
};

export default SelectServicePage;
