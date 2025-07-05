import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <Skeleton className="h-14 w-1/2 mx-auto mb-4" />
        <Skeleton className="h-6 w-3/4 mx-auto" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(6)].map((_, i) => (
          <Card key={i} className="overflow-hidden">
            <CardHeader className="p-0">
              <Skeleton className="aspect-video w-full" />
            </CardHeader>
            <CardContent className="p-6">
              <Skeleton className="h-6 w-3/4 mb-2" />
              <Skeleton className="h-4 w-full mb-4" />
              <Skeleton className="h-5 w-1/3" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
