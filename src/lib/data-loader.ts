import { promises as fs } from 'fs';
import path from 'path';

// Define interfaces for type safety
export interface CaseStudy {
  role: string;
  challenge: string;
  process: string;
  results: string;
}
export interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  images: string[];
  imageHint: string;
  caseStudy: CaseStudy;
}
export interface Testimonial {
  quote: string;
  name: string;
  title: string;
  avatarUrl: string;
}
export interface AboutMe {
  narrative: string;
  professionalPhotoUrl: string;
  resumeUrl: string;
  briefResumeUrl: string;
}
export interface Contact {
  email: string;
  phone: string;
  location: string;
}

export interface SiteSettings {
  logoUrl?: string;
  backgroundUrl?: string;
  showTestimonials: boolean;
  showFeaturedProjects: boolean;
  useAiForKeywords: boolean;
  navLinks: {
    href: string;
    label: string;
    hidden?: boolean;
  }[];
  socialLinks: {
    name: 'GitHub' | 'LinkedIn' | 'Twitter' | string;
    href: string;
  }[];
  homeHero: {
    headline: string;
    subheadline: string;
  };
}

export interface PortfolioData {
  siteSettings: SiteSettings;
  aboutMe: AboutMe;
  contact: Contact;
  skills: string[];
  portfolioItems: PortfolioItem[];
  testimonials: Testimonial[];
}

const dataFilePath = path.join(process.cwd(), 'src', 'lib', 'data.json');

// The result of this function will be cached by Next.js during the build process
// for static pages, and re-evaluated when a revalidation is triggered.
async function readData(): Promise<PortfolioData> {
  try {
    const fileContents = await fs.readFile(dataFilePath, 'utf8');
    return JSON.parse(fileContents);
  } catch (error) {
    console.error('Error reading or parsing data.json:', error);
    // If the file doesn't exist, we can create a default structure, but for now we throw.
    // This indicates a critical setup error.
    throw new Error('Could not load portfolio data. Make sure src/lib/data.json exists and is valid JSON.');
  }
}

export async function getPortfolioData(): Promise<PortfolioData> {
  return readData();
}
export async function getSiteSettings(): Promise<SiteSettings> {
  const { siteSettings } = await getPortfolioData();
  return siteSettings;
}
export async function getAboutMe(): Promise<AboutMe> {
  const { aboutMe } = await getPortfolioData();
  return aboutMe;
}
export async function getContact(): Promise<Contact> {
  const { contact } = await getPortfolioData();
  return contact;
}
export async function getSkills(): Promise<string[]> {
  const { skills } = await getPortfolioData();
  return skills;
}
export async function getPortfolioItems(): Promise<PortfolioItem[]> {
  const { portfolioItems } = await getPortfolioData();
  return portfolioItems;
}
export async function getPortfolioItem(id: string): Promise<PortfolioItem | undefined> {
  const items = await getPortfolioItems();
  return items.find((item) => item.id === id);
}
export async function getTestimonials(): Promise<Testimonial[]> {
  const { testimonials } = await getPortfolioData();
  return testimonials;
}
