import React from 'react';
import Icon from '../../../components/AppIcon';

const SocialMedia = () => {
  const socialPlatforms = [
    {
      id: 1,
      name: "Facebook",
      icon: "Facebook",
      handle: "@ReadyOneMoversKenya",
      url: "https://facebook.com/readyonemoverskenya",
      description: "Follow us for moving tips and customer stories",
      followers: "2.5K followers"
    },
    {
      id: 2,
      name: "Instagram",
      icon: "Instagram",
      handle: "@readyonemovers_ke",
      url: "https://instagram.com/readyonemovers_ke",
      description: "See our work in action and customer testimonials",
      followers: "1.8K followers"
    },
    {
      id: 3,
      name: "Twitter",
      icon: "Twitter",
      handle: "@ReadyOneKE",
      url: "https://twitter.com/readyoneke",
      description: "Get quick updates and customer support",
      followers: "950 followers"
    },
    {
      id: 4,
      name: "LinkedIn",
      icon: "Linkedin",
      handle: "Ready One Movers Kenya",
      url: "https://linkedin.com/company/ready-one-movers-kenya",
      description: "Connect with us for corporate moving solutions",
      followers: "500+ connections"
    },
    {
      id: 5,
      name: "YouTube",
      icon: "Youtube",
      handle: "Ready One Movers",
      url: "https://youtube.com/readyonemovers",
      description: "Watch moving guides and service demonstrations",
      followers: "1.2K subscribers"
    },
    {
      id: 6,
      name: "TikTok",
      icon: "Music",
      handle: "@readyonemovers",
      url: "https://tiktok.com/@readyonemovers",
      description: "Quick moving tips and behind-the-scenes content",
      followers: "3.1K followers"
    }
  ];

  const handleSocialClick = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="bg-card rounded-2xl p-6 lg:p-8 border border-border shadow-sm">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-2">Follow Us</h2>
        <p className="text-muted-foreground">
          Stay connected with Ready One Movers on social media for updates, tips, and exclusive offers.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {socialPlatforms?.map((platform) => (
          <div
            key={platform?.id}
            onClick={() => handleSocialClick(platform?.url)}
            className="group p-4 border border-border rounded-xl hover:border-primary/20 hover:bg-accent/5 transition-all duration-200 cursor-pointer"
          >
            <div className="flex items-start space-x-3">
              <div className="flex items-center justify-center w-10 h-10 bg-primary/10 text-primary rounded-lg group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-200">
                <Icon name={platform?.icon} size={20} />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors duration-200">
                  {platform?.name}
                </h3>
                <p className="text-xs text-primary font-medium mb-1">{platform?.handle}</p>
                <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
                  {platform?.description}
                </p>
                <p className="text-xs text-muted-foreground font-medium">{platform?.followers}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Social Media CTA */}
      <div className="mt-6 p-4 bg-gradient-to-r from-primary/5 to-accent/5 border border-primary/20 rounded-xl">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-1">Stay Updated</h3>
            <p className="text-sm text-muted-foreground">
              Follow us for moving tips, special offers, and company updates.
            </p>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => handleSocialClick(socialPlatforms?.[0]?.url)}
              className="flex items-center justify-center w-10 h-10 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors duration-200"
              aria-label="Follow on Facebook"
            >
              <Icon name="Facebook" size={18} />
            </button>
            <button
              onClick={() => handleSocialClick(socialPlatforms?.[1]?.url)}
              className="flex items-center justify-center w-10 h-10 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors duration-200"
              aria-label="Follow on Instagram"
            >
              <Icon name="Instagram" size={18} />
            </button>
          </div>
        </div>
      </div>
      {/* Reviews CTA */}
      <div className="mt-4 p-4 bg-muted/50 rounded-xl">
        <div className="flex items-start space-x-3">
          <Icon name="Star" size={20} className="text-warning mt-0.5" />
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-1">Love Our Service?</h4>
            <p className="text-xs text-muted-foreground mb-2">
              Share your experience and help others discover Ready One Movers. Your reviews mean the world to us!
            </p>
            <button
              onClick={() => handleSocialClick('https://g.page/r/readyonemovers/review')}
              className="text-xs text-primary hover:text-primary/80 font-medium transition-colors duration-200"
            >
              Leave a Google Review →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialMedia;