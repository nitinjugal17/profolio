import Link from 'next/link';
import { Github, Linkedin, Twitter, type LucideIcon } from 'lucide-react';
import { Logo } from '@/components/logo';
import { Button } from './ui/button';
import type { SiteSettings } from '@/lib/data-loader';

const iconMap: { [key: string]: LucideIcon } = {
  GitHub: Github,
  LinkedIn: Linkedin,
  Twitter: Twitter,
};


export function Footer({ settings }: { settings: SiteSettings }) {
  const { socialLinks, logoUrl } = settings;

  return (
    <footer className="bg-muted/90 mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <Link href="/" className="flex items-center gap-2 mb-4 md:mb-0">
            <Logo src={logoUrl} />
            <span className="font-bold font-headline">Profolio</span>
          </Link>
          <div className="flex items-center space-x-4">
            {socialLinks.map((social) => {
               const Icon = iconMap[social.name];
               if (!Icon) return null;
              return (
              <Button key={social.name} variant="ghost" size="icon" asChild>
                <Link href={social.href} target="_blank" rel="noopener noreferrer">
                  <Icon className="h-5 w-5" />
                  <span className="sr-only">{social.name}</span>
                </Link>
              </Button>
            )})}
          </div>
        </div>
        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p className="mb-2">&copy; {new Date().getFullYear()} Profolio. All Rights Reserved.</p>
          <Link href="/admin" className="hover:text-primary hover:underline">
            Content Management
          </Link>
        </div>
      </div>
    </footer>
  );
}
