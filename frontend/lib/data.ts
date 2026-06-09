export type Job = {
  title: string;
  slug: string;
  organization: string;
  category: string;
  type: string;
  state: string;
  vacancies: number;
  salary: string;
  lastDate: string;
  examDate?: string;
  score?: number;
  featured?: boolean;
};

export const jobs: Job[] = [
  {
    title: "SSC Combined Graduate Level Examination 2026",
    slug: "ssc-cgl-2026",
    organization: "Staff Selection Commission",
    category: "SSC",
    type: "Central Government",
    state: "All India",
    vacancies: 17727,
    salary: "Rs 25,500 - 1,51,100",
    lastDate: "2026-07-03",
    examDate: "2026-09-06",
    score: 96,
    featured: true
  },
  {
    title: "Railway Technician Grade I Signal 2026",
    slug: "railway-technician-grade-i-signal-2026",
    organization: "Indian Railways",
    category: "Railways",
    type: "Central Government",
    state: "All India",
    vacancies: 9144,
    salary: "Rs 19,900 - 63,200",
    lastDate: "2026-06-26",
    examDate: "2026-08-22",
    score: 91,
    featured: true
  },
  {
    title: "IBPS Probationary Officer 2026",
    slug: "ibps-po-2026",
    organization: "IBPS",
    category: "Banking",
    type: "Banking",
    state: "All India",
    vacancies: 4455,
    salary: "Rs 36,000 - 63,840",
    lastDate: "2026-07-06",
    examDate: "2026-08-17",
    score: 88,
    featured: true
  },
  {
    title: "BEL Project Engineer Recruitment 2026",
    slug: "bel-project-engineer-2026",
    organization: "Bharat Electronics Limited",
    category: "PSU",
    type: "PSU",
    state: "Karnataka",
    vacancies: 48,
    salary: "Rs 40,000 - 55,000",
    lastDate: "2026-06-28",
    score: 84
  }
];

export const categories = ["Central Government", "State Government", "Local Government", "Banking", "Railways", "Defence", "PSU", "Teaching"];

export const notifications = [
  "SSC CGL application deadline is approaching",
  "IBPS PO matches your Banking preference",
  "Railway Technician admit card window opens soon",
  "BEL Project Engineer shortlist expected this month"
];
