
'use server';

import { promises as fs } from 'fs';
import path from 'path';
import matter from 'gray-matter';
import yaml from 'js-yaml';
import { revalidatePath } from 'next/cache';
import type { PortfolioData } from '@/lib/data-loader';

const dataFilePath = path.join(process.cwd(), 'src', 'lib', 'data.json');

function parseList(content: string, sectionName: string): any[] {
  try {
    if (content.trim() === '') return [];
    
    const items = content.split(/\n---\n/).filter(item => item.trim() !== '');
    return items.map((item, index) => {
      if (item.trim() === '') return null;
      const parsed = yaml.load(item);
      if (typeof parsed !== 'object' || parsed === null) {
        throw new Error(`Item #${index + 1} is not a valid YAML object.`);
      }
      return parsed;
    }).filter(item => item !== null);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown YAML parsing error.';
    console.error(`Failed to parse YAML for section '${sectionName}':`, error);
    throw new Error(`There was a problem parsing the '${sectionName}' section. Please check your YAML syntax. Details: ${errorMessage}`);
  }
}

export async function updateContent(formData: FormData) {
  // 1. Password verification
  const password = formData.get('password') as string;
  const serverPassword = process.env.CONTENT_UPDATE_PASSWORD;

  if (!serverPassword || serverPassword === "replace-with-your-secret-password" || serverPassword === "password") {
    return { success: false, message: 'Content update password is not configured on the server. Please set a secure password in the .env file.' };
  }
  if (password !== serverPassword) {
    return { success: false, message: 'Invalid password.' };
  }

  // 2. File handling
  const markdownFile = formData.get('file') as File | null;
  const resumeFile = formData.get('resumeFile') as File | null;
  const briefResumeFile = formData.get('briefResumeFile') as File | null;
  
  if (!markdownFile && !resumeFile && !briefResumeFile) {
    return { success: false, message: 'No files were uploaded.' };
  }
  
  let changesMade = false;

  try {
    const currentData = JSON.parse(await fs.readFile(dataFilePath, 'utf-8')) as PortfolioData;
    let newData = { ...currentData };

    // 3. Update Resume/CV files if provided
    if (resumeFile) {
      if (resumeFile.type !== 'application/pdf') return { success: false, message: 'Full resume must be a PDF file.' };
      const resumePath = path.join(process.cwd(), 'public', 'resume.pdf');
      await fs.writeFile(resumePath, Buffer.from(await resumeFile.arrayBuffer()));
      newData.aboutMe.resumeUrl = '/resume.pdf';
      changesMade = true;
    }
    
    if (briefResumeFile) {
      if (briefResumeFile.type !== 'application/pdf') return { success: false, message: 'Brief resume must be a PDF file.' };
      const briefResumePath = path.join(process.cwd(), 'public', 'brief-resume.pdf');
      await fs.writeFile(briefResumePath, Buffer.from(await briefResumeFile.arrayBuffer()));
      newData.aboutMe.briefResumeUrl = '/brief-resume.pdf';
      changesMade = true;
    }

    // 4. Update content from markdown file if provided
    if (markdownFile) {
      if (markdownFile.type !== 'text/markdown' && markdownFile.type !== 'text/plain' && !markdownFile.name.endsWith('.md') && !markdownFile.name.endsWith('.txt')) {
        return { success: false, message: 'Content file must be a .md or .txt file.' };
      }
      const markdownContent = await markdownFile.text();
      const { data: frontmatter, content } = matter(markdownContent);

      const sections = content.split(/^#\s(?!#)/gm).slice(1);
      const parsedSections: { [key: string]: any } = {};
      const providedSections = new Set<string>();

      sections.forEach(section => {
        const lines = section.trim().split('\n');
        const title = lines[0].trim().toLowerCase().replace(/\s+/g, '');
        providedSections.add(title);
        const sectionContent = lines.slice(1).join('\n').trim();

        if (title === 'skills') {
          parsedSections.skills = sectionContent ? sectionContent.split('\n').map(skill => skill.replace(/^- /, '').trim()).filter(Boolean) : [];
        } else if (title === 'testimonials') {
          parsedSections.testimonials = parseList(sectionContent, 'Testimonials');
        } else if (title === 'portfolioitems') {
          parsedSections.portfolioItems = parseList(sectionContent, 'Portfolio Items');
        }
      });
      
      const newSiteSettings = { ...newData.siteSettings };
      if (frontmatter.logoUrl !== undefined) newSiteSettings.logoUrl = frontmatter.logoUrl;
      if (frontmatter.backgroundUrl !== undefined) newSiteSettings.backgroundUrl = frontmatter.backgroundUrl;
      if (frontmatter.showTestimonials !== undefined) newSiteSettings.showTestimonials = frontmatter.showTestimonials;
      if (frontmatter.showFeaturedProjects !== undefined) newSiteSettings.showFeaturedProjects = frontmatter.showFeaturedProjects;
      if (frontmatter.useAiForKeywords !== undefined) newSiteSettings.useAiForKeywords = frontmatter.useAiForKeywords;
      if (frontmatter.navLinks) newSiteSettings.navLinks = frontmatter.navLinks;
      if (frontmatter.socialLinks) newSiteSettings.socialLinks = frontmatter.socialLinks;
      if (frontmatter.homeHero) newSiteSettings.homeHero = { ...newData.siteSettings.homeHero, ...frontmatter.homeHero };
      
      const newAboutMe = { ...newData.aboutMe };
      if (frontmatter.aboutMe?.narrative !== undefined) newAboutMe.narrative = frontmatter.aboutMe.narrative;
      if (frontmatter.aboutMe?.professionalPhotoUrl !== undefined) newAboutMe.professionalPhotoUrl = frontmatter.aboutMe.professionalPhotoUrl;
      
      const newContact = { ...newData.contact };
      if (frontmatter.contact?.email !== undefined) newContact.email = frontmatter.contact.email;
      if (frontmatter.contact?.phone !== undefined) newContact.phone = frontmatter.contact.phone;
      if (frontmatter.contact?.location !== undefined) newContact.location = frontmatter.contact.location;

      newData = {
        ...newData,
        siteSettings: newSiteSettings,
        aboutMe: newAboutMe,
        contact: newContact,
        skills: providedSections.has('skills') ? parsedSections.skills : newData.skills,
        testimonials: providedSections.has('testimonials') ? parsedSections.testimonials : newData.testimonials,
        portfolioItems: providedSections.has('portfolioitems') ? parsedSections.portfolioItems : newData.portfolioItems,
      };
      changesMade = true;
    }
    
    if (!changesMade) {
        return { success: false, message: 'No changes were detected. Please select a file to upload.' };
    }

    // 5. Write data and revalidate
    await fs.writeFile(dataFilePath, JSON.stringify(newData, null, 2), 'utf8');
    revalidatePath('/', 'layout');

    return { success: true, message: 'Content updated successfully! Changes will be live momentarily.' };
  } catch (error) {
    console.error('Failed to update content:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
    return { success: false, message: `Failed to update content: ${errorMessage}` };
  }
}
