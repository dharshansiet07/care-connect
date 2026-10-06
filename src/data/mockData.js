export const locationPresets = [
  { id: 'auto', name: 'Auto-Detect My Location', lat: null, lng: null },
  { id: 'coimbatore', name: 'Coimbatore, Tamil Nadu', lat: 11.0507, lng: 77.0374 },
  { id: 'chennai', name: 'Chennai, Tamil Nadu', lat: 13.0827, lng: 80.2707 },
  { id: 'bengaluru', name: 'Bengaluru, Karnataka', lat: 12.9716, lng: 77.5946 },
  { id: 'nyc', name: 'New York City, NY', lat: 40.7128, lng: -74.0060 }
];

export const specialtiesData = [
  { id: 'all', name: 'All Specialties', icon: 'fa-user-md' },
  { id: 'cardiology', name: 'Cardiology', icon: 'fa-heartbeat' },
  { id: 'neurology', name: 'Neurology', icon: 'fa-brain' },
  { id: 'pediatrics', name: 'Pediatrics', icon: 'fa-baby' },
  { id: 'dermatology', name: 'Dermatology', icon: 'fa-allergies' },
  { id: 'orthopedics', name: 'Orthopedics', icon: 'fa-bone' },
  { id: 'general', name: 'General Medicine', icon: 'fa-stethoscope' }
];

