import { notFound } from 'next/navigation';
import Image from 'next/image';
import { getPortfolioItem, getPortfolioItems } from '@/lib/data-loader';
import { Badge } from '@/components/ui/badge';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { AltTextGenerator } from '@/components/alt-text-generator';
import { Card, CardContent } from '@/components/ui/card';

type Props = {
  params: { id: string };
};

export async function generateStaticParams() {
  const portfolioItems = await getPortfolioItems();
  return portfolioItems.map((item) => ({
    id: item.id,
  }));
}

export async function generateMetadata({ params }: Props) {
  const item = await getPortfolioItem(params.id);
  if (!item) {
    return { title: 'Project Not Found' };
  }
  return {
    title: `${item.title} | Profolio`,
    description: item.description,
  };
}

export default async function PortfolioItemPage({ params }: Props) {
  const item = await getPortfolioItem(params.id);

  if (!item) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-16 sm:py-24">
      <header className="mb-12">
        <h1 className="font-headline text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-bold mb-2">{item.title}</h1>
        <p className="text-base md:text-lg lg:text-xl text-muted-foreground">{item.description}</p>
      </header>

      <div className="mb-12">
        <Carousel className="w-full max-w-4xl mx-auto">
          <CarouselContent>
            {item.images.map((src, index) => (
              <CarouselItem key={index}>
                <div className="p-1">
                  <Card className="overflow-hidden">
                    <CardContent className="flex aspect-video items-center justify-center p-0">
                      <Image
                        src={src}
                        alt={`Image ${index + 1} for ${item.title}`}
                        width={1200}
                        height={800}
                        className="object-cover w-full h-full"
                        data-ai-hint={item.imageHint}
                      />
                    </CardContent>
                  </Card>
                   <AltTextGenerator imageUrl={src} imageDescription={`This is an image from the project titled: ${item.title}. The project is about: ${item.description}.`} />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="ml-14" />
          <CarouselNext className="mr-14" />
        </Carousel>
      </div>
      
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
            <h2 className="font-headline text-2xl md:text-3xl font-bold mb-4 border-b pb-2">Case Study</h2>
            <div className="space-y-6 text-sm md:text-base text-foreground/90">
                <div>
                    <h3 className="font-headline text-lg md:text-xl font-semibold mb-2 text-primary">My Role</h3>
                    <p>{item.caseStudy.role}</p>
                </div>
                <div>
                    <h3 className="font-headline text-lg md:text-xl font-semibold mb-2 text-primary">The Challenge</h3>
                    <p>{item.caseStudy.challenge}</p>
                </div>
                 <div>
                    <h3 className="font-headline text-lg md:text-xl font-semibold mb-2 text-primary">Process & Solution</h3>
                    <p>{item.caseStudy.process}</p>
                </div>
                <div>
                    <h3 className="font-headline text-lg md:text-xl font-semibold mb-2 text-primary">Results & Impact</h3>
                    <p>{item.caseStudy.results}</p>
                </div>
            </div>
        </div>
        <aside className="space-y-6">
             <Card>
                <CardContent className="pt-6">
                    <h3 className="font-headline text-lg md:text-xl font-semibold mb-4">Project Info</h3>
                    <div className="space-y-2 text-sm md:text-base">
                        <p><strong>Client:</strong> Fictional Corp</p>
                        <p><strong>Year:</strong> 2023</p>
                        <p><strong>Services:</strong> Web Development, UI/UX</p>
                    </div>
                </CardContent>
             </Card>
             <Card>
                <CardContent className="pt-6">
                    <h3 className="font-headline text-lg md:text-xl font-semibold mb-4">Technologies Used</h3>
                     <div className="flex flex-wrap gap-2">
                        <Badge>Next.js</Badge>
                        <Badge>React</Badge>
                        <Badge>TypeScript</Badge>
                        <Badge>Tailwind CSS</Badge>
                    </div>
                </CardContent>
            </Card>
        </aside>
      </div>

    </div>
  );
}
