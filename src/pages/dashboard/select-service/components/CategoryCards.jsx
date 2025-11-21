import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../../components/AppIcon';
import { CATEGORIES_WITH_IMAGES } from '../data/services';

const CategoryCards = ({ selectedCategory, onSelectCategory }) => {
  return (
    <div className="w-full">
      <h2 className="text-lg sm:text-xl font-bold text-foreground mb-3 sm:mb-4">Select Move Type</h2>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-2 sm:gap-3 md:gap-4">
        {CATEGORIES_WITH_IMAGES.map((category, index) => (
          <motion.button
            key={category.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => onSelectCategory(category.label)}
            className={`relative group rounded-lg sm:rounded-xl overflow-hidden border-2 transition-all duration-300 ${
              selectedCategory === category.label
                ? 'border-primary shadow-lg shadow-primary/50'
                : 'border-border hover:border-primary/50'
            }`}
          >
            {/* Background Image */}
            <div className="absolute inset-0">
              <img
                src={category.image}
                alt={category.label}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
              {/* Fallback gradient if image fails */}
              <div className={`absolute inset-0 bg-gradient-to-br ${category.color}`}></div>
            </div>

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors duration-300"></div>

            {/* Content */}
            <div className="relative h-24 sm:h-32 md:h-40 flex flex-col items-center justify-center text-center px-2 sm:px-3 py-3 sm:py-4">
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.1 + 0.2 }}
                className={`mb-1.5 sm:mb-2 p-1.5 sm:p-2 rounded-full transition-colors duration-300 ${
                  selectedCategory === category.label
                    ? 'bg-primary/20'
                    : 'bg-white/10 group-hover:bg-white/20'
                }`}
              >
                <Icon
                  name={category.icon}
                  size={20}
                  className={`transition-colors duration-300 ${
                    selectedCategory === category.label ? 'text-primary' : 'text-white'
                  }`}
                />
              </motion.div>

              <h3 className="text-xs sm:text-sm md:text-base font-bold text-white mb-0.5 drop-shadow-lg">
                {category.label}
              </h3>
              <p className="text-[10px] sm:text-xs text-white/90 drop-shadow-lg line-clamp-1">
                {category.description}
              </p>

              {/* Selection Indicator */}
              {selectedCategory === category.label && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-1.5 sm:top-2 right-1.5 sm:right-2 w-4 sm:w-5 md:w-6 h-4 sm:h-5 md:h-6 bg-primary rounded-full flex items-center justify-center"
                >
                  <Icon name="Check" size={12} className="text-white" />
                </motion.div>
              )}
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default CategoryCards;