export const hospitalsData = [
  {
    id: 'hosp-kmch',
    city: 'coimbatore',
    name: 'KMCH Speciality Hospital & Heart Institute',
    type: 'Super Specialty & 24/7 Trauma Center',
    lat: 11.0507,
    lng: 77.0374,
    address: 'Avinashi Road, Civil Aerodrome Post, Coimbatore',
    distance: '0.8 km away',
    rating: 4.95,
    reviewsCount: 1240,
    emergency24x7: true,
    phone: '+91 422 432 3800',
    facilities: ['24/7 Emergency Trauma', 'Advanced Cath Lab', 'Robotic Surgery', 'Organ Transplant Unit', 'Pediatric ICU'],
    image: 'https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&w=600&q=80',
    doctors: [
      {
        id: 'doc-kmch-1',
        name: 'Dr. A. Subramanian, MD, DM',
        specialty: 'Cardiology',
        specialtyId: 'cardiology',
        experience: '22 Years Exp.',
        qualification: 'FRCP London & KMCH Heart Center',
        fee: '₹800',
        rating: 4.98,
        reviews: 310,
        avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=200&q=80',
        bio: 'Senior Director of Cardiology at KMCH Specializing in complex angioplasty, heart failure management, and preventive cardiac care.',
        availableSlots: ['09:00 AM', '11:30 AM', '02:00 PM', '04:30 PM']
      },
      {
        id: 'doc-kmch-2',
        name: 'Dr. Priya Sundaram, MD',
        specialty: 'General Medicine',
        specialtyId: 'general',
        experience: '12 Years Exp.',
        qualification: 'KMCH Medical College',
        fee: '₹500',
        rating: 4.88,
        reviews: 175,
        avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=200&q=80',
        bio: 'Chief Consultant in Internal Medicine focusing on comprehensive health checks, fever protocols, and metabolic health.',
        availableSlots: ['10:00 AM', '01:15 PM', '03:45 PM']
      }
    ]
  },
  {
    id: 'hosp-1',
    city: 'coimbatore',
    name: 'St. Jude Heart & Vascular Center',
    type: 'Super Specialty Hospital',
    lat: 11.0168,
    lng: 76.9558,
    address: 'Race Course Road, City Center, Coimbatore',
    distance: '2.1 km away',
    rating: 4.9,
    reviewsCount: 428,
    emergency24x7: true,
    phone: '+91 422 230 4050',
    facilities: ['24/7 ICU', 'Advanced Cath Lab', 'Emergency Trauma', 'Digital X-Ray'],
    image: 'https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&w=600&q=80',
    doctors: [
      {
        id: 'doc-101',
        name: 'Dr. Sarah Jenkins, MD',
        specialty: 'Cardiology',
        specialtyId: 'cardiology',
        experience: '14 Years Exp.',
        qualification: 'Harvard Medical Fellow',
        fee: '₹750',
        rating: 4.95,
        reviews: 184,
        avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=200&q=80',
        bio: 'Senior Cardiologist specializing in interventional cardiology, heart disease prevention, and cardiac rehabilitation.',
        availableSlots: ['09:30 AM', '11:00 AM', '02:30 PM', '04:15 PM']
      },
      {
        id: 'doc-102',
        name: 'Dr. Michael Chang, MD',
        specialty: 'General Medicine',
        specialtyId: 'general',
        experience: '9 Years Exp.',
        qualification: 'CMC Vellore Alumnus',
        fee: '₹450',
        rating: 4.8,
        reviews: 112,
        avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=200&q=80',
        bio: 'Compassionate general physician focusing on preventive care, routine health screenings, and hypertension management.',
        availableSlots: ['10:00 AM', '01:30 PM', '03:45 PM']
      }
    ]
  },
  {
    id: 'hosp-2',
    city: 'coimbatore',
    name: 'Metropolitan Neuro & Children’s Hospital',
    type: 'Multi-Specialty Center',
    lat: 11.0284,
    lng: 76.9634,
    address: 'DB Road, RS Puram, Coimbatore',
    distance: '3.4 km away',
    rating: 4.8,
    reviewsCount: 310,
    emergency24x7: true,
    phone: '+91 422 245 1200',
    facilities: ['Pediatric ICU', '3T MRI Suite', 'Neuro Rehabilitation', '24/7 Pharmacy'],
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=600&q=80',
    doctors: [
      {
        id: 'doc-103',
        name: 'Dr. Elena Rostova, MD',
        specialty: 'Neurology',
        specialtyId: 'neurology',
        experience: '16 Years Exp.',
        qualification: 'NIMHANS Specialist',
        fee: '₹900',
        rating: 4.9,
        reviews: 215,
        avatar: 'https://images.unsplash.com/photo-1594824813566-88855ce78947?auto=format&fit=crop&w=200&q=80',
        bio: 'Leading Neurologist expert in migraine therapy, epilepsy care, and neuro-diagnostic brain scans.',
        availableSlots: ['09:00 AM', '11:30 AM', '03:00 PM']
      },
      {
        id: 'doc-104',
        name: 'Dr. Marcus Vance, MD',
        specialty: 'Pediatrics',
        specialtyId: 'pediatrics',
        experience: '11 Years Exp.',
        qualification: 'Pediatric Care Specialist',
        fee: '₹500',
        rating: 4.92,
        reviews: 198,
        avatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=200&q=80',
        bio: 'Dedicated pediatrician offering newborn care, childhood vaccinations, and adolescent wellness guidance.',
        availableSlots: ['08:30 AM', '10:45 AM', '02:00 PM', '05:00 PM']
      }
    ]
  },
  {
    id: 'hosp-3',
    city: 'coimbatore',
    name: 'Apex Skin & Orthopedic Institute',
    type: 'Specialty Clinic',
    lat: 11.0012,
    lng: 76.9678,
    address: 'Trichy Road, Sungam, Coimbatore',
    distance: '4.2 km away',
    rating: 4.7,
    reviewsCount: 189,
    emergency24x7: false,
    phone: '+91 422 231 9900',
    facilities: ['Laser Derm Lab', 'Advanced Physiotherapy', 'Daycare Surgery Unit'],
    image: 'https://images.unsplash.com/photo-1512678080530-7760d81faba6?auto=format&fit=crop&w=600&q=80',
    doctors: [
      {
        id: 'doc-105',
        name: 'Dr. Chloe Bennett, MD',
        specialty: 'Dermatology',
        specialtyId: 'dermatology',
        experience: '8 Years Exp.',
        qualification: 'Dermato-Surgeon',
        fee: '₹600',
        rating: 4.85,
        reviews: 142,
        avatar: 'https://images.unsplash.com/photo-1651008376811-b90baee60c1f?auto=format&fit=crop&w=200&q=80',
        bio: 'Board-certified dermatologist specializing in cosmetic procedures, acne treatment, and skin oncology screenings.',
        availableSlots: ['10:15 AM', '01:00 PM', '04:30 PM']
      },
      {
        id: 'doc-106',
        name: 'Dr. Robert Thorne, MD',
        specialty: 'Orthopedics',
        specialtyId: 'orthopedics',
        experience: '18 Years Exp.',
        qualification: 'Joint Replacement Specialist',
        fee: '₹850',
        rating: 4.88,
        reviews: 260,
        avatar: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=200&q=80',
        bio: 'Orthopedic surgeon expert in knee & hip replacements, sports injury recovery, and joint arthroscopy.',
        availableSlots: ['09:00 AM', '12:00 PM', '03:30 PM']
      }
    ]
  },
  {
    id: 'hosp-chennai-apollo',
    city: 'chennai',
    name: 'Apollo Main Hospital & Heart Center',
    type: 'Multi-Specialty Super Specialty Hospital',
    lat: 13.0604,
    lng: 80.2496,
    address: 'Greams Road, Thousand Lights, Chennai, Tamil Nadu',
    distance: '1.2 km away',
    rating: 4.96,
    reviewsCount: 2450,
    emergency24x7: true,
    phone: '+91 44 2829 0200',
    facilities: ['24/7 Emergency & Cath Lab', 'Organ Transplant', 'Robotic Surgery', 'Pediatric ICU'],
    image: 'https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&w=600&q=80',
    doctors: [
      {
        id: 'doc-che-1',
        name: 'Dr. K. Rajesh, MD, DM',
        specialty: 'Cardiology',
        specialtyId: 'cardiology',
        experience: '24 Years Exp.',
        qualification: 'Chief Cardiologist, Apollo Chennai',
        fee: '₹900',
        rating: 4.98,
        reviews: 420,
        avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=200&q=80',
        bio: 'Renowned Interventional Cardiologist specializing in TAVI procedures, complex stents, and cardiac valve repairs.',
        availableSlots: ['09:00 AM', '11:00 AM', '02:30 PM', '05:00 PM']
      },
      {
        id: 'doc-che-2',
        name: 'Dr. Meera Natarajan, MD, DM',
        specialty: 'Neurology',
        specialtyId: 'neurology',
        experience: '18 Years Exp.',
        qualification: 'Senior Neuro Consultant',
        fee: '₹850',
        rating: 4.92,
        reviews: 285,
        avatar: 'https://images.unsplash.com/photo-1594824813566-88855ce78947?auto=format&fit=crop&w=200&q=80',
        bio: 'Senior Neurologist expert in stroke intervention, nerve disorders, and Parkinson’s disease management.',
        availableSlots: ['10:00 AM', '01:00 PM', '04:00 PM']
      }
    ]
  },
  {
    id: 'hosp-chennai-fortis',
    city: 'chennai',
    name: 'Fortis Malar Hospital & Bone Care',
    type: 'Super Specialty Hospital',
    lat: 13.0067,
    lng: 80.2572,
    address: '1st Main Road, Gandhi Nagar, Adyar, Chennai, Tamil Nadu',
    distance: '3.1 km away',
    rating: 4.88,
    reviewsCount: 1680,
    emergency24x7: true,
    phone: '+91 44 4289 2222',
    facilities: ['24/7 Trauma Care', 'Joint Replacement Unit', 'Pediatric ICU', 'Comprehensive MRI'],
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=600&q=80',
    doctors: [
      {
        id: 'doc-che-3',
        name: 'Dr. S. Balaji, MS, MCh',
        specialty: 'Orthopedics',
        specialtyId: 'orthopedics',
        experience: '20 Years Exp.',
        qualification: 'FRCS Orthopedics UK',
        fee: '₹800',
        rating: 4.91,
        reviews: 310,
        avatar: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=200&q=80',
        bio: 'Chief Orthopedic & Spine Surgeon specializing in robotic knee surgery and keyhole arthroscopy.',
        availableSlots: ['09:30 AM', '12:15 PM', '03:45 PM']
      },
      {
        id: 'doc-che-4',
        name: 'Dr. Anitha Vasanth, DCH, MD',
        specialty: 'Pediatrics',
        specialtyId: 'pediatrics',
        experience: '14 Years Exp.',
        qualification: 'Pediatric Specialist',
        fee: '₹600',
        rating: 4.89,
        reviews: 240,
        avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=200&q=80',
        bio: 'Senior Pediatrician with expertise in neonatal care, growth monitoring, and pediatric immunity.',
        availableSlots: ['10:30 AM', '02:00 PM', '05:15 PM']
      }
    ]
  },
  {
    id: 'hosp-blr-manipal',
    city: 'bengaluru',
    name: 'Manipal Super Specialty Hospital',
    type: 'Multi-Specialty Medical Center',
    lat: 12.9585,
    lng: 77.6482,
    address: 'HAL Old Airport Road, Kodihalli, Bengaluru, Karnataka',
    distance: '1.5 km away',
    rating: 4.94,
    reviewsCount: 3100,
    emergency24x7: true,
    phone: '+91 80 2502 4444',
    facilities: ['24/7 Emergency & Cath Lab', 'Robotic Surgery', 'Level 3 NICU', 'Dermato-Oncology'],
    image: 'https://images.unsplash.com/photo-1512678080530-7760d81faba6?auto=format&fit=crop&w=600&q=80',
    doctors: [
      {
        id: 'doc-blr-1',
        name: 'Dr. Vikram Hegde, MD, DM',
        specialty: 'Cardiology',
        specialtyId: 'cardiology',
        experience: '21 Years Exp.',
        qualification: 'Manipal Heart Institute Chief',
        fee: '₹850',
        rating: 4.97,
        reviews: 390,
        avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=200&q=80',
        bio: 'Senior Director of Cardiac Sciences specializing in coronary stenting, pacemaker implantation, and heart care.',
        availableSlots: ['09:00 AM', '11:30 AM', '02:00 PM', '04:30 PM']
      },
      {
        id: 'doc-blr-2',
        name: 'Dr. Sneha Reddy, MD',
        specialty: 'Dermatology',
        specialtyId: 'dermatology',
        experience: '11 Years Exp.',
        qualification: 'AIIMS Alumnus',
        fee: '₹650',
        rating: 4.87,
        reviews: 205,
        avatar: 'https://images.unsplash.com/photo-1651008376811-b90baee60c1f?auto=format&fit=crop&w=200&q=80',
        bio: 'Consultant Dermatologist specializing in laser skin care, allergy management, and trichology.',
        availableSlots: ['10:00 AM', '01:30 PM', '04:00 PM']
      }
    ]
  }
];

