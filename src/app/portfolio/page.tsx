import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { getPortfolioItems } from '@/lib/data-loader';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'Portfolio | Profolio',
  description: 'Explore a collection of my best work and case studies.',
};

export default async function PortfolioPage() {
  const portfolioItems = await getPortfolioItems();

  return (
    <div className="container mx-auto px-4 py-16 sm:py-24">
      <div className="text-center mb-12">
        <h1 className="font-headline text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-bold mb-4">My Work</h1>
        <p className="max-w-2xl mx-auto text-base md:text-lg text-muted-foreground">
          Here is a selection of projects that showcase my skills and experience. Dive into the case studies to learn more about my process.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {portfolioItems.map((item) => (
          <Link href={`/portfolio/${item.id}`} key={item.id} className="group block">
            <Card className="h-full overflow-hidden transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1">
              <CardHeader className="p-0">
                <div className="aspect-video relative overflow-hidden">
                  <Image
                    src={item.images[0]}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    data-ai-hint={item.imageHint}
                  />
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <h2 className="font-headline text-lg md:text-xl font-semibold mb-2">{item.title}</h2>
                <p className="text-sm md:text-base text-muted-foreground mb-4 line-clamp-2">{item.description}</p>
                <div className="text-sm md:text-base font-semibold text-primary inline-flex items-center">
                  View Case Study
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
