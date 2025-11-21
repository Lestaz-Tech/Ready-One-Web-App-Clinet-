import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../../components/AppIcon';
import Button from '../../../../components/ui/Button';
import CategoryCards from './CategoryCards';
import { SERVICES_DATA, CATEGORIES } from '../data/services';

const ServiceSelection = ({ onSelectService, onOpenComparison }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter services
  const filteredServices = useMemo(() => {
    return SERVICES_DATA.filter(service => {
      const matchesCategory = selectedCategory === 'All' || service.category === selectedCategory;
      const matchesSearch = service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           service.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="space-y-6 sm:space-y-8 md:space-y-10">
      {/* Category Cards - Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full"
      >
        <CategoryCards 
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
      </motion.div>

      {/* Search and Filter Bar */}
      <div className="bg-card border border-border rounded-2xl p-4 sm:p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
          <div className="md:col-span-2">
            <label className="block text-xs sm:text-sm font-semibold text-foreground mb-2">
              Search Services
            </label>
            <div className="relative">
              <Icon name="Search" size={18} className="absolute left-3 top-2.5 text-muted-foreground pointer-events-none" />
              <input
                type="text"
                placeholder="Search moving services..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 sm:py-2.5 rounded-lg border border-border bg-muted text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs sm:text-sm font-semibold text-foreground mb-2">
              Category
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg border border-border bg-muted text-foreground text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            >
              {CATEGORIES.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 ${
              selectedCategory === cat
                ? 'bg-primary text-white shadow-lg shadow-primary/30'
                : 'bg-muted text-foreground hover:bg-muted/80 border border-border/50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Services Grid */}
      <div className="space-y-4">
        {filteredServices.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
            {filteredServices.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-card border border-border rounded-xl sm:rounded-2xl overflow-hidden hover:shadow-lg hover:border-primary/50 transition-all duration-300 flex flex-col h-full"
              >
                {/* Service Image */}
                <div className="w-full h-32 sm:h-40 md:h-44 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center border-b border-border relative overflow-hidden group">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                  <div className="absolute bottom-2 left-2 bg-orange-500 rounded-full p-1.5 sm:p-2 shadow-lg">
                    <Icon name={service.icon} size={16} className="text-white" />
                  </div>
                </div>

                {/* Service Content */}
                <div className="p-3 sm:p-4 md:p-5 space-y-2 sm:space-y-3 flex-1 flex flex-col">
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-foreground">{service.title}</h3>
                    <p className="text-[10px] sm:text-xs text-primary font-semibold mb-1">{service.category}</p>
                    <p className="text-[10px] sm:text-xs text-muted-foreground line-clamp-2">{service.description}</p>
                  </div>

                  {/* Price */}
                  <div className="bg-muted/50 rounded-lg p-2 sm:p-3">
                    <p className="text-[10px] sm:text-xs text-muted-foreground">Starting Price</p>
                    <p className="text-lg sm:text-xl font-bold text-primary">KES {service.startingPrice.toLocaleString()}</p>
                    <p className="text-[10px] sm:text-xs text-muted-foreground">Up to KES {service.maxPrice.toLocaleString()}</p>
                  </div>

                  {/* Quick Info - Responsive Grid */}
                  <div className="grid grid-cols-2 gap-1.5 text-[10px] sm:text-xs">
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Icon name="Clock" size={12} className="flex-shrink-0" />
                      <span className="line-clamp-1">{service.duration}</span>
                    </div>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Icon name="Users" size={12} className="flex-shrink-0" />
                      <span className="line-clamp-1">{service.teamSize}</span>
                    </div>
                    <div className="flex items-center gap-1 text-muted-foreground col-span-2">
                      <Icon name="MapPin" size={12} className="flex-shrink-0" />
                      <span className="line-clamp-1">{service.coverage}</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-1.5 sm:gap-2 pt-2 sm:pt-3 border-t border-border mt-auto">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 text-[10px] sm:text-xs"
                      onClick={() => onOpenComparison(service.id)}
                      title="Add to comparison"
                    >
                      Compare
                    </Button>
                    <Button
                      variant="default"
                      size="sm"
                      className="flex-1 text-[10px] sm:text-xs"
                      onClick={() => onSelectService(service)}
                    >
                      Select
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-8 sm:py-12 md:py-16"
          >
            <Icon name="Search" size={48} className="mx-auto text-muted-foreground mb-3 sm:mb-4" />
            <p className="text-foreground font-semibold text-sm sm:text-base">No services found</p>
            <p className="text-muted-foreground text-xs sm:text-sm">Try adjusting your search or category filters</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ServiceSelection;
