import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';
import { useAuth } from '../../../contexts/AuthContext';

const RegistrationForm = () => {
  const navigate = useNavigate();
  const { signUp } = useAuth();
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [agreements, setAgreements] = useState({
    terms: false,
    privacy: false,
    marketing: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Mock existing users for validation
  const existingUsers = [
    { email: "john.doe@example.com", phone: "+254712345678" },
    { email: "jane.smith@gmail.com", phone: "+254723456789" }
  ];

  const validateForm = () => {
    const newErrors = {};

    // Full name validation
    if (!formData?.fullName?.trim()) {
      newErrors.fullName = "Full name is required";
    } else if (formData?.fullName?.trim()?.length < 2) {
      newErrors.fullName = "Full name must be at least 2 characters";
    }

    // Phone number validation (Kenyan format)
    const phoneRegex = /^(\+254|0)[17]\d{8}$/;
    if (!formData?.phoneNumber?.trim()) {
      newErrors.phoneNumber = "Phone number is required";
    } else if (!phoneRegex?.test(formData?.phoneNumber?.replace(/\s/g, ''))) {
      newErrors.phoneNumber = "Please enter a valid Kenyan phone number";
    } else if (existingUsers?.some(user => user?.phone === formData?.phoneNumber)) {
      newErrors.phoneNumber = "This phone number is already registered";
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData?.email?.trim()) {
      newErrors.email = "Email address is required";
    } else if (!emailRegex?.test(formData?.email)) {
      newErrors.email = "Please enter a valid email address";
    } else if (existingUsers?.some(user => user?.email === formData?.email)) {
      newErrors.email = "This email is already registered";
    }

    // Password validation
    if (!formData?.password) {
      newErrors.password = "Password is required";
    } else if (formData?.password?.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/?.test(formData?.password)) {
      newErrors.password = "Password must contain uppercase, lowercase, and number";
    }

    // Confirm password validation
    if (!formData?.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData?.password !== formData?.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    // Terms validation
    if (!agreements?.terms) {
      newErrors.terms = "You must agree to the Terms of Service";
    }

    // Privacy validation
    if (!agreements?.privacy) {
      newErrors.privacy = "You must agree to the Privacy Policy";
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const getPasswordStrength = (password) => {
    if (!password) return { strength: 0, label: '', color: '' };
    
    let score = 0;
    if (password?.length >= 8) score++;
    if (/[a-z]/?.test(password)) score++;
    if (/[A-Z]/?.test(password)) score++;
    if (/\d/?.test(password)) score++;
    if (/[^a-zA-Z\d]/?.test(password)) score++;

    if (score <= 2) return { strength: score, label: 'Weak', color: 'text-error' };
    if (score <= 3) return { strength: score, label: 'Fair', color: 'text-warning' };
    if (score <= 4) return { strength: score, label: 'Good', color: 'text-success' };
    return { strength: score, label: 'Strong', color: 'text-success' };
  };

  const handleInputChange = (e) => {
    const { name, value } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors?.[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleAgreementChange = (name, checked) => {
    setAgreements(prev => ({
      ...prev,
      [name]: checked
    }));
    
    // Clear error when user checks
    if (errors?.[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    
    try {
      // Call Supabase signup
      const res = await signUp({ phone: formData?.phoneNumber, email: formData?.email, password: formData?.password, fullName: formData?.fullName });
      if (res?.error) {
        setErrors({ submit: res.error.message || 'Registration failed' });
      } else {
        // On success, Supabase may require email/phone confirmation depending on settings
        navigate('/dashboard');
      }
    } catch (error) {
      setErrors({ submit: 'Registration failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const passwordStrength = getPasswordStrength(formData?.password);

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-card rounded-2xl shadow-lg border border-border p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center w-16 h-16 bg-primary rounded-2xl mx-auto mb-4">
            <Icon name="UserPlus" size={32} color="white" />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">Create Account</h1>
          <p className="text-muted-foreground">Join Ready One Movers Kenya today</p>
        </div>

        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Full Name */}
          <Input
            label="Full Name"
            type="text"
            name="fullName"
            placeholder="Enter your full name"
            value={formData?.fullName}
            onChange={handleInputChange}
            error={errors?.fullName}
            required
          />

          {/* Phone Number */}
          <Input
            label="Phone Number"
            type="tel"
            name="phoneNumber"
            placeholder="+254 712 345 678"
            value={formData?.phoneNumber}
            onChange={handleInputChange}
            error={errors?.phoneNumber}
            description="We'll use this for booking confirmations"
            required
          />

          {/* Email */}
          <Input
            label="Email Address"
            type="email"
            name="email"
            placeholder="your.email@example.com"
            value={formData?.email}
            onChange={handleInputChange}
            error={errors?.email}
            required
          />

          {/* Password */}
          <div className="relative">
            <Input
              label="Password"
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Create a strong password"
              value={formData?.password}
              onChange={handleInputChange}
              error={errors?.password}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-9 text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              <Icon name={showPassword ? "EyeOff" : "Eye"} size={20} />
            </button>
            
            {/* Password Strength Indicator */}
            {formData?.password && (
              <div className="mt-2">
                <div className="flex items-center space-x-2">
                  <div className="flex-1 bg-muted rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-300 ${
                        passwordStrength?.strength <= 2 ? 'bg-error' :
                        passwordStrength?.strength <= 3 ? 'bg-warning' : 'bg-success'
                      }`}
                      style={{ width: `${(passwordStrength?.strength / 5) * 100}%` }}
                    />
                  </div>
                  <span className={`text-sm font-medium ${passwordStrength?.color}`}>
                    {passwordStrength?.label}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <Input
              label="Confirm Password"
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm your password"
              value={formData?.confirmPassword}
              onChange={handleInputChange}
              error={errors?.confirmPassword}
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-9 text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              <Icon name={showConfirmPassword ? "EyeOff" : "Eye"} size={20} />
            </button>
          </div>

          {/* Agreements */}
          <div className="space-y-4">
            <Checkbox
              label="I agree to the Terms of Service"
              checked={agreements?.terms}
              onChange={(e) => handleAgreementChange('terms', e?.target?.checked)}
              error={errors?.terms}
              required
            />
            
            <Checkbox
              label="I agree to the Privacy Policy"
              checked={agreements?.privacy}
              onChange={(e) => handleAgreementChange('privacy', e?.target?.checked)}
              error={errors?.privacy}
              required
            />
            
            <Checkbox
              label="I want to receive marketing updates and promotions"
              checked={agreements?.marketing}
              onChange={(e) => handleAgreementChange('marketing', e?.target?.checked)}
              description="You can unsubscribe at any time"
            />
          </div>

          {/* Submit Error */}
          {errors?.submit && (
            <div className="p-4 bg-error/10 border border-error/20 rounded-lg">
              <p className="text-error text-sm">{errors?.submit}</p>
            </div>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            variant="default"
            size="lg"
            fullWidth
            loading={isLoading}
            disabled={isLoading}
            iconName="UserPlus"
            iconPosition="left"
          >
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </Button>
        </form>

        {/* Login Link */}
        <div className="mt-8 text-center">
          <p className="text-muted-foreground">
            Already have an account?{' '}
            <Link 
              to="/login" 
              className="text-primary hover:text-primary/80 font-medium transition-colors duration-200"
            >
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;