export const initialAppointments = [
  {
    id: 'apt-901',
    doctorName: 'Dr. A. Subramanian, MD, DM',
    specialty: 'Cardiology',
    hospitalName: 'KMCH Speciality Hospital & Heart Institute',
    date: 'Tomorrow, Aug 8',
    time: '11:00 AM',
    mode: 'Virtual Teleconsultation',
    status: 'Confirmed',
    statusClass: 'status-confirmed',
    fee: '₹800',
    avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 'apt-902',
    doctorName: 'Dr. Chloe Bennett, MD',
    specialty: 'Dermatology',
    hospitalName: 'Apex Skin & Orthopedic Institute',
    date: 'Aug 14, 2026',
    time: '01:00 PM',
    mode: 'In-Person Visit',
    status: 'Scheduled',
    statusClass: 'status-scheduled',
    fee: '₹600',
    avatar: 'https://images.unsplash.com/photo-1651008376811-b90baee60c1f?auto=format&fit=crop&w=200&q=80'
  }
];

export const aiResponsesDatabase = {
  chest_pain: {
    urgency: 'HIGH',
    badge: '🚨 URGENT / EMERGENCY',
    text: 'Chest pain or tightness, especially accompanied by shortness of breath, dizziness, or pain radiating to your jaw or left arm, can be a sign of a cardiac event. Please seek immediate emergency medical care (Call 108 / 911) or visit the KMCH ER.',
    recommendation: 'KMCH Speciality Hospital (24/7 ER & Cath Lab Available)'
  },
  headache: {
    urgency: 'MODERATE',
    badge: 'ℹ️ CONSULTATION RECOMMENDED',
    text: 'Persistent headaches or migraines may stem from stress, eye strain, or neurological factors. If accompanied by sudden vision loss or confusion, seek immediate medical care.',
    recommendation: 'Recommended Specialist: Dr. Elena Rostova (Neurology)'
  },
  skin_rash: {
    urgency: 'ROUTINE',
    badge: '✅ ROUTINE VISIT',
    text: 'Skin rashes or itchiness are commonly linked to allergic reactions, eczema, or contact dermatitis. Apply a cool compress and avoid scratching.',
    recommendation: 'Recommended Specialist: Dr. Chloe Bennett (Dermatology)'
  },
  fever: {
    urgency: 'ROUTINE',
    badge: '✅ ROUTINE VISIT',
    text: 'A mild fever with cough or fatigue is usually viral. Stay hydrated, rest, and monitor your temperature. If fever exceeds 102°F (38.9°C) for over 3 days, consult a physician.',
    recommendation: 'Recommended Specialist: Dr. Priya Sundaram / Dr. Michael Chang (General Medicine)'
  }
};
