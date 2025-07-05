'use client';

import { useState } from 'react';
import { Sparkles, Loader2, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { generateAltText } from '@/ai/flows/generate-alt-text';
import { getImageAsDataUri } from '@/actions/image';
import { useToast } from '@/hooks/use-toast';

interface AltTextGeneratorProps {
  imageUrl: string;
  imageDescription: string;
}

export function AltTextGenerator({ imageUrl, imageDescription }: AltTextGeneratorProps) {
  const [altText, setAltText] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleGenerate = async () => {
    setIsLoading(true);
    setError(null);
    setAltText(null);

    try {
      const dataUri = await getImageAsDataUri(imageUrl);
      if (!dataUri) {
        throw new Error('Failed to process image.');
      }

      const result = await generateAltText({
        imageDataUri: dataUri,
        imageDescription,
      });

      setAltText(result.altText);
      toast({
        title: "Alt Text Generated",
        description: "A new alt text has been created for the image.",
      })
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred.';
      setError(errorMessage);
      toast({
        variant: "destructive",
        title: "Generation Failed",
        description: errorMessage,
      })
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-2 p-3 border rounded-lg bg-muted/50 space-y-3">
      <Button onClick={handleGenerate} disabled={isLoading} size="sm">
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Generating...
          </>
        ) : (
          <>
            <Sparkles className="mr-2 h-4 w-4" />
            Generate AI Alt Text
          </>
        )}
      </Button>
      
      {altText && (
         <div className="p-3 rounded-md bg-background border border-green-200">
           <p className="text-sm font-semibold text-green-800">Generated Alt Text:</p>
           <p className="text-sm text-foreground italic">"{altText}"</p>
         </div>
      )}

      {error && (
        <div className="p-3 rounded-md bg-destructive/10 text-destructive flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 shrink-0" />
            <p className="text-sm font-medium">{error}</p>
        </div>
      )}
    </div>
  );
}
