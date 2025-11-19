import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const WhyChooseUsSection = () => {
  const benefits = [
  {
    id: 1,
    icon: "Shield",
    title: "Fully Licensed & Insured",
    description: "Complete protection for your belongings with comprehensive insurance coverage and proper licensing."
  },
  {
    id: 2,
    icon: "Users",
    title: "Experienced Team",
    description: "Professional movers with 5+ years of experience handling all types of moves across Kenya."
  },
  {
    id: 3,
    icon: "Clock",
    title: "Punctual Service",
    description: "We value your time. Our team arrives on schedule and completes moves within agreed timeframes."
  },
  {
    id: 4,
    icon: "DollarSign",
    title: "Transparent Pricing",
    description: "No hidden fees or surprise charges. Get upfront pricing with detailed cost breakdowns."
  },
  {
    id: 5,
    icon: "Headphones",
    title: "24/7 Customer Support",
    description: "Round-the-clock support via phone, WhatsApp, and email for all your moving needs."
  },
  {
    id: 6,
    icon: "MapPin",
    title: "Nationwide Coverage",
    description: "Serving all 47 counties in Kenya with reliable local and long-distance moving services."
  }];


  const testimonials = [
  {
    id: 1,
    name: "Sarah Wanjiku",
    location: "Nairobi to Mombasa",
    rating: 5,
    comment: "Excellent service! They moved my 3-bedroom house safely and on time. Highly recommend Ready One Movers.",
    avatar: "https://www.shutterstock.com/image-photo/young-beautiful-kenyan-lady-mid-260nw-2566518051.jpg",
    avatarAlt: "Professional African woman with short hair smiling confidently in business attire"
  },
  {
    id: 2,
    name: "James Kiprotich",
    location: "Office Relocation, Eldoret",
    rating: 5,
    comment: "Professional team handled our office move perfectly. No damage and minimal downtime. Great job!",
    avatar: "https://antonytrivet.co.ke/wp-content/uploads/2019/07/Antony-Trivet-Photography_Lugo-Collection_Kenyan-Men-Suits-3.jpg",
    avatarAlt: "Confident African businessman in navy suit with warm smile in modern office setting"
  },
  {
    id: 3,
    name: "Grace Achieng",
    location: "Kisumu to Nakuru",
    rating: 5,
    comment: "Very careful with fragile items. The team was courteous and efficient. Will use them again!",
    avatar: "https://images.unsplash.com/photo-1623744085797-476edd413e2b",
    avatarAlt: "Young African woman with natural hair wearing colorful traditional dress smiling warmly"
  }];


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
    <section className="py-16 lg:py-24 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16">

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Why Choose Ready One Movers?
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            We're Kenya's trusted moving partner, committed to making your relocation 
            stress-free with professional service and care.
          </p>
        </motion.div>

        {/* Benefits Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">

          {benefits?.map((benefit) =>
          <motion.div
            key={benefit?.id}
            variants={itemVariants}
            className="group bg-card rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-border hover:border-primary/20">

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                  <Icon
                  name={benefit?.icon}
                  size={24}
                  className="text-primary group-hover:text-white transition-colors duration-300" />

                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-200">
                    {benefit?.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {benefit?.description}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Testimonials Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12">

          <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            What Our Clients Say
          </h3>
          <p className="text-muted-foreground text-lg">
            Real feedback from satisfied customers across Kenya
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {testimonials?.map((testimonial) =>
          <motion.div
            key={testimonial?.id}
            variants={itemVariants}
            className="bg-card rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-border">

              {/* Rating */}
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial?.rating)]?.map((_, index) =>
              <Icon key={index} name="Star" size={16} className="text-warning fill-current" />
              )}
              </div>

              {/* Comment */}
              <p className="text-muted-foreground mb-6 leading-relaxed italic">
                "{testimonial?.comment}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full overflow-hidden">
                  <Image
                  src={testimonial?.avatar}
                  alt={testimonial?.avatarAlt}
                  className="w-full h-full object-cover" />

                </div>
                <div>
                  <div className="font-semibold text-foreground">{testimonial?.name}</div>
                  <div className="text-sm text-muted-foreground">{testimonial?.location}</div>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-16 text-center">

          <div className="bg-card rounded-2xl p-8 shadow-lg border border-border">
            <h4 className="text-xl font-semibold text-foreground mb-6">
              Trusted & Certified
            </h4>
            <div className="flex flex-wrap justify-center items-center gap-8 text-muted-foreground">
              <div className="flex items-center gap-2">
                <Icon name="Award" size={20} className="text-primary" />
                <span className="text-sm font-medium">Licensed Moving Company</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="Shield" size={20} className="text-primary" />
                <span className="text-sm font-medium">Fully Insured</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="CheckCircle" size={20} className="text-primary" />
                <span className="text-sm font-medium">BBB Accredited</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="Users" size={20} className="text-primary" />
                <span className="text-sm font-medium">500+ Happy Clients</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>);

};

export default WhyChooseUsSection;