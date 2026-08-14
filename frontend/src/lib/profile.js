// profile.js — every piece of hand-written content on the site lives here.
// Editing your bio, skills, links, or timeline is a one-file job: change it
// below and every page that uses it updates.

export const PROFILE = {
  name: 'Abd-alrhman Odeh',
  role: 'Cybersecurity student & software builder',
  location: 'Memphis, TN',
  school: 'University of Memphis',
  status: 'Open to Summer 2027 internships',
  tagline:
    'Junior studying Cybersecurity at the University of Memphis. I build web apps, network tooling, and security projects, and I like shipping them, not just prototyping them.',
}

export const SOCIALS = [
  { id: 'github', label: 'GitHub', href: 'https://github.com/NOKIA05' },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/abd-alrhamn-odeh-397236338/',
  },
  { id: 'email', label: 'Email', href: 'mailto:abdelrahmanodeh50@gmail.com' },
]

// Small stat strip under the hero
export const STATS = [
  { value: 'Junior', label: 'Cybersecurity, U of M' },
  { value: '6+', label: 'Languages & frameworks' },
  { value: 'Amman → Memphis', label: 'Where I started / where I am' },
]

// About page — each entry is one card
export const ABOUT_SECTIONS = [
  {
    label: 'Who I am',
    text: "My name is Abd-alrhman Odeh. I was born and raised in Amman, Jordan, where I lived until I graduated high school. After that I moved to the United States to study Cybersecurity, and I'm now a junior at the University of Memphis.",
  },
  {
    label: 'What I do',
    text: "I study cybersecurity and build things on the side. Network tools, web apps, or just tinkering with code. I like seeing an idea go from a blank file to something running. This portfolio is one of those projects.",
  },
  {
    label: 'How I work',
    text: "I'd rather understand why something works than memorize the steps. That means I read the docs, break the thing on purpose, and keep the moving parts small enough to reason about.",
  },
  {
    label: 'Outside of tech',
    text: "When I'm not studying or coding you'll find me gaming, reading, or exploring whatever's around me. I picked up reading not long ago and it's been a good way to slow down.",
  },
]

// Skills page — each group becomes a card, each skill a pill
export const SKILL_GROUPS = [
  {
    label: 'Languages',
    hint: 'What I write day to day',
    skills: ['Python', 'JavaScript', 'SQL', 'HTML', 'CSS', 'Ruby'],
  },
  {
    label: 'Frameworks & libraries',
    hint: 'The tools I reach for first',
    skills: [
      'React',
      'Tailwind CSS',
      'Framer Motion',
      'React Router',
      'Flask',
      'SQLAlchemy',
      'Scapy',
    ],
  },
  {
    label: 'Data & backend',
    hint: 'Where the state lives',
    skills: ['Supabase', 'PostgreSQL', 'REST APIs', 'Row Level Security', 'Auth'],
  },
  {
    label: 'Tools & platforms',
    hint: 'Ship, host, debug',
    skills: ['Git', 'GitHub', 'Linux', 'Vercel', 'Vite', 'VS Code'],
  },
  {
    label: 'Cybersecurity',
    hint: 'The degree, applied',
    skills: [
      'Network Security',
      'Packet Analysis',
      'Wireshark',
      'Threat Modeling',
    ],
  },
]

// About page timeline
export const TIMELINE = [
  {
    period: 'Now',
    title: 'B.S. Cybersecurity, University of Memphis',
    detail: 'Junior. Coursework in networking, systems, and secure development.',
  },
  {
    period: 'Ongoing',
    title: 'Building side projects',
    detail:
      'Full-stack web apps and network tooling. React on the front, Supabase and Python behind it.',
  },
  {
    period: 'Before',
    title: 'Amman, Jordan',
    detail: 'Born and raised there through high school, then moved to the U.S.',
  },
]
