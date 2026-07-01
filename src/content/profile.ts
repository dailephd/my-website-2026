import { primaryCta, secondaryCta } from '@/content/links';
import type { ProfileContent } from '@/types/content';

export const profile: ProfileContent = {
  id: 'profile',
  name: 'Dai Le',
  shortName: 'Dai',
  headline: 'Software developer, AI model evaluation specialist, and biological scientist.',
  subheadline: 'Building software tools, AI workflows, and scientific computing solutions.',
  locationLabel: 'Corpus Christi, Texas',
  summary:
    'Dai Le is a software developer, AI model evaluation specialist, and biological scientist based in Corpus Christi, Texas.',
  intro:
    'Dai Le is a software developer, AI model evaluation specialist, and biological scientist based in Corpus Christi, Texas. He has an MS in Computer Science from Texas A&M University-Corpus Christi and a PhD in Biological Sciences from Korea Advanced Institute of Science and Technology.',
  professionalSummary:
    'Dai works across software development, AI model evaluation, scientific data annotation, biological research, data analysis, and custom computing services through dailephd LLC. His research background includes bacterial physiology, antibiotic response, drug-target kinetics, proton motive force, efflux-mediated drug resistance, gene expression under stress, retinal developmental biology, retinal pigment epithelium polarity, Notch signaling, and retinal axon growth.',
  aiComputingSummary:
    'Dai works on AI model evaluation, data annotation, software development, and custom computing services. He evaluates AI-generated responses for factual accuracy, scientific reasoning, hallucinations, instruction following, safety compliance, and domain-specific correctness. His computing background includes Python, R, JavaScript, TypeScript, React, Next.js, machine learning, data analysis, technical documentation, and AI-assisted workflows.',
  businessContext:
    'dailephd LLC provides custom computing services, with work interests in software tools, AI and data workflows, scientific computing, technical writing, and research-oriented computing support.',
  productLabStatement:
    'Technical projects in developer tooling, applied AI, and scientific software.',
  business: {
    name: 'dailephd LLC',
    description: 'Custom computing services - software, data, and AI.',
    founder: 'Dai Le',
  },
  primaryCta,
  secondaryCta,
  primaryLinks: [primaryCta, secondaryCta],
  technicalFocus: [
    {
      id: 'developer-tools',
      title: 'Developer tools',
      summary: 'Codebase intelligence and workflow tools that make technical work easier to inspect and validate.',
    },
    {
      id: 'applied-ai',
      title: 'AI model evaluation',
      summary: 'Evaluating AI-generated responses for factual accuracy, scientific reasoning, hallucinations, instruction following, and safety compliance.',
    },
    {
      id: 'scientific-software',
      title: 'Scientific software',
      summary: 'Software that translates research methods and complex evidence into usable technical systems.',
    },
  ],
  researchFocus: [
    {
      id: 'emory-research',
      title: 'Bacterial physiology - Emory University',
      summary:
        'At Emory University, Dai worked on quantitative bacterial physiology and antibiotic-response research involving E. coli and Pseudomonas aeruginosa. His work focused on how bacterial physiological state affects chemical and antibiotic stress response, including protonophore-mediated dissipation of proton motive force, efflux-mediated feedback, intracellular drug-target kinetics, and population-level variability.',
      areas: ['Bacterial physiology', 'Antibiotic response', 'Proton motive force', 'Efflux pumps', 'Drug-target kinetics'],
    },
    {
      id: 'kaist-research',
      title: 'Retinal developmental biology - KAIST',
      summary:
        'At KAIST, Dai worked on mouse retinal developmental biology, retinal pigment epithelium polarity, ESCRT-mediated protein trafficking, Notch signaling, retinal progenitor regulation, and Vax1-mediated retinal axon growth.',
      areas: ['Retinal developmental biology', 'Retinal pigment epithelium', 'Notch signaling', 'Retinal axon growth'],
    },
  ],
  education: [
    {
      id: 'ms-computer-science',
      degree: 'MS',
      field: 'Computer Science',
      institution: 'Texas A&M University-Corpus Christi',
      dateLabel: '2023 - 2025',
    },
    {
      id: 'phd-biological-sciences',
      degree: 'PhD',
      field: 'Biological Sciences',
      institution: 'Korea Advanced Institute of Science and Technology',
      dateLabel: '2010 - 2016',
    },
    {
      id: 'bs-biology',
      degree: 'BS',
      field: 'Biology',
      institution: 'Hanoi University of Science, Vietnam National University-Hanoi',
      dateLabel: '2006 - 2010',
    },
  ],
};
