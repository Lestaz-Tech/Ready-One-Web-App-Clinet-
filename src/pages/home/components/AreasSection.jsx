import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const AreasSection = () => {
  const regions = [
    {
      id: 1,
      name: "Nairobi Region",
      counties: ["Nairobi", "Kiambu", "Machakos", "Kajiado"],
      description: "Complete coverage of the capital and surrounding areas",
      icon: "Building2",
      color: "bg-primary"
    },
    {
      id: 2,
      name: "Central Kenya",
      counties: ["Nyeri", "Kirinyaga", "Murang\'a", "Nyandarua", "Laikipia"],
      description: "Serving the central highlands and agricultural regions",
      icon: "Mountain",
      color: "bg-success"
    },
    {
      id: 3,
      name: "Coast Region",
      counties: ["Mombasa", "Kilifi", "Kwale", "Tana River", "Lamu", "Taita-Taveta"],
      description: "Coastal counties and tourist destinations",
      icon: "Waves",
      color: "bg-blue-500"
    },
    {
      id: 4,
      name: "Western Kenya",
      counties: ["Kisumu", "Kakamega", "Vihiga", "Busia", "Siaya", "Bungoma"],
      description: "Lake Victoria region and western highlands",
      icon: "TreePine",
      color: "bg-emerald-500"
    },
    {
      id: 5,
      name: "Rift Valley",
      counties: ["Nakuru", "Eldoret", "Kericho", "Bomet", "Narok", "Kabarnet"],
      description: "Great Rift Valley and surrounding counties",
      icon: "MapPin",
      color: "bg-orange-500"
    },
    {
      id: 6,
      name: "Northern Kenya",
      counties: ["Meru", "Isiolo", "Marsabit", "Mandera", "Wajir", "Garissa"],
      description: "Northern frontier and arid regions",
      icon: "Sun",
      color: "bg-amber-500"
    }
  ];

  const stats = [
    { label: "Counties Covered", value: "47", icon: "MapPin" },
    { label: "Cities Served", value: "120+", icon: "Building" },
    { label: "Monthly Moves", value: "200+", icon: "Truck" },
    { label: "Service Areas", value: "1000+", icon: "Globe" }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Areas We Cover
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Nationwide moving services across all 47 counties in Kenya. 
            From urban centers to remote locations, we deliver everywhere.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {stats?.map((stat, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-card rounded-2xl p-6 text-center shadow-lg border border-border hover:shadow-xl transition-all duration-300"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Icon name={stat?.icon} size={24} className="text-primary" />
              </div>
              <div className="text-3xl font-bold text-foreground mb-2">{stat?.value}</div>
              <div className="text-sm text-muted-foreground font-medium">{stat?.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Regions Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
        >
          {regions?.map((region) => (
            <motion.div
              key={region?.id}
              variants={itemVariants}
              className="group bg-card rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-border hover:border-primary/20"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className={`w-12 h-12 ${region?.color} rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon name={region?.icon} size={24} className="text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-200">
                    {region?.name}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {region?.description}
                  </p>
                </div>
              </div>

              {/* Counties List */}
              <div className="space-y-2">
                <div className="text-sm font-medium text-foreground mb-2">Counties Covered:</div>
                <div className="flex flex-wrap gap-2">
                  {region?.counties?.map((county, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-muted rounded-full text-xs font-medium text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors duration-200 cursor-default"
                    >
                      {county}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Map Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-card rounded-2xl p-8 shadow-lg border border-border"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Interactive Service Map
            </h3>
            <p className="text-muted-foreground text-lg">
              Explore our service coverage across Kenya
            </p>
          </div>

          {/* Google Maps Embed */}
          <div className="relative w-full h-96 rounded-xl overflow-hidden shadow-lg">
            <iframe
              width="100%"
              height="100%"
              loading="lazy"
              title="Ready One Movers Service Areas in Kenya"
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps?q=-1.2921,36.8219&z=6&output=embed"
              className="border-0"
            ></iframe>
            
            {/* Overlay Info */}
            <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg p-4 shadow-lg">
              <div className="flex items-center gap-2 mb-2">
                <Icon name="MapPin" size={20} className="text-primary" />
                <span className="font-semibold text-foreground">Kenya Coverage</span>
              </div>
              <div className="text-sm text-muted-foreground">
                All 47 counties served
              </div>
            </div>
          </div>

          {/* Service Promise */}
          <div className="mt-8 text-center">
            <div className="bg-gradient-to-r from-primary/10 to-orange-500/10 rounded-xl p-6">
              <h4 className="text-xl font-semibold text-foreground mb-3">
                Nationwide Service Guarantee
              </h4>
              <p className="text-muted-foreground leading-relaxed">
                No matter where you're moving in Kenya, Ready One Movers has you covered. 
                From bustling cities to remote villages, we deliver professional moving services nationwide.
              </p>
              <div className="flex flex-wrap justify-center gap-6 mt-6 text-sm">
                <div className="flex items-center gap-2">
                  <Icon name="Check" size={16} className="text-success" />
                  <span className="text-muted-foreground">Same-day service in major cities</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="Check" size={16} className="text-success" />
                  <span className="text-muted-foreground">GPS tracking for all moves</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="Check" size={16} className="text-success" />
                  <span className="text-muted-foreground">Local partnerships nationwide</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AreasSection;