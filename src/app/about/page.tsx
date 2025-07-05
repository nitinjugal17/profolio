import Image from 'next/image';
import Link from 'next/link';
import { Download } from 'lucide-react';
import { getAboutMe, getSkills, getTestimonials } from '@/lib/data-loader';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export const metadata = {
  title: 'About Me | Profolio',
  description: 'Learn more about my background, skills, and professional journey.',
};

export default async function AboutPage() {
  const aboutMe = await getAboutMe();
  const skills = await getSkills();
  const testimonials = await getTestimonials();

  return (
    <div className="container mx-auto px-4 py-16 sm:py-24">
      <section className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center mb-24">
        <div className="md:col-span-1">
          <div className="relative aspect-square rounded-full overflow-hidden shadow-lg mx-auto w-2/3 md:w-full">
            <Image
              src={aboutMe.professionalPhotoUrl}
              alt="Professional Photo"
              fill
              className="object-cover"
              data-ai-hint="professional headshot"
            />
          </div>
        </div>
        <div className="md:col-span-2">
          <h1 className="font-headline text-4xl sm:text-5xl xl:text-6xl font-bold mb-4">About Me</h1>
          <p className="text-base md:text-lg text-muted-foreground mb-6">
            {aboutMe.narrative}
          </p>
          <div className="flex flex-wrap gap-4">
            {aboutMe.resumeUrl && (
              <Button asChild>
                <Link href={aboutMe.resumeUrl} target="_blank" download>
                  <Download className="mr-2 h-4 w-4" />
                  Download CV
                </Link>
              </Button>
            )}
            {aboutMe.briefResumeUrl && (
              <Button asChild variant="outline">
                <Link href={aboutMe.briefResumeUrl} target="_blank" download>
                  <Download className="mr-2 h-4 w-4" />
                  Download Brief
                </Link>
              </Button>
            )}
          </div>
        </div>
      </section>

      <section className="mb-24">
        <h2 className="font-headline text-3xl sm:text-4xl xl:text-5xl font-bold text-center mb-8">My Skills & Expertise</h2>
        <Card className="max-w-4xl mx-auto">
          <CardContent className="p-6">
            <div className="flex flex-wrap justify-center gap-3">
              {skills.map((skill) => (
                <Badge key={skill} variant="secondary" className="text-sm sm:text-base px-4 py-2">
                  {skill}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      <section>
        <h2 className="font-headline text-3xl sm:text-4xl xl:text-5xl font-bold text-center mb-12">Testimonials</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-card/80 flex">
              <CardContent className="p-6 flex flex-col">
                <blockquote className="text-sm md:text-base text-muted-foreground mb-4 italic flex-grow">"{testimonial.quote}"</blockquote>
                <div className="flex items-center gap-3 mt-auto">
                  <Avatar>
                    <AvatarImage src={testimonial.avatarUrl} alt={testimonial.name} />
                    <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-sm md:text-base">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
