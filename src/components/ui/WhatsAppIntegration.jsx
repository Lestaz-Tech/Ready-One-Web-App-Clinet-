import React, { useState } from 'react';
import Icon from '../AppIcon';

const WhatsAppIntegration = ({ 
  phoneNumber = "+254700000000", 
  defaultMessage = "Hi! I need help with Ready One Movers services.",
  position = "bottom-right",
  showTooltip = true 
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const positionClasses = {
    'bottom-right': 'fixed bottom-6 right-6',
    'bottom-left': 'fixed bottom-6 left-6',
    'top-right': 'fixed top-20 right-6',
    'top-left': 'fixed top-20 left-6'
  };

  const handleWhatsAppClick = () => {
    setIsClicked(true);
    const encodedMessage = encodeURIComponent(defaultMessage);
    const whatsappUrl = `https://wa.me/${phoneNumber?.replace(/[^0-9]/g, '')}?text=${encodedMessage}`;
    
    // Reset click state after animation
    setTimeout(() => setIsClicked(false), 200);
    
    // Open WhatsApp
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className={`${positionClasses?.[position]} z-50 group`}>
      {/* Tooltip */}
      {showTooltip && isHovered && (
        <div className="absolute bottom-full right-0 mb-2 px-3 py-2 bg-secondary text-secondary-foreground text-sm rounded-lg shadow-lg whitespace-nowrap animate-fade-in">
          Chat with us on WhatsApp
          <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-secondary"></div>
        </div>
      )}
      {/* WhatsApp Button */}
      <button
        onClick={handleWhatsAppClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`
          flex items-center justify-center w-14 h-14 bg-success text-success-foreground rounded-full shadow-lg
          hover:bg-success/90 hover:scale-110 active:scale-95
          transition-all duration-200 ease-out
          focus:outline-none focus:ring-4 focus:ring-success/20
          ${isClicked ? 'animate-pulse' : ''}
        `}
        aria-label="Chat on WhatsApp"
      >
        <Icon name="MessageCircle" size={24} />
      </button>
      {/* Pulse Animation Ring */}
      <div className="absolute inset-0 rounded-full bg-success/20 animate-ping"></div>
    </div>
  );
};

export default WhatsAppIntegration;