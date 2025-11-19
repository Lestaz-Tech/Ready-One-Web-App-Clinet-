import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { motion } from 'framer-motion';
import PublicNavigation from '../../components/ui/PublicNavigation';
import WhatsAppIntegration from '../../components/ui/WhatsAppIntegration';
import LoginHeader from './components/LoginHeader';
import LoginForm from './components/LoginForm';
import LoginBenefits from './components/LoginBenefits';

const LoginPage = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();

  // Redirect if already authenticated
  useEffect(() => {
    if (!loading && user) navigate('/dashboard');
  }, [navigate, user, loading]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-accent/5">
      {/* Navigation */}
      <PublicNavigation isAuthenticated={false} onLogout={() => {}} />
      {/* Main Content */}
      <main className="relative">
        {/* Hero Section */}
        <section className="py-12 lg:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
              {/* Left Column - Login Form */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="order-2 lg:order-1"
              >
                <LoginHeader />
                <LoginForm />
              </motion.div>

              {/* Right Column - Benefits */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="order-1 lg:order-2"
              >
                <LoginBenefits />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Background Decorations */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
        </div>
      </main>
      {/* WhatsApp Integration */}
      <WhatsAppIntegration 
        phoneNumber="+254700000000"
        defaultMessage="Hi! I need help with logging into my Ready One Movers account."
        position="bottom-right"
        showTooltip={true}
      />
    </div>
  );
};

export default LoginPage;