// Mock service data with pricing and details
export const CATEGORIES_WITH_IMAGES = [
  {
    id: 'residential',
    label: 'Residential',
    icon: 'Home',
    description: 'House & Apartment Moves',
    image: 'https://res.cloudinary.com/dknnzeppw/image/upload/v1763447982/ready-one-movers-kenya-55_fd17mi.jpg',
    color: 'from-blue-500/20 to-blue-600/20'
  },
  {
    id: 'commercial',
    label: 'Commercial',
    icon: 'Building2',
    description: 'Office & Business Moves',
    image: 'https://res.cloudinary.com/dknnzeppw/image/upload/v1763448741/photo-1706689656095-168768dc20a5_iic430.jpg',
    color: 'from-purple-500/20 to-purple-600/20'
  },
  {
    id: 'specialized',
    label: 'Specialized',
    icon: 'Package',
    description: 'Furniture & Storage',
    image: 'https://res.cloudinary.com/dknnzeppw/image/upload/v1763632125/Storage-Unit-min-1024x576_zul8wk.jpg',
    color: 'from-orange-500/20 to-orange-600/20'
  }
];

export const SERVICES_DATA = [
  {
    id: 1,
    title: 'Bedsitter Moving',
    category: 'Residential',
    description: 'Perfect for small studio or bedsitter apartments. Our team efficiently handles compact moving spaces.',
    image: 'https://res.cloudinary.com/dknnzeppw/image/upload/v1763442345/house-movers-nairobi-13_bpsjdh.jpg',
    icon: 'Home',
    startingPrice: 3500,
    maxPrice: 7000,
    duration: '2-4 hours',
    teamSize: '2-3 people',
    coverage: 'Up to 5 km',
    included: [
      'Loading & unloading',
      'Basic packing materials',
      'Transportation',
      'Insurance cover'
    ],
    additionalServices: [
      { name: 'Packing service', price: 1500 },
      { name: 'Unpacking service', price: 1000 },
      { name: 'Furniture assembly', price: 2000 },
      { name: 'Extended distance (5-10km)', price: 2000 }
    ],
    notes: [
      'Best for studio/bedsitter apartments',
      'Quick turnaround - usually same day',
      'Our most popular choice'
    ]
  },
  {
    id: 2,
    title: '1 Bedroom Moving',
    category: 'Residential',
    description: 'Ideal for 1-bedroom apartments or studios. Efficient moving with moderate crew.',
    image: 'https://res.cloudinary.com/dknnzeppw/image/upload/v1763634850/575943404_cws0qw.jpg',
    icon: 'Home',
    startingPrice: 5500,
    maxPrice: 12000,
    duration: '4-6 hours',
    teamSize: '3-4 people',
    coverage: 'Up to 10 km',
    included: [
      'Loading & unloading',
      'Basic packing materials',
      'Transportation',
      'Insurance cover',
      'Furniture wrapping'
    ],
    additionalServices: [
      { name: 'Professional packing', price: 2500 },
      { name: 'Unpacking service', price: 1500 },
      { name: 'Furniture assembly', price: 3000 },
      { name: 'Extended distance (10-20km)', price: 3500 }
    ],
    notes: [
      'Standard moving package',
      'Includes basic wrapping',
      'Best value for single rooms'
    ]
  },
  {
    id: 3,
    title: '2 Bedroom Moving',
    category: 'Residential',
    description: 'Standard moving solution for 2-bedroom apartments or small houses.',
    image: 'https://res.cloudinary.com/dknnzeppw/image/upload/v1763635134/ready-one-movers-kenya-4_fz5gpi.jpg',
    icon: 'Home',
    startingPrice: 8500,
    maxPrice: 18000,
    duration: '6-8 hours',
    teamSize: '4-5 people',
    coverage: 'Up to 15 km',
    included: [
      'Loading & unloading',
      'Professional packing',
      'Transportation',
      'Insurance cover',
      'Furniture wrapping',
      'Basic cleaning'
    ],
    additionalServices: [
      { name: 'Full unpacking service', price: 3000 },
      { name: 'Furniture assembly', price: 4000 },
      { name: 'Extended distance (15-30km)', price: 5000 },
      { name: 'Storage (per day)', price: 500 }
    ],
    notes: [
      'Most popular choice',
      'Includes professional packing',
      'Extended coverage area'
    ]
  },
  {
    id: 4,
    title: '3 Bedroom Moving',
    category: 'Residential',
    description: 'Complete moving service for 3-bedroom homes. Comprehensive crew and equipment.',
    image: 'https://res.cloudinary.com/dknnzeppw/image/upload/v1763635270/ready-one-movers-kenya-43_y0qtyt.jpg',
    icon: 'Home',
    startingPrice: 12000,
    maxPrice: 25000,
    duration: '8-10 hours',
    teamSize: '5-6 people',
    coverage: 'Up to 20 km',
    included: [
      'Professional packing',
      'Loading & unloading',
      'Transportation',
      'Insurance cover',
      'Furniture wrapping',
      'Professional cleaning',
      'Debris removal'
    ],
    additionalServices: [
      { name: 'Full unpacking & arrangement', price: 5000 },
      { name: 'Furniture assembly', price: 6000 },
      { name: 'Long distance (20-50km)', price: 8000 },
      { name: 'Storage (per day)', price: 1000 }
    ],
    notes: [
      'Premium moving service',
      'Dedicated team leader',
      'Full coverage included'
    ]
  },
  {
    id: 5,
    title: 'Office Moving',
    category: 'Commercial',
    description: 'Professional office relocation with minimal downtime and secure data handling.',
    image: 'https://res.cloudinary.com/dknnzeppw/image/upload/v1763448741/photo-1706689656095-168768dc20a5_iic430.jpg',
    icon: 'Building2',
    startingPrice: 15000,
    maxPrice: 40000,
    duration: '4-12 hours',
    teamSize: '4-8 people',
    coverage: 'Up to 20 km',
    included: [
      'Professional packing',
      'Equipment dismantling',
      'Loading & unloading',
      'Transportation',
      'Insurance cover',
      'Setup at new location'
    ],
    additionalServices: [
      { name: 'IT equipment setup', price: 5000 },
      { name: 'Furniture assembly', price: 7000 },
      { name: 'After-hours moving', price: 10000 },
      { name: 'Extended distance (20-50km)', price: 10000 }
    ],
    notes: [
      'Secure & professional',
      'Minimal business disruption',
      'Equipment expertise'
    ]
  },
  {
    id: 6,
    title: 'Mansionette Moving',
    category: 'Residential',
    description: 'Specialized service for multi-level homes. Perfect for townhouses and mansionettes.',
    image: 'https://res.cloudinary.com/dknnzeppw/image/upload/v1763635399/ready-one-movers-house-moves-2_rqfqmw.jpg',
    icon: 'Home',
    startingPrice: 14000,
    maxPrice: 28000,
    duration: '8-12 hours',
    teamSize: '6-8 people',
    coverage: 'Up to 25 km',
    included: [
      'Professional packing',
      'Multi-level handling',
      'Loading & unloading',
      'Transportation',
      'Insurance cover',
      'Furniture wrapping',
      'Specialized equipment'
    ],
    additionalServices: [
      { name: 'Full arrangement service', price: 6000 },
      { name: 'Furniture assembly', price: 8000 },
      { name: 'Long distance (25-60km)', price: 12000 },
      { name: 'Premium storage', price: 2000 }
    ],
    notes: [
      'Multi-level expertise',
      'Specialized equipment',
      'Careful coordination'
    ]
  },
  {
    id: 7,
    title: 'Long Distance Moving',
    category: 'Commercial',
    description: 'Moving to a different city or far location. Secure, reliable inter-city transport.',
    image: 'https://res.cloudinary.com/dknnzeppw/image/upload/v1763635795/66228e4aa7684070f42bbdf3_long-distance-moving_cover_qhhbzs.webp',
    icon: 'MapPin',
    startingPrice: 20000,
    maxPrice: 60000,
    duration: 'Varies (1-3 days)',
    teamSize: '2-4 people',
    coverage: '50+ km',
    included: [
      'Professional packing',
      'Secure transportation',
      'GPS tracking',
      'Insurance cover',
      'Unloading service',
      'Driver accommodation'
    ],
    additionalServices: [
      { name: 'Full unpacking at destination', price: 5000 },
      { name: 'Furniture assembly', price: 7000 },
      { name: 'Multiple stops allowed', price: 3000 },
      { name: 'Storage at destination (per day)', price: 1500 }
    ],
    notes: [
      'Safe inter-city transport',
      'GPS tracking included',
      'Professional drivers'
    ]
  },
  {
    id: 8,
    title: 'Furniture Moving',
    category: 'Specialized',
    description: 'Specialized service for bulky furniture, pianos, safes, and antiques.',
    image: 'https://res.cloudinary.com/dknnzeppw/image/upload/v1763637748/ready-one-movers-kenya-36_svoncs.jpg',
    icon: 'Sofa',
    startingPrice: 4000,
    maxPrice: 15000,
    duration: '2-6 hours',
    teamSize: '2-4 people',
    coverage: 'Up to 15 km',
    included: [
      'Professional handling',
      'Protective wrapping',
      'Loading & unloading',
      'Transportation',
      'Insurance cover'
    ],
    additionalServices: [
      { name: 'Furniture restoration', price: 3000 },
      { name: 'Antique handling (premium)', price: 5000 },
      { name: 'Piano moving', price: 8000 },
      { name: 'Storage (climate controlled)', price: 2000 }
    ],
    notes: [
      'Specialist equipment',
      'Expert handling',
      'Premium care guaranteed'
    ]
  },
  {
    id: 9,
    title: 'Storage Solutions',
    category: 'Specialized',
    description: 'Secure storage facilities for your belongings. Climate-controlled and 24/7 monitored.',
    image: 'https://res.cloudinary.com/dknnzeppw/image/upload/v1763632125/Storage-Unit-min-1024x576_zul8wk.jpg',
    icon: 'BoxOpen',
    startingPrice: 2500,
    maxPrice: 8000,
    duration: 'Flexible (monthly)',
    teamSize: '1-2 people',
    coverage: 'Nairobi & environs',
    included: [
      'Secure storage unit',
      '24/7 security monitoring',
      'Climate control',
      'Insurance cover',
      'Easy access'
    ],
    additionalServices: [
      { name: 'Premium unit upgrade', price: 1500 },
      { name: 'Item tracking service', price: 1000 },
      { name: 'Packing service', price: 2000 },
      { name: 'Delivery to unit', price: 3000 }
    ],
    notes: [
      'Flexible short/long term',
      'Secure & climate controlled',
      'Affordable rates'
    ]
  }
];

export const CATEGORIES = ['All', 'Residential', 'Commercial', 'Specialized'];

export const calculatePrice = (service, floor = 0, additionalServices = []) => {
  let price = service.startingPrice;
  
  // Add floor level pricing (KES 500 per floor above ground)
  if (floor > 0) {
    price += floor * 500;
  }
  
  // Add additional services
  additionalServices.forEach(serviceId => {
    const addService = service.additionalServices?.find(s => s.name === serviceId);
    if (addService) {
      price += addService.price;
    }
  });
  
  return price;
};
