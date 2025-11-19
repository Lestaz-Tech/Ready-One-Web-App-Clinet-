import React from 'react';
import { Helmet } from 'react-helmet';
import PublicNavigation from '../../components/ui/PublicNavigation';
import WhatsAppIntegration from '../../components/ui/WhatsAppIntegration';
import RegistrationForm from './components/RegistrationForm';
import SocialRegistration from './components/SocialRegistration';
import RegistrationBenefits from './components/RegistrationBenefits';

const SignUpPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Sign Up - Ready One Movers Kenya | Create Your Account</title>
        <meta name="description" content="Create your Ready One Movers Kenya account. Join thousands of satisfied customers and experience seamless moving services with easy online booking, tracking, and support." />
        <meta name="keywords" content="sign up, register, Ready One Movers, Kenya moving services, create account, moving company registration" />
      </Helmet>

      {/* Navigation */}
      <PublicNavigation onLogout={() => {}} />

      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Column - Registration Forms */}
          <div className="space-y-8">
            {/* Social Registration */}
            <div className="lg:hidden">
              <SocialRegistration />
            </div>

            {/* Main Registration Form */}
            <RegistrationForm />

            {/* Social Registration for Desktop */}
            <div className="hidden lg:block">
              <SocialRegistration />
            </div>
          </div>

          {/* Right Column - Benefits & Information */}
          <div className="lg:sticky lg:top-8">
            <RegistrationBenefits />
          </div>
        </div>

        {/* Mobile Benefits Section */}
        <div className="lg:hidden mt-12">
          <RegistrationBenefits />
        </div>
      </main>

      {/* WhatsApp Integration */}
      <WhatsAppIntegration 
        phoneNumber="+254700000000"
        defaultMessage="Hi! I need help with creating my Ready One Movers account."
      />
    </div>
  );
};

export default SignUpPage;