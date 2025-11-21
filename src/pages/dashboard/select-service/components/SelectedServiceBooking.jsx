import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../../components/AppIcon';
import Input from '../../../../components/ui/Input';
import Button from '../../../../components/ui/Button';
import { useAuth } from '../../../../contexts/AuthContext';
import { calculatePrice } from '../data/services';
import { api } from '../../../../utils/apiClient';

const SelectedServiceBooking = ({ service, onBack, onOpenQuote }) => {
  const navigate = useNavigate();
  const { user, session } = useAuth();
  const [form, setForm] = useState({
    fullName: user?.user_metadata?.full_name || '',
    phone: user?.user_metadata?.phone || '',
    email: user?.email || '',
    pickupLocation: '',
    destination: '',
    moveDate: '',
    floorLevel: '0',
    additionalServices: [],
    notes: '',
    paymentMethod: 'Cash'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

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
    return calculatePrice(service, parseInt(form.floorLevel), form.additionalServices);
  }, [service, form.floorLevel, form.additionalServices]);

  const selectedAddons = service.additionalServices.filter(addon =>
    form.additionalServices.includes(addon.name)
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (!user || !session) {
      setError('You must be logged in to make a booking.');
      return;
    }

    setLoading(true);
    try {
      const payload = {
        service_type: service.title,
        from_location: form.pickupLocation,
        to_location: form.destination,
        booking_date: form.moveDate ? new Date(form.moveDate).toISOString() : null,
        estimated_cost: estimatedPrice,
        notes: `${form.notes}\n\nAdditional Services: ${form.additionalServices.join(', ') || 'None'}`
      };

      const result = await api.post('/api/bookings', payload, {
        headers: {
          'Authorization': `Bearer ${session.access_token}`
        }
      });

      if (!result.success) throw new Error(result.error || 'Failed to create booking');

      setSuccess(true);
      setTimeout(() => {
        navigate('/dashboard/bookings');
      }, 2000);
    } catch (err) {
      console.error('Booking error:', err);
      setError(err.message || 'Failed to create booking. Please check that the server is running and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      {/* Success Toast Popup */}
      {success && (
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          className="fixed top-6 right-6 z-50 max-w-md"
        >
          <div className="bg-success text-white rounded-xl shadow-2xl p-4 flex items-start gap-4 border border-success/30">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 2 }}
            >
              <Icon name="CheckCircle2" size={24} className="flex-shrink-0" />
            </motion.div>
            <div className="flex-1">
              <h3 className="font-bold mb-1">Booking Confirmed!</h3>
              <p className="text-sm opacity-90">Your booking has been submitted successfully. Redirecting to bookings...</p>
              <motion.div
                initial={{ width: '100%' }}
                animate={{ width: 0 }}
                transition={{ duration: 2, ease: 'easeInOut' }}
                className="h-1 bg-white/30 rounded-full mt-3 origin-left"
              />
            </div>
          </div>
        </motion.div>
      )}

      {/* Back Button */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-4"
      >
        <Icon name="ChevronLeft" size={18} />
        <span>Back to Services</span>
      </button>

      {/* Service Summary Card */}
      <div className="bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 rounded-2xl p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left: Service Info */}
          <div>
            <div className="flex items-start gap-4 mb-6">
              <div className="w-16 h-16 bg-primary/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <Icon name={service.icon} size={32} className="text-primary" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">{service.title}</h1>
                <p className="text-primary font-semibold text-sm mt-1">{service.category}</p>
              </div>
            </div>

            <p className="text-foreground mb-6">{service.description}</p>

            {/* Quick Info Grid */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-card/50 rounded-lg p-3">
                <p className="text-xs text-muted-foreground mb-1">Duration</p>
                <p className="font-semibold text-foreground">{service.duration}</p>
              </div>
              <div className="bg-card/50 rounded-lg p-3">
                <p className="text-xs text-muted-foreground mb-1">Team Size</p>
                <p className="font-semibold text-foreground">{service.teamSize}</p>
              </div>
              <div className="bg-card/50 rounded-lg p-3">
                <p className="text-xs text-muted-foreground mb-1">Coverage</p>
                <p className="font-semibold text-foreground">{service.coverage}</p>
              </div>
              <div className="bg-card/50 rounded-lg p-3">
                <p className="text-xs text-muted-foreground mb-1">Starting</p>
                <p className="font-semibold text-primary">KES {service.startingPrice.toLocaleString()}</p>
              </div>
            </div>

            {/* Included Items */}
            <div className="bg-card/50 rounded-lg p-4">
              <p className="text-sm font-semibold text-foreground mb-3">What's Included</p>
              <ul className="space-y-2">
                {service.included.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-foreground">
                    <Icon name="Check" size={16} className="text-success flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right: Price Breakdown */}
          <div className="space-y-4">
            <div className="bg-card rounded-lg p-6 border border-border">
              <h3 className="text-lg font-bold text-foreground mb-4">Price Estimate</h3>

              {/* Price Breakdown */}
              <div className="space-y-3 mb-4">
                <div className="flex justify-between items-center py-2 border-b border-border">
                  <span className="text-sm text-muted-foreground">Base Price</span>
                  <span className="font-semibold text-foreground">KES {service.startingPrice.toLocaleString()}</span>
                </div>

                <div className="space-y-2 text-sm">
                  <p className="font-semibold text-foreground mb-2">Add-ons: {form.additionalServices.length}</p>
                  {selectedAddons.map((addon, idx) => (
                    <div key={idx} className="flex justify-between">
                      <span className="text-muted-foreground line-clamp-1">{addon.name}</span>
                      <span className="font-semibold text-foreground">+KES {addon.price.toLocaleString()}</span>
                    </div>
                  ))}
                </div>

                {parseInt(form.floorLevel) > 0 && (
                  <div className="flex justify-between items-center py-2 border-b border-border">
                    <span className="text-sm text-muted-foreground">Floor Charges ({form.floorLevel} floors)</span>
                    <span className="font-semibold text-foreground">+KES {(parseInt(form.floorLevel) * 500).toLocaleString()}</span>
                  </div>
                )}
              </div>

              {/* Total */}
              <div className="bg-primary/10 rounded-lg p-4 border border-primary/20">
                <p className="text-sm text-muted-foreground mb-1">Estimated Total</p>
                <p className="text-3xl font-bold text-primary">KES {estimatedPrice.toLocaleString()}</p>
              </div>

              {/* Get Quote Button */}
              <Button
                variant="outline"
                className="w-full mt-4"
                onClick={() => onOpenQuote(service)}
              >
                <Icon name="FileText" size={16} />
                Get Detailed Quote
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Form */}
      <form onSubmit={handleSubmit} className="bg-card border border-border rounded-2xl p-8 space-y-6">
        {error && (
          <div className="p-4 bg-error/10 text-error rounded-lg flex items-start gap-2">
            <Icon name="AlertTriangle" size={18} className="flex-shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <h2 className="text-2xl font-bold text-foreground">Booking Details</h2>

        {/* Personal Information */}
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-4">Your Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              label="Full Name"
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              required
            />
            <Input
              label="Phone"
              name="phone"
              type="tel"
              value={form.phone}
              onChange={handleChange}
              required
            />
            <Input
              label="Email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* Move Details */}
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-4">Move Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Move Date"
              name="moveDate"
              type="date"
              value={form.moveDate}
              onChange={handleChange}
              required
            />
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Floor Level (KES 500 per floor)
              </label>
              <select
                name="floorLevel"
                value={form.floorLevel}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-border bg-muted text-foreground focus:outline-none focus:border-primary"
              >
                {[0, 1, 2, 3, 4, 5, 6, 7, 8].map(floor => (
                  <option key={floor} value={floor}>
                    {floor === 0 ? 'Ground Floor' : `Floor ${floor}`}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Additional Services */}
        {service.additionalServices && service.additionalServices.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">Additional Services</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {service.additionalServices.map((addon, idx) => (
                <label key={idx} className="flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-muted/50 cursor-pointer transition-colors">
                  <input
                    type="checkbox"
                    checked={form.additionalServices.includes(addon.name)}
                    onChange={() => handleCheckboxChange(addon.name)}
                    className="w-4 h-4 rounded border-border cursor-pointer"
                  />
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-foreground">{addon.name}</p>
                    <p className="text-xs text-primary">+KES {addon.price.toLocaleString()}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Notes */}
        <div>
          <label className="block text-sm font-semibold text-foreground mb-2">
            Special Instructions (Optional)
          </label>
          <textarea
            name="notes"
            value={form.notes}
            onChange={handleChange}
            placeholder="Any special requirements or notes about your move?"
            rows={4}
            className="w-full px-4 py-2 rounded-lg border border-border bg-muted text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary resize-none"
          />
        </div>

        {/* Payment Method */}
        <div>
          <label className="block text-sm font-semibold text-foreground mb-2">
            Payment Method
          </label>
          <select
            name="paymentMethod"
            value={form.paymentMethod}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border border-border bg-muted text-foreground focus:outline-none focus:border-primary"
          >
            <option>Cash</option>
            <option>Mpesa</option>
            <option>Card</option>
            <option>Bank Transfer</option>
          </select>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 pt-6 border-t border-border">
          <Button
            type="button"
            variant="outline"
            className="flex-1"
            onClick={onBack}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="default"
            className="flex-1"
            loading={loading}
            disabled={!form.fullName || !form.phone || !form.email || !form.pickupLocation || !form.destination || !form.moveDate}
          >
            {loading ? 'Booking...' : 'Confirm Booking'}
          </Button>
        </div>
      </form>
    </motion.div>
  );
};

export default SelectedServiceBooking;
