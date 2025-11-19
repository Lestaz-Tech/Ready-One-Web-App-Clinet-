import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const AboutSection = () => {
  const milestones = [
  {
    year: "2019",
    title: "Company Founded",
    description: "Started with a vision to revolutionize moving services in Kenya"
  },
  {
    year: "2020",
    title: "First 100 Clients",
    description: "Achieved our first major milestone with exceptional service"
  },
  {
    year: "2022",
    title: "Nationwide Expansion",
    description: "Extended services to all 47 counties across Kenya"
  },
  {
    year: "2024",
    title: "500+ Happy Clients",
    description: "Celebrating over 500 successful moves and counting"
  }];


  const values = [
  {
    icon: "Heart",
    title: "Customer First",
    description: "Every decision we make prioritizes our customers\' needs and satisfaction."
  },
  {
    icon: "Shield",
    title: "Trust & Reliability",
    description: "Building lasting relationships through consistent, dependable service."
  },
  {
    icon: "Award",
    title: "Excellence",
    description: "Striving for perfection in every move, big or small."
  },
  {
    icon: "Users",
    title: "Team Spirit",
    description: "Working together to deliver exceptional moving experiences."
  }];


  return (
    <section className="py-16 lg:py-24 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main About Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              About Ready One Movers
            </h2>
            
            <p className="text-xl text-muted-foreground mb-6 leading-relaxed">
              Founded in 2019, Ready One Movers has grown to become Kenya's most trusted 
              moving company, serving clients across all 47 counties with professionalism and care.
            </p>

            <p className="text-muted-foreground mb-8 leading-relaxed">
              Our journey began with a simple mission: to make moving stress-free for every Kenyan. 
              Today, we're proud to have helped over 500 families and businesses relocate safely, 
              earning their trust through consistent quality service and transparent pricing.
            </p>

            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="text-center p-4 bg-card rounded-xl shadow-sm border border-border">
                <div className="text-3xl font-bold text-primary mb-2">500+</div>
                <div className="text-sm text-muted-foreground">Successful Moves</div>
              </div>
              <div className="text-center p-4 bg-card rounded-xl shadow-sm border border-border">
                <div className="text-3xl font-bold text-primary mb-2">5+</div>
                <div className="text-sm text-muted-foreground">Years Experience</div>
              </div>
              <div className="text-center p-4 bg-card rounded-xl shadow-sm border border-border">
                <div className="text-3xl font-bold text-primary mb-2">47</div>
                <div className="text-sm text-muted-foreground">Counties Covered</div>
              </div>
              <div className="text-center p-4 bg-card rounded-xl shadow-sm border border-border">
                <div className="text-3xl font-bold text-primary mb-2">24/7</div>
                <div className="text-sm text-muted-foreground">Customer Support</div>
              </div>
            </div>

            <Link to="/contact">
              <Button
                variant="default"
                size="lg"
                iconName="ArrowRight"
                iconPosition="right">

                Learn More About Us
              </Button>
            </Link>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative">

            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="https://res.cloudinary.com/dknnzeppw/image/upload/v1763448322/ready-one-movers-house-moves-3_fvxqym.jpg"
                alt="Ready One Movers team of professional African movers in orange uniforms standing proudly next to company truck"
                className="w-full h-[500px] object-cover" />

              
              {/* Overlay Card */}
              <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-sm rounded-xl p-6">
                <h4 className="text-lg font-semibold text-foreground mb-2">
                  Our Mission
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  To provide exceptional moving services that exceed expectations, 
                  making every relocation a positive experience for our clients across Kenya.
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Company Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20">

          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Our Journey
            </h3>
            <p className="text-muted-foreground text-lg">
              Key milestones in our growth as Kenya's premier moving company
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {milestones?.map((milestone, index) =>
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center">

                <div className="relative mb-6">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <span className="text-white font-bold text-lg">{milestone?.year}</span>
                  </div>
                  {index < milestones?.length - 1 &&
                <div className="hidden lg:block absolute top-8 left-1/2 w-full h-0.5 bg-border transform translate-x-8"></div>
                }
                </div>
                <h4 className="text-lg font-semibold text-foreground mb-2">
                  {milestone?.title}
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {milestone?.description}
                </p>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Company Values */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}>

          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Our Core Values
            </h3>
            <p className="text-muted-foreground text-lg">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values?.map((value, index) =>
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group text-center bg-card rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-border hover:border-primary/20">

                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                  <Icon
                  name={value?.icon}
                  size={28}
                  className="text-primary group-hover:text-white transition-colors duration-300" />

                </div>
                <h4 className="text-lg font-semibold text-foreground mb-3 group-hover:text-primary transition-colors duration-200">
                  {value?.title}
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {value?.description}
                </p>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-20 text-center">

          <div className="bg-gradient-to-r from-primary to-orange-600 rounded-2xl p-8 md:p-12">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Ready to Experience the Ready One Difference?
            </h3>
            <p className="text-white/90 mb-6 text-lg max-w-2xl mx-auto">
              Join hundreds of satisfied customers who trust us with their most important moves. 
              Let's make your next relocation seamless and stress-free.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/services">
                <Button
                  variant="secondary"
                  size="lg"
                  iconName="Truck"
                  iconPosition="left"
                  className="w-full sm:w-auto">

                  Book Your Move
                </Button>
              </Link>
              <Link to="/contact">
                <Button
                  variant="outline"
                  size="lg"
                  iconName="MessageCircle"
                  iconPosition="left"
                  className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-primary">

                  Get In Touch
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>);

};

export default AboutSection;