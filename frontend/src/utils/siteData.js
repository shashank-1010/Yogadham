export const PROGRAMS = [
  {
    id: 'hatha',
    name: 'Hatha Yoga Foundations',
    duration: '6 weeks',
    level: 'Beginner',
    description:
      'A grounded introduction to classical postures, breath control, and alignment — the traditional starting point for every Yogdham Sansthan student.',
  },
  {
    id: 'ashtanga',
    name: 'Ashtanga Yoga',
    duration: '8 weeks',
    level: 'Intermediate',
    description:
      'A dynamic, disciplined practice built on a fixed sequence of postures linked with breath — building strength, stamina, and focus for students ready to deepen their practice.',
  },
  {
    id: 'vinyasa',
    name: 'Vinyasa Flow',
    duration: '8 weeks',
    level: 'Intermediate',
    description:
      'Breath-linked, sequential movement that builds strength and stamina while keeping the mind anchored to each transition.',
  },
  {
    id: 'therapeutic',
    name: 'Therapeutic Yoga',
    duration: '10 weeks',
    level: 'All levels',
    description:
      'A gentle, restorative track designed with physiotherapy input for joint care, back pain, and post-injury recovery.',
  },
  {
    id: 'pranayama',
    name: 'Pranayama & Meditation',
    duration: '4 weeks',
    level: 'All levels',
    description:
      'Dedicated breathwork and seated meditation practice to build focus, calm the nervous system, and deepen self-awareness.',
  },
  {
    id: 'prenatal',
    name: 'Prenatal Yoga',
    duration: 'Ongoing',
    level: 'Expecting mothers',
    description:
      'Safe, trimester-adapted sequences supervised by trainers certified in prenatal care, focused on comfort and breath.',
  },
  {
    id: 'kids',
    name: "Children's Yoga",
    duration: '6 weeks',
    level: 'Ages 6–14',
    description:
      'Playful, story-led sessions that introduce young students to posture, balance, and stillness in a joyful setting.',
  },
  {
    id: 'postnatal',
    name: 'Postnatal Yoga',
    duration: 'Ongoing',
    level: 'New mothers',
    description:
      'Gentle recovery-focused sequences for new mothers, rebuilding core and pelvic-floor strength with trainer guidance at a safe, supportive pace.',
  },
];

export const WHY_CHOOSE_US = [
  {
    title: 'Certified Trainers',
    description: 'Every instructor is certified by recognised yoga boards with a minimum of 5 years teaching experience.',
  },
  {
    title: 'Traditional Method',
    description: 'Rooted in classical Hatha and Ashtanga lineage, taught with the discipline of a genuine gurukul.',
  },
  {
    title: 'Small Batch Sizes',
    description: 'Capped batch strength ensures individual correction and attention in every single class.',
  },
  {
    title: 'Holistic Wellness',
    description: 'Programs that address breath, posture, diet and mindfulness — not postures in isolation.',
  },
];

export const GALLERY_IMAGES = [
  {
    id: 1,
    src: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80',
    alt: 'Group yoga session at sunrise on an open lawn',
  },
  {
    id: 2,
    src: 'https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?auto=format&fit=crop&w=800&q=80',
    alt: 'Instructor guiding a student through a seated posture',
  },
  {
    id: 3,
    src: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80',
    alt: 'Yoga mats arranged in a quiet studio hall',
  },
  {
    id: 4,
    src: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800&q=80',
    alt: 'Close up of hands in prayer position during meditation',
  },
  {
    id: 5,
    src: 'https://images.unsplash.com/photo-1552196563-55cd4e45efb3?auto=format&fit=crop&w=800&q=80',
    alt: 'Outdoor group class practising a standing balance pose',
  },
  {
    id: 6,
    src: 'https://images.unsplash.com/photo-1573590330099-d6c7355ec595?auto=format&fit=crop&w=800&q=80',
    alt: 'Trainer demonstrating a posture for beginner students',
  },
  {
    id: 7,
    src: 'https://images.unsplash.com/photo-1588286840104-8957b019727f?auto=format&fit=crop&w=800&q=80',
    alt: 'Evening batch practising breathing exercises',
  },
  {
    id: 8,
    src: 'https://images.unsplash.com/photo-1607962837359-5e7e89f86776?auto=format&fit=crop&w=800&q=80',
    alt: 'Student in a seated twist pose against a plain backdrop',
  },
];

export const BATCH_OPTIONS = [
  'Early Morning (5:30 AM - 7:00 AM)',
  'Morning (7:30 AM - 9:00 AM)',
  'Evening (5:30 PM - 7:00 PM)',
  'Night (7:30 PM - 9:00 PM)',
];

// Whether the student wants a trainer to visit their home, or wants to
// join live over video call. Shown as a required choice on the
// registration form and visible to admins against every submission.
export const SESSION_TYPE_OPTIONS = [
  'Home Session',
  'Online Session',
];

// Single source of truth for the WhatsApp number — every WhatsApp link
// and displayed phone number on the site is built from this.
export const WHATSAPP_NUMBER = '917078456004';

export const WHATSAPP_DEFAULT_MESSAGE =
  "Hi Yogdham Sansthan, I'm interested in registering for a yoga session. Please share more details.";

// Builds a wa.me link that opens WhatsApp with the admin's number and a
// pre-filled message. Pass a custom message to override the default.
export const buildWhatsAppLink = (message = WHATSAPP_DEFAULT_MESSAGE) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

export const SOCIAL_LINKS = {
  facebook: 'https://facebook.com/yogdhamsansthan',
  instagram: 'https://instagram.com/yogdhamsansthan',
  youtube: 'https://youtube.com/@yogdhamsansthan',
  whatsapp: buildWhatsAppLink(),
};

export const CONTACT_INFO = {
  address: '14 Shanti Marg, Gomti Nagar, Lucknow, Uttar Pradesh 226010',
  phone: '+91 70784 56004',
  email: 'hello@yogdhamsansthan.com',
  hours: 'Mon – Sat: 5:30 AM – 9:00 PM',
};
