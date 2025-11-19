import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const SocialRegistration = () => {
  const handleGoogleSignUp = () => {
    // Mock Google registration
    console.log('Google registration initiated');
  };

  const handleFacebookSignUp = () => {
    // Mock Facebook registration
    console.log('Facebook registration initiated');
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-card rounded-2xl shadow-lg border border-border p-8">
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-xl font-semibold text-foreground mb-2">Quick Registration</h2>
          <p className="text-muted-foreground text-sm">Sign up with your social account</p>
        </div>

        {/* Social Buttons */}
        <div className="space-y-4">
          <Button
            variant="outline"
            size="lg"
            fullWidth
            onClick={handleGoogleSignUp}
            iconName="Chrome"
            iconPosition="left"
            className="border-2 hover:bg-accent/5"
          >
            Continue with Google
          </Button>

          <Button
            variant="outline"
            size="lg"
            fullWidth
            onClick={handleFacebookSignUp}
            iconName="Facebook"
            iconPosition="left"
            className="border-2 hover:bg-accent/5"
          >
            Continue with Facebook
          </Button>
        </div>

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-card text-muted-foreground">or register with email</span>
          </div>
        </div>

        {/* Benefits */}
        <div className="space-y-3">
          <div className="flex items-center space-x-3 text-sm text-muted-foreground">
            <Icon name="Shield" size={16} className="text-success" />
            <span>Secure and encrypted registration</span>
          </div>
          <div className="flex items-center space-x-3 text-sm text-muted-foreground">
            <Icon name="Clock" size={16} className="text-primary" />
            <span>Quick 2-minute setup process</span>
          </div>
          <div className="flex items-center space-x-3 text-sm text-muted-foreground">
            <Icon name="Users" size={16} className="text-success" />
            <span>Join 10,000+ satisfied customers</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialRegistration;