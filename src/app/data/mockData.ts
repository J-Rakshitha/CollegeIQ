export interface College {
  id: string;
  name: string;
  location: string;
  city: string;
  state: string;
  establishedYear: number;
  type: 'Government' | 'Private' | 'Deemed';
  accreditation: string[];
  ranking: {
    nirf: number;
    overall: number;
  };
  fees: {
    min: number;
    max: number;
    currency: string;
  };
  placements: {
    averagePackage: number;
    highestPackage: number;
    placementRate: number;
    topRecruiters: string[];
  };
  courses: string[];
  facilities: string[];
  rating: number;
  reviewCount: number;
  imageUrl: string;
  logoUrl: string;
  description: string;
  highlights: string[];
  roi: number;
}

export interface Review {
  id: string;
  collegeId: string;
  userName: string;
  userBatch: string;
  userCourse: string;
  verified: boolean;
  rating: number;
  date: string;
  ratings: {
    placements: number;
    faculty: number;
    infrastructure: number;
    campus: number;
    hostel: number;
  };
  pros: string[];
  cons: string[];
  comment: string;
  helpful: number;
}

export const mockColleges: College[] = [
  {
    id: '1',
    name: 'Indian Institute of Technology Delhi',
    location: 'Hauz Khas, New Delhi',
    city: 'New Delhi',
    state: 'Delhi',
    establishedYear: 1961,
    type: 'Government',
    accreditation: ['NAAC A++', 'NBA', 'AICTE'],
    ranking: {
      nirf: 2,
      overall: 1,
    },
    fees: {
      min: 200000,
      max: 250000,
      currency: 'INR',
    },
    placements: {
      averagePackage: 1800000,
      highestPackage: 25000000,
      placementRate: 95,
      topRecruiters: ['Google', 'Microsoft', 'Amazon', 'Goldman Sachs'],
    },
    courses: ['B.Tech', 'M.Tech', 'Ph.D', 'MBA'],
    facilities: ['Library', 'Hostel', 'Sports Complex', 'Labs', 'Cafeteria'],
    rating: 4.6,
    reviewCount: 1243,
    imageUrl: 'https://images.unsplash.com/photo-1562774053-701939374585?w=800',
    logoUrl: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200',
    description: 'IIT Delhi is one of the premier engineering institutes in India, known for its excellence in technical education and research.',
    highlights: [
      'Top 2 in NIRF Engineering Rankings',
      'World-class faculty and infrastructure',
      'Strong industry connections',
      'Excellent placement records'
    ],
    roi: 9.2,
  },
  {
    id: '2',
    name: 'Birla Institute of Technology and Science, Pilani',
    location: 'Pilani, Rajasthan',
    city: 'Pilani',
    state: 'Rajasthan',
    establishedYear: 1964,
    type: 'Deemed',
    accreditation: ['NAAC A', 'AICTE'],
    ranking: {
      nirf: 25,
      overall: 18,
    },
    fees: {
      min: 450000,
      max: 500000,
      currency: 'INR',
    },
    placements: {
      averagePackage: 1600000,
      highestPackage: 18000000,
      placementRate: 92,
      topRecruiters: ['Microsoft', 'Amazon', 'Oracle', 'Adobe'],
    },
    courses: ['B.E', 'M.E', 'M.Sc', 'Ph.D', 'MBA'],
    facilities: ['Library', 'Hostel', 'Sports', 'Innovation Center', 'Labs'],
    rating: 4.5,
    reviewCount: 892,
    imageUrl: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800',
    logoUrl: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200',
    description: 'BITS Pilani is a prestigious deemed university known for its quality education and innovative teaching methods.',
    highlights: [
      'Flexible course structure',
      'Strong alumni network',
      'Research-focused curriculum',
      'Industry-oriented programs'
    ],
    roi: 3.5,
  },
  {
    id: '3',
    name: 'National Institute of Technology Trichy',
    location: 'Tiruchirappalli, Tamil Nadu',
    city: 'Tiruchirappalli',
    state: 'Tamil Nadu',
    establishedYear: 1964,
    type: 'Government',
    accreditation: ['NAAC A++', 'NBA'],
    ranking: {
      nirf: 9,
      overall: 10,
    },
    fees: {
      min: 150000,
      max: 200000,
      currency: 'INR',
    },
    placements: {
      averagePackage: 1400000,
      highestPackage: 15000000,
      placementRate: 90,
      topRecruiters: ['TCS', 'Infosys', 'Wipro', 'Google'],
    },
    courses: ['B.Tech', 'M.Tech', 'M.Sc', 'Ph.D', 'MBA'],
    facilities: ['Central Library', 'Hostels', 'Sports Complex', 'Gym', 'Medical Center'],
    rating: 4.4,
    reviewCount: 756,
    imageUrl: 'https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=800',
    logoUrl: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200',
    description: 'NIT Trichy is one of the top NITs in India, offering excellent engineering education with strong placement support.',
    highlights: [
      'Top 10 NIRF ranking',
      'Affordable fees structure',
      'Beautiful campus',
      'Strong technical clubs'
    ],
    roi: 8.5,
  },
  {
    id: '4',
    name: 'Vellore Institute of Technology',
    location: 'Vellore, Tamil Nadu',
    city: 'Vellore',
    state: 'Tamil Nadu',
    establishedYear: 1984,
    type: 'Private',
    accreditation: ['NAAC A++', 'NBA'],
    ranking: {
      nirf: 15,
      overall: 13,
    },
    fees: {
      min: 195000,
      max: 300000,
      currency: 'INR',
    },
    placements: {
      averagePackage: 850000,
      highestPackage: 12000000,
      placementRate: 88,
      topRecruiters: ['TCS', 'Cognizant', 'Accenture', 'Capgemini'],
    },
    courses: ['B.Tech', 'M.Tech', 'MCA', 'MBA', 'Integrated Programs'],
    facilities: ['Digital Library', 'Hostels', 'Sports Facilities', 'Medical Center', 'Food Courts'],
    rating: 4.3,
    reviewCount: 2341,
    imageUrl: 'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=800',
    logoUrl: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200',
    description: 'VIT is a leading private university known for its industry-oriented curriculum and excellent infrastructure.',
    highlights: [
      'Large student community',
      'International collaborations',
      'Modern infrastructure',
      'Active placement cell'
    ],
    roi: 3.8,
  },
  {
    id: '5',
    name: 'SRM Institute of Science and Technology',
    location: 'Kattankulathur, Chennai',
    city: 'Chennai',
    state: 'Tamil Nadu',
    establishedYear: 1985,
    type: 'Private',
    accreditation: ['NAAC A++', 'NBA'],
    ranking: {
      nirf: 32,
      overall: 28,
    },
    fees: {
      min: 250000,
      max: 350000,
      currency: 'INR',
    },
    placements: {
      averagePackage: 750000,
      highestPackage: 10000000,
      placementRate: 85,
      topRecruiters: ['Infosys', 'Wipro', 'TCS', 'Amazon'],
    },
    courses: ['B.Tech', 'M.Tech', 'BBA', 'MBA', 'Medical Programs'],
    facilities: ['Library', 'Hostels', 'Sports Complex', 'Hospital', 'Shopping Complex'],
    rating: 4.2,
    reviewCount: 1876,
    imageUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800',
    logoUrl: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200',
    description: 'SRM is a multi-disciplinary university with a focus on research and innovation in various fields.',
    highlights: [
      'Diverse course offerings',
      'Strong research focus',
      'International exposure',
      'Good campus facilities'
    ],
    roi: 2.8,
  },
  {
    id: '6',
    name: 'Delhi Technological University',
    location: 'Shahbad Daulatpur, Delhi',
    city: 'New Delhi',
    state: 'Delhi',
    establishedYear: 1941,
    type: 'Government',
    accreditation: ['NAAC A+', 'NBA'],
    ranking: {
      nirf: 36,
      overall: 35,
    },
    fees: {
      min: 120000,
      max: 180000,
      currency: 'INR',
    },
    placements: {
      averagePackage: 1200000,
      highestPackage: 14000000,
      placementRate: 87,
      topRecruiters: ['Samsung', 'Adobe', 'American Express', 'Qualcomm'],
    },
    courses: ['B.Tech', 'M.Tech', 'MBA', 'Ph.D'],
    facilities: ['Central Library', 'Boys Hostel', 'Girls Hostel', 'Sports Facilities', 'Auditorium'],
    rating: 4.3,
    reviewCount: 945,
    imageUrl: 'https://images.unsplash.com/photo-1564981797816-1043664bf78d?w=800',
    logoUrl: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200',
    description: 'DTU is a premier engineering college in Delhi with a strong legacy and excellent faculty.',
    highlights: [
      'Located in capital city',
      'Affordable fees',
      'Good placement opportunities',
      'Active student clubs'
    ],
    roi: 7.2,
  },
];

export const mockReviews: Review[] = [
  {
    id: '1',
    collegeId: '1',
    userName: 'Rahul Sharma',
    userBatch: '2020-2024',
    userCourse: 'B.Tech Computer Science',
    verified: true,
    rating: 4.5,
    date: '2024-03-15',
    ratings: {
      placements: 5,
      faculty: 4,
      infrastructure: 5,
      campus: 5,
      hostel: 4,
    },
    pros: [
      'Excellent faculty with industry experience',
      'World-class infrastructure and labs',
      'Amazing placement opportunities',
      'Strong alumni network'
    ],
    cons: [
      'High competition',
      'Stressful environment at times',
      'Limited seats available'
    ],
    comment: 'IIT Delhi has been an incredible journey. The faculty is top-notch, and the opportunities for research and placements are unmatched. The campus life is vibrant with numerous clubs and events throughout the year.',
    helpful: 234,
  },
  {
    id: '2',
    collegeId: '1',
    userName: 'Priya Malhotra',
    userBatch: '2019-2023',
    userCourse: 'B.Tech Electrical Engineering',
    verified: true,
    rating: 4.8,
    date: '2024-02-20',
    ratings: {
      placements: 5,
      faculty: 5,
      infrastructure: 5,
      campus: 4,
      hostel: 4,
    },
    pros: [
      'Best in class education',
      'Excellent placement support',
      'Research opportunities',
      'Great peer group'
    ],
    cons: [
      'Expensive mess food',
      'Limited hostel facilities for girls'
    ],
    comment: 'One of the best decisions of my life. The learning environment is exceptional and prepares you well for both industry and higher studies.',
    helpful: 189,
  },
  {
    id: '3',
    collegeId: '2',
    userName: 'Aditya Gupta',
    userBatch: '2020-2024',
    userCourse: 'B.E Computer Science',
    verified: true,
    rating: 4.3,
    date: '2024-03-10',
    ratings: {
      placements: 4,
      faculty: 5,
      infrastructure: 4,
      campus: 5,
      hostel: 3,
    },
    pros: [
      'Flexible course structure',
      'Freedom in choosing courses',
      'Great campus culture',
      'Strong coding culture'
    ],
    cons: [
      'High fees compared to IITs/NITs',
      'Strict attendance policy',
      'Hostel food could be better'
    ],
    comment: 'BITS Pilani offers a unique learning experience with its flexible curriculum. The peer group is amazing and you learn a lot from your batchmates.',
    helpful: 156,
  },
  {
    id: '4',
    collegeId: '4',
    userName: 'Sneha Reddy',
    userBatch: '2021-2025',
    userCourse: 'B.Tech CSE with Specialization',
    verified: true,
    rating: 4.1,
    date: '2024-01-25',
    ratings: {
      placements: 4,
      faculty: 4,
      infrastructure: 5,
      campus: 4,
      hostel: 4,
    },
    pros: [
      'Beautiful campus',
      'Good infrastructure',
      'Lots of cultural events',
      'Diverse student community'
    ],
    cons: [
      'Large batch size',
      'Variation in faculty quality',
      'Mass recruiting companies'
    ],
    comment: 'VIT provides a good balance of academics and extracurriculars. The campus is huge and has all modern facilities. Placement support is decent.',
    helpful: 98,
  },
];

export const placementTrends = [
  { year: '2020', average: 1200000, highest: 18000000, placementRate: 88 },
  { year: '2021', average: 1350000, highest: 20000000, placementRate: 90 },
  { year: '2022', average: 1500000, highest: 22000000, placementRate: 91 },
  { year: '2023', average: 1650000, highest: 24000000, placementRate: 93 },
  { year: '2024', average: 1800000, highest: 25000000, placementRate: 95 },
];

export const topCompanies = [
  { name: 'Google', hires: 45, avgPackage: 4500000 },
  { name: 'Microsoft', hires: 52, avgPackage: 4200000 },
  { name: 'Amazon', hires: 68, avgPackage: 3800000 },
  { name: 'Goldman Sachs', hires: 32, avgPackage: 5200000 },
  { name: 'Adobe', hires: 28, avgPackage: 3600000 },
  { name: 'Oracle', hires: 41, avgPackage: 3200000 },
  { name: 'Samsung', hires: 35, avgPackage: 2800000 },
  { name: 'Qualcomm', hires: 24, avgPackage: 3400000 },
];

export const popularCourses = [
  { name: 'Computer Science & Engineering', colleges: 245, avgFees: 250000 },
  { name: 'Electronics & Communication', colleges: 198, avgFees: 220000 },
  { name: 'Mechanical Engineering', colleges: 312, avgFees: 200000 },
  { name: 'Civil Engineering', colleges: 276, avgFees: 180000 },
  { name: 'Electrical Engineering', colleges: 189, avgFees: 210000 },
  { name: 'Information Technology', colleges: 156, avgFees: 240000 },
];
