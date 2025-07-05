'use server';

/**
 * @fileOverview This file contains the Genkit flow for optimizing keywords in a portfolio.
 *
 * - optimizeKeywords - A function that takes portfolio content as input and returns a list of optimized keywords.
 * - OptimizeKeywordsInput - The input type for the optimizeKeywords function.
 * - OptimizeKeywordsOutput - The return type for the optimizeKeywords function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const OptimizeKeywordsInputSchema = z.object({
  portfolioContent: z
    .string()
    .describe('The text content of the portfolio to analyze for keywords.'),
});
export type OptimizeKeywordsInput = z.infer<typeof OptimizeKeywordsInputSchema>;

const OptimizeKeywordsOutputSchema = z.object({
  keywords: z
    .array(z.string())
    .describe('An array of relevant keywords extracted from the portfolio content.'),
});
export type OptimizeKeywordsOutput = z.infer<typeof OptimizeKeywordsOutputSchema>;

export async function optimizeKeywords(input: OptimizeKeywordsInput): Promise<OptimizeKeywordsOutput> {
  return optimizeKeywordsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'optimizeKeywordsPrompt',
  input: {schema: OptimizeKeywordsInputSchema},
  output: {schema: OptimizeKeywordsOutputSchema},
  prompt: `You are an SEO expert. Analyze the following portfolio content and extract the most relevant keywords for search engine optimization. Return a list of keywords as an array of strings.

Portfolio Content: {{{portfolioContent}}}`,
});

const optimizeKeywordsFlow = ai.defineFlow(
  {
    name: 'optimizeKeywordsFlow',
    inputSchema: OptimizeKeywordsInputSchema,
    outputSchema: OptimizeKeywordsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
