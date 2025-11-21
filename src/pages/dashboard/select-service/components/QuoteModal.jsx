import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../../../components/AppIcon';
import Input from '../../../../components/ui/Input';
import Button from '../../../../components/ui/Button';
import { calculatePrice } from '../data/services';

const QuoteModal = ({ isOpen, onClose, service }) => {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    moveDate: '',
    pickupLocation: '',
    destination: '',
    floorLevel: '0',
    additionalServices: [],
    notes: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (serviceName) => {
    setForm(prev => ({
      ...prev,
      additionalServices: prev.additionalServices.includes(serviceName)
        ? prev.additionalServices.filter(s => s !== serviceName)
        : [...prev.additionalServices, serviceName]
    }));
  };

  // Calculate live price estimate
  const estimatedPrice = useMemo(() => {
    if (!service) return 0;
    return calculatePrice(service, parseInt(form.floorLevel), form.additionalServices);
  }, [service, form.floorLevel, form.additionalServices]);

  const selectedAddons = service?.additionalServices?.filter(addon =>
    form.additionalServices.includes(addon.name)
  ) || [];

  const handleGetQuote = () => {
    // Handle quote submission
    console.log('Quote requested:', { ...form, estimatedPrice, service: service.title });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && service && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="bg-card rounded-2xl border border-border w-full max-w-2xl max-h-96 overflow-y-auto"
          >
            {/* Header */}
            <div className="sticky top-0 bg-card border-b border-border p-6 flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-foreground">Get Quote</h2>
                <p className="text-sm text-muted-foreground">{service.title}</p>
              </div>
              <button
                onClick={onClose}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Icon name="X" size={24} />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Service Summary */}
              <div className="bg-muted/50 rounded-lg p-4 flex items-start gap-4">
                <Icon name={service.icon} size={32} className="text-primary flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">Service Selected</p>
                  <p className="font-semibold text-foreground">{service.title}</p>
                  <p className="text-xs text-primary mt-1">Starting from KES {service.startingPrice.toLocaleString()}</p>
                </div>
              </div>

              {/* Form Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Full Name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  required
                />
                <Input
                  label="Phone"
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="Your phone number"
                  required
                />
                <Input
                  label="Email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Your email"
                  required
                />
                <Input
                  label="Move Date"
                  name="moveDate"
                  type="date"
                  value={form.moveDate}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Locations */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Pickup Location"
                  name="pickupLocation"
                  value={form.pickupLocation}
                  onChange={handleChange}
                  placeholder="Where are you moving from?"
                  required
                />
                <Input
                  label="Destination"
                  name="destination"
                  value={form.destination}
                  onChange={handleChange}
                  placeholder="Where are you moving to?"
                  required
                />
              </div>

              {/* Floor Level */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Floor Level (Additional charge: KES 500 per floor)
                </label>
                <div className="flex items-center gap-4">
                  <select
                    name="floorLevel"
                    value={form.floorLevel}
                    onChange={handleChange}
                    className="flex-1 px-4 py-2 rounded-lg border border-border bg-muted text-foreground focus:outline-none focus:border-primary"
                  >
                    {[0, 1, 2, 3, 4, 5, 6, 7, 8].map(floor => (
                      <option key={floor} value={floor}>
                        {floor === 0 ? 'Ground Floor' : `Floor ${floor}`}
                      </option>
                    ))}
                  </select>
                  {parseInt(form.floorLevel) > 0 && (
                    <div className="text-sm text-muted-foreground">
                      +KES {(parseInt(form.floorLevel) * 500).toLocaleString()}
                    </div>
                  )}
                </div>
              </div>

              {/* Additional Services */}
              {service.additionalServices && service.additionalServices.length > 0 && (
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-3">
                    Additional Services (Optional)
                  </label>
                  <div className="space-y-2 max-h-32 overflow-y-auto">
                    {service.additionalServices.map((addon, idx) => (
                      <label key={idx} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={form.additionalServices.includes(addon.name)}
                          onChange={() => handleCheckboxChange(addon.name)}
                          className="w-4 h-4 rounded border-border cursor-pointer"
                        />
                        <span className="flex-1 text-sm text-foreground">{addon.name}</span>
                        <span className="text-sm font-semibold text-primary">+KES {addon.price.toLocaleString()}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Notes */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Additional Notes (Optional)
                </label>
                <textarea
                  name="notes"
                  value={form.notes}
                  onChange={handleChange}
                  placeholder="Any special requirements or notes?"
                  rows={3}
                  className="w-full px-4 py-2 rounded-lg border border-border bg-muted text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary resize-none"
                />
              </div>

              {/* Price Summary */}
              <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Base Price:</span>
                  <span className="font-semibold">KES {service.startingPrice.toLocaleString()}</span>
                </div>
                {parseInt(form.floorLevel) > 0 && (
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Floor Charge ({form.floorLevel} floors):</span>
                    <span className="font-semibold">KES {(parseInt(form.floorLevel) * 500).toLocaleString()}</span>
                  </div>
                )}
                {selectedAddons.length > 0 && (
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Additional Services:</span>
                    <span className="font-semibold">KES {selectedAddons.reduce((sum, a) => sum + a.price, 0).toLocaleString()}</span>
                  </div>
                )}
                <div className="border-t border-primary/20 pt-2 flex justify-between items-center">
                  <span className="font-bold text-foreground">Estimated Total:</span>
                  <span className="text-2xl font-bold text-primary">KES {estimatedPrice.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-border p-6 flex justify-end gap-3 sticky bottom-0 bg-card">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button
                variant="default"
                onClick={handleGetQuote}
                disabled={!form.name || !form.phone || !form.email || !form.moveDate || !form.pickupLocation || !form.destination}
              >
                Get Quote
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default QuoteModal;
