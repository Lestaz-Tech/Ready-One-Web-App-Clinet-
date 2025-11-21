import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../../../components/AppIcon';
import Button from '../../../../components/ui/Button';
import { SERVICES_DATA } from '../data/services';

const ServiceComparisonModal = ({ isOpen, onClose, onSelectService }) => {
  const [selectedServices, setSelectedServices] = useState([]);
  const maxSelection = 3;

  const toggleService = (serviceId) => {
    setSelectedServices(prev => {
      if (prev.includes(serviceId)) {
        return prev.filter(id => id !== serviceId);
      } else {
        if (prev.length < maxSelection) {
          return [...prev, serviceId];
        }
        return prev;
      }
    });
  };

  const selectedServiceObjects = SERVICES_DATA.filter(s => selectedServices.includes(s.id));

  const handleSelectFromComparison = (service) => {
    onSelectService(service);
    setSelectedServices([]);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-card rounded-2xl border border-border w-full max-w-6xl max-h-96 overflow-y-auto"
          >
            {/* Header */}
            <div className="sticky top-0 bg-card border-b border-border p-6 flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-foreground">Compare Services</h2>
                <p className="text-sm text-muted-foreground">Select up to 3 services to compare</p>
              </div>
              <button
                onClick={onClose}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Icon name="X" size={24} />
              </button>
            </div>

            {/* Service Selection Grid */}
            <div className="p-6 border-b border-border">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {SERVICES_DATA.map(service => (
                  <button
                    key={service.id}
                    onClick={() => toggleService(service.id)}
                    className={`p-4 rounded-lg border-2 transition-all text-left ${
                      selectedServices.includes(service.id)
                        ? 'border-primary bg-primary/10'
                        : 'border-border hover:border-primary/50'
                    } ${selectedServices.length >= maxSelection && !selectedServices.includes(service.id) ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={selectedServices.length >= maxSelection && !selectedServices.includes(service.id)}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Icon name={service.icon} size={16} className="text-primary" />
                      <span className="text-xs font-semibold text-foreground">{service.title}</span>
                    </div>
                    <p className="text-xs text-primary font-bold">KES {service.startingPrice.toLocaleString()}</p>
                    {selectedServices.includes(service.id) && (
                      <Icon name="Check" size={16} className="text-primary mt-2" />
                    )}
                  </button>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-4">
                {selectedServices.length}/{maxSelection} services selected
              </p>
            </div>

            {/* Comparison Table */}
            {selectedServiceObjects.length > 0 && (
              <div className="p-6 overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left p-3 text-sm font-semibold text-foreground">Feature</th>
                      {selectedServiceObjects.map(service => (
                        <th key={service.id} className="text-center p-3 text-sm font-semibold text-foreground">
                          {service.title}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="space-y-4">
                    <tr className="border-b border-border">
                      <td className="p-3 text-sm font-semibold text-foreground">Starting Price</td>
                      {selectedServiceObjects.map(service => (
                        <td key={service.id} className="text-center p-3">
                          <p className="text-primary font-bold">KES {service.startingPrice.toLocaleString()}</p>
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b border-border">
                      <td className="p-3 text-sm font-semibold text-foreground">Duration</td>
                      {selectedServiceObjects.map(service => (
                        <td key={service.id} className="text-center p-3 text-sm text-muted-foreground">
                          {service.duration}
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b border-border">
                      <td className="p-3 text-sm font-semibold text-foreground">Team Size</td>
                      {selectedServiceObjects.map(service => (
                        <td key={service.id} className="text-center p-3 text-sm text-muted-foreground">
                          {service.teamSize}
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b border-border">
                      <td className="p-3 text-sm font-semibold text-foreground">Coverage Area</td>
                      {selectedServiceObjects.map(service => (
                        <td key={service.id} className="text-center p-3 text-sm text-muted-foreground">
                          {service.coverage}
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b border-border">
                      <td className="p-3 text-sm font-semibold text-foreground">Items Included</td>
                      {selectedServiceObjects.map(service => (
                        <td key={service.id} className="text-center p-3 text-sm text-primary font-semibold">
                          {service.included.length}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="p-3 text-sm font-semibold text-foreground">Action</td>
                      {selectedServiceObjects.map(service => (
                        <td key={service.id} className="text-center p-3">
                          <Button
                            size="sm"
                            variant="default"
                            onClick={() => handleSelectFromComparison(service)}
                          >
                            Book Now
                          </Button>
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            )}

            {/* Footer */}
            <div className="border-t border-border p-6 flex justify-end gap-3">
              <Button variant="outline" onClick={onClose}>
                Close
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ServiceComparisonModal;
