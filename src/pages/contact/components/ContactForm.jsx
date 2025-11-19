import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    serviceType: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const serviceOptions = [
    { value: '', label: 'Select a service' },
    { value: 'house-moving', label: 'House Moving' },
    { value: 'office-moving', label: 'Office Moving' },
    { value: 'bedsitter', label: 'Bedsitter Moving' },
    { value: '1-bedroom', label: '1 Bedroom Moving' },
    { value: '2-bedroom', label: '2 Bedroom Moving' },
    { value: '3-bedroom', label: '3 Bedroom Moving' },
    { value: '4-bedroom', label: '4 Bedroom Moving' },
    { value: '5-bedroom', label: '5+ Bedroom Moving' },
    { value: 'mansionette', label: 'Mansionette Moving' },
    { value: 'apartment', label: 'Apartment Moving' },
    { value: 'bungalow', label: 'Bungalow Moving' },
    { value: 'furniture-only', label: 'Furniture Moving Only' },
    { value: 'packing-services', label: 'Packing Services' },
    { value: 'long-distance', label: 'Long Distance Moving' },
    { value: 'other', label: 'Other Services' }
  ];

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.fullName?.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData?.phone?.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^(\+254|0)[17]\d{8}$/?.test(formData?.phone?.replace(/\s/g, ''))) {
      newErrors.phone = 'Please enter a valid Kenyan phone number';
    }

    if (!formData?.email?.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData?.serviceType) {
      newErrors.serviceType = 'Please select a service type';
    }

    if (!formData?.message?.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData?.message?.trim()?.length < 10) {
      newErrors.message = 'Message must be at least 10 characters long';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Clear error when user starts typing
    if (errors?.[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setIsSubmitted(true);
      setFormData({
        fullName: '',
        phone: '',
        email: '',
        serviceType: '',
        message: ''
      });
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="bg-card rounded-2xl p-6 lg:p-8 border border-border shadow-sm">
        <div className="text-center py-8">
          <div className="flex items-center justify-center w-16 h-16 bg-success/10 text-success rounded-full mx-auto mb-4">
            <Icon name="CheckCircle" size={32} />
          </div>
          <h3 className="text-2xl font-bold text-foreground mb-2">Message Sent Successfully!</h3>
          <p className="text-muted-foreground mb-6">
            Thank you for contacting Ready One Movers. We'll get back to you within 2 hours during business hours.
          </p>
          <Button 
            variant="outline" 
            onClick={() => setIsSubmitted(false)}
            iconName="RotateCcw"
            iconPosition="left"
          >
            Send Another Message
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-2xl p-6 lg:p-8 border border-border shadow-sm">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-2">Send Us a Message</h2>
        <p className="text-muted-foreground">
          Fill out the form below and we'll respond to your inquiry as soon as possible.
        </p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Full Name"
            type="text"
            placeholder="Enter your full name"
            value={formData?.fullName}
            onChange={(e) => handleInputChange('fullName', e?.target?.value)}
            error={errors?.fullName}
            required
          />

          <Input
            label="Phone Number"
            type="tel"
            placeholder="+254 700 123 456"
            value={formData?.phone}
            onChange={(e) => handleInputChange('phone', e?.target?.value)}
            error={errors?.phone}
            required
          />
        </div>

        <Input
          label="Email Address"
          type="email"
          placeholder="your.email@example.com"
          value={formData?.email}
          onChange={(e) => handleInputChange('email', e?.target?.value)}
          error={errors?.email}
          required
        />

        <Select
          label="Service Type"
          placeholder="Select the service you need"
          options={serviceOptions}
          value={formData?.serviceType}
          onChange={(value) => handleInputChange('serviceType', value)}
          error={errors?.serviceType}
          required
        />

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Message <span className="text-error">*</span>
          </label>
          <textarea
            placeholder="Tell us about your moving requirements, preferred dates, locations, and any special instructions..."
            value={formData?.message}
            onChange={(e) => handleInputChange('message', e?.target?.value)}
            rows={5}
            className={`w-full px-3 py-2 border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors duration-200 resize-vertical ${
              errors?.message ? 'border-error' : 'border-border'
            }`}
          />
          {errors?.message && (
            <p className="mt-1 text-sm text-error">{errors?.message}</p>
          )}
        </div>

        <Button
          type="submit"
          variant="default"
          size="lg"
          fullWidth
          loading={isSubmitting}
          iconName="Send"
          iconPosition="right"
        >
          {isSubmitting ? 'Sending Message...' : 'Send Message'}
        </Button>
      </form>
      <div className="mt-6 p-4 bg-muted/50 rounded-xl">
        <div className="flex items-start space-x-3">
          <Icon name="Info" size={20} className="text-primary mt-0.5" />
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-1">Quick Response Guarantee</h4>
            <p className="text-xs text-muted-foreground">
              We respond to all inquiries within 2 hours during business hours. For urgent moves, call our 24/7 emergency line.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;