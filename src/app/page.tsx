import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, MessageCircle, AlertTriangle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getPortfolioItems, getTestimonials, getAboutMe, getSkills, getSiteSettings } from '@/lib/data-loader';
import { optimizeKeywords } from '@/ai/flows/optimize-keywords';

async function CoreCompetenciesSection() {
  const { useAiForKeywords } = await getSiteSettings();

  if (useAiForKeywords) {
    // AI-Powered Keywords Path
    if (!process.env.GOOGLE_API_KEY || process.env.GOOGLE_API_KEY === 'YOUR_API_KEY') {
      return (
        <div className="rounded-lg bg-muted p-6">
          <h3 className="font-headline text-2xl md:text-3xl font-semibold mb-4 text-center">AI Core Competencies</h3>
          <div className="flex w-full items-start gap-3 rounded-lg border border-yellow-200 bg-yellow-50 p-3 text-sm text-yellow-800 dark:border-yellow-800 dark:bg-yellow-950 dark:text-yellow-200">
            <AlertTriangle className="h-5 w-5 mt-0.5 shrink-0" />
            <p className="text-sm md:text-base">
              AI keyword generation is enabled in your settings, but your{' '}
              <code>GOOGLE_API_KEY</code> is missing. Please add it to the <code>.env</code> file or disable AI keywords in your content settings.
            </p>
          </div>
        </div>
      );
    }

    const aboutMe = await getAboutMe();
    const skills = await getSkills();
    const portfolioItems = await getPortfolioItems();

    const portfolioContent = `
      About Me: ${aboutMe.narrative}
      My Skills: ${skills.join(', ')}
      Projects: ${portfolioItems.map(p => `${p.title}: ${p.description}`).join('\n')}
    `;

    try {
      const { keywords } = await optimizeKeywords({ portfolioContent });
      if (!keywords || keywords.length === 0) return null;

      return (
        <div className="rounded-lg bg-muted p-6">
          <h3 className="font-headline text-2xl md:text-3xl font-semibold mb-4 text-center">AI-Generated Core Competencies</h3>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {keywords.map((keyword) => (
              <Badge key={keyword} variant="secondary" className="text-sm md:text-base">
                {keyword}
              </Badge>
            ))}
          </div>
        </div>
      );
    } catch (error) {
      console.error("Failed to fetch AI keywords:", error);
      return (
        <div className="rounded-lg bg-muted p-6">
          <h3 className="font-headline text-2xl md:text-3xl font-semibold mb-4 text-center">AI Core Competencies</h3>
          <div className="flex w-full items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-800 dark:border-red-800 dark:bg-red-950 dark:text-red-200">
            <AlertTriangle className="h-5 w-5 mt-0.5 shrink-0" />
            <p className="text-sm md:text-base">Failed to generate AI keywords. Please check the server logs for details.</p>
          </div>
        </div>
      );
    }
  } else {
    // Manual Skills Path
    const skills = await getSkills();
    if (!skills || skills.length === 0) {
      return (
        <div className="rounded-lg bg-muted p-6">
          <h3 className="font-headline text-2xl md:text-3xl font-semibold mb-4 text-center">Core Competencies</h3>
           <div className="text-center text-muted-foreground text-sm md:text-base">
             No skills listed. You can add them in the <strong># Skills</strong> section of your content file.
           </div>
        </div>
      );
    }

    return (
      <div className="rounded-lg bg-muted p-6">
        <h3 className="font-headline text-2xl md:text-3xl font-semibold mb-4 text-center">Core Competencies</h3>
        <div className="flex flex-wrap items-center justify-center gap-2">
          {skills.map((skill) => (
            <Badge key={skill} variant="secondary" className="text-sm md:text-base px-4 py-2">
              {skill}
            </Badge>
          ))}
        </div>
      </div>
    );
  }
}

export default async function Home() {
  const portfolioItems = await getPortfolioItems();
  const testimonials = await getTestimonials();
  const { showFeaturedProjects, showTestimonials, homeHero } = await getSiteSettings();

  const featuredProjects = portfolioItems.slice(0, 3);

  return (
    <div className="container mx-auto px-4 py-12 sm:py-16 md:py-24">
      <section className="text-center mb-24">
        <h1 className="font-headline text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 tracking-tighter">
          {homeHero.headline}
        </h1>
        <p className="max-w-3xl mx-auto text-base md:text-lg lg:text-xl text-muted-foreground mb-8">
          {homeHero.subheadline}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button asChild size="lg">
            <Link href="/portfolio">View My Work</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/contact">Get in Touch</Link>
          </Button>
        </div>
      </section>

      {showFeaturedProjects && portfolioItems.length > 0 && (
        <section id="portfolio" className="mb-24">
          <h2 className="font-headline text-3xl sm:text-4xl xl:text-5xl font-bold text-center mb-12">Featured Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map((item) => (
              <Card key={item.id} className="flex flex-col overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-xl">
                <CardHeader>
                  <div className="aspect-video relative">
                    <Image src={item.images[0]} alt={item.title} fill className="object-cover rounded-t-lg" data-ai-hint={item.imageHint} />
                  </div>
                </CardHeader>
                <CardContent className="flex-grow">
                  <h3 className="font-headline text-lg md:text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm sm:text-base text-muted-foreground line-clamp-3">{item.description}</p>
                </CardContent>
                <CardFooter>
                  <Button asChild variant="link" className="p-0 text-sm md:text-base">
                    <Link href={`/portfolio/${item.id}`}>View Case Study <ArrowRight className="ml-2 h-4 w-4" /></Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          <div className="text-center mt-12">
              <Button asChild size="lg" variant="secondary">
                  <Link href="/portfolio">See All Projects</Link>
              </Button>
          </div>
        </section>
      )}

      {showTestimonials && testimonials.length > 0 && (
        <section className="mb-24">
          <h2 className="font-headline text-3xl sm:text-4xl xl:text-5xl font-bold text-center mb-12">What Clients Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-card/80">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <MessageCircle className="w-8 h-8 text-accent shrink-0 mt-1" />
                    <div>
                      <blockquote className="text-sm sm:text-base text-muted-foreground mb-4 italic">"{testimonial.quote}"</blockquote>
                      <div className="flex items-center gap-3">
                          <Avatar>
                              <AvatarImage src={testimonial.avatarUrl} alt={testimonial.name} />
                              <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                              <p className="font-semibold text-sm md:text-base">{testimonial.name}</p>
                              <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                          </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}
      
      <section>
        <CoreCompetenciesSection />
      </section>
    </div>
  );
}
