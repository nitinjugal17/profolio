import { ContactForm } from '@/components/contact-form';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Mail, Phone, MapPin, Download } from 'lucide-react';
import { getContact, getAboutMe } from '@/lib/data-loader';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export const metadata = {
  title: 'Contact Me | Profolio',
  description: 'Get in touch for collaborations, inquiries, or just to say hello.',
};

export default async function ContactPage() {
  const contact = await getContact();
  const aboutMe = await getAboutMe();

  return (
    <div className="container mx-auto px-4 py-16 sm:py-24">
      <div className="text-center mb-12">
        <h1 className="font-headline text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-bold mb-4">Get In Touch</h1>
        <p className="max-w-2xl mx-auto text-base md:text-lg text-muted-foreground">
          Have a project in mind or just want to connect? I'd love to hear from you. Fill out the form below or reach out through my contact details.
        </p>
      </div>

      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <Card>
            <CardHeader>
                <CardTitle>Send a Message</CardTitle>
                <CardDescription>I'll get back to you as soon as possible.</CardDescription>
            </CardHeader>
            <CardContent>
                <ContactForm />
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
              <CardDescription>Find me through the following channels.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <Mail className="h-5 w-5 text-primary" />
                <a href={`mailto:${contact.email}`} className="text-sm md:text-base text-muted-foreground hover:text-primary">
                  {contact.email}
                </a>
              </div>
              <div className="flex items-center gap-4">
                <Phone className="h-5 w-5 text-primary" />
                <span className="text-sm md:text-base text-muted-foreground">{contact.phone}</span>
              </div>
              <div className="flex items-center gap-4">
                <MapPin className="h-5 w-5 text-primary" />
                <span className="text-sm md:text-base text-muted-foreground">{contact.location}</span>
              </div>
            </CardContent>
          </Card>
          
          {(aboutMe.resumeUrl || aboutMe.briefResumeUrl) && (
            <Card>
              <CardHeader>
                <CardTitle>My Resume</CardTitle>
                <CardDescription>Get a copy of my professional resume.</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-3">
                {aboutMe.resumeUrl && (
                  <Button asChild className="w-full">
                    <Link href={aboutMe.resumeUrl} target="_blank" download>
                      <Download className="mr-2 h-4 w-4" />
                      Download Full CV
                    </Link>
                  </Button>
                )}
                {aboutMe.briefResumeUrl && (
                  <Button asChild variant="secondary" className="w-full">
                    <Link href={aboutMe.briefResumeUrl} target="_blank" download>
                      <Download className="mr-2 h-4 w-4" />
                      Download Brief
                    </Link>
                  </Button>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
