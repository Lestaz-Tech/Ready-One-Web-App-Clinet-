import React from 'react';
import Icon from '../../../components/AppIcon';

const ContactInfo = () => {
  const contactDetails = [
    {
      id: 1,
      type: "phone",
      icon: "Phone",
      title: "Call Us",
      primary: "+254 700 123 456",
      secondary: "+254 722 987 654",
      description: "Available 24/7 for urgent moves"
    },
    {
      id: 2,
      type: "email",
      icon: "Mail",
      title: "Email Us",
      primary: "info@readyonemovers.co.ke",
      secondary: "support@readyonemovers.co.ke",
      description: "We respond within 2 hours"
    },
    {
      id: 3,
      type: "location",
      icon: "MapPin",
      title: "Visit Our Office",
      primary: "Westlands Business Center",
      secondary: "Waiyaki Way, Nairobi",
      description: "Mon-Sat: 8AM-6PM"
    },
    {
      id: 4,
      type: "whatsapp",
      icon: "MessageCircle",
      title: "WhatsApp",
      primary: "+254 700 123 456",
      secondary: "Quick responses guaranteed",
      description: "Chat with us instantly"
    }
  ];

  const handleContactClick = (type, value) => {
    switch (type) {
      case 'phone':
        window.open(`tel:${value}`, '_self');
        break;
      case 'email':
        window.open(`mailto:${value}`, '_self');
        break;
      case 'whatsapp':
        const message = encodeURIComponent("Hi! I need information about Ready One Movers services.");
        window.open(`https://wa.me/${value?.replace(/[^0-9]/g, '')}?text=${message}`, '_blank');
        break;
      case 'location':
        window.open('https://maps.google.com/?q=Westlands+Business+Center+Waiyaki+Way+Nairobi', '_blank');
        break;
      default:
        break;
    }
  };

  return (
    <div className="bg-card rounded-2xl p-6 lg:p-8 border border-border shadow-sm">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-2">Get In Touch</h2>
        <p className="text-muted-foreground">
          Ready to move? Contact us through any of these channels for immediate assistance.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {contactDetails?.map((contact) => (
          <div
            key={contact?.id}
            onClick={() => handleContactClick(contact?.type, contact?.primary)}
            className="group p-4 rounded-xl border border-border hover:border-primary/20 hover:bg-accent/5 transition-all duration-200 cursor-pointer"
          >
            <div className="flex items-start space-x-4">
              <div className="flex items-center justify-center w-12 h-12 bg-primary/10 text-primary rounded-xl group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-200">
                <Icon name={contact?.icon} size={24} />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-semibold text-foreground mb-1 group-hover:text-primary transition-colors duration-200">
                  {contact?.title}
                </h3>
                <p className="text-foreground font-medium mb-1">{contact?.primary}</p>
                <p className="text-sm text-muted-foreground mb-2">{contact?.secondary}</p>
                <p className="text-xs text-muted-foreground">{contact?.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Business Hours */}
      <div className="mt-8 p-4 bg-muted/50 rounded-xl">
        <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center">
          <Icon name="Clock" size={20} className="mr-2 text-primary" />
          Business Hours
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Monday - Friday:</span>
            <span className="text-foreground font-medium">8:00 AM - 6:00 PM</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Saturday:</span>
            <span className="text-foreground font-medium">8:00 AM - 4:00 PM</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Sunday:</span>
            <span className="text-foreground font-medium">Emergency Only</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Emergency Line:</span>
            <span className="text-primary font-medium">24/7 Available</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;