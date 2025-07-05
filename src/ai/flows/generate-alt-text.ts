// The directive tells the Next.js runtime to execute this code on the server.
'use server';

/**
 * @fileOverview AI-powered alt text generator for portfolio images.
 *
 * - generateAltText - A function that generates alt text for images.
 * - GenerateAltTextInput - The input type for the generateAltText function.
 * - GenerateAltTextOutput - The return type for the generateAltText function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateAltTextInputSchema = z.object({
  imageDataUri: z
    .string()
    .describe(
      "The image to generate alt text for, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  imageDescription: z
    .string()
    .optional()
    .describe('Optional description of the image to provide additional context.'),
});
export type GenerateAltTextInput = z.infer<typeof GenerateAltTextInputSchema>;

const GenerateAltTextOutputSchema = z.object({
  altText: z.string().describe('The generated alt text for the image.'),
});
export type GenerateAltTextOutput = z.infer<typeof GenerateAltTextOutputSchema>;

export async function generateAltText(
  input: GenerateAltTextInput
): Promise<GenerateAltTextOutput> {
  return generateAltTextFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateAltTextPrompt',
  input: {schema: GenerateAltTextInputSchema},
  output: {schema: GenerateAltTextOutputSchema},
  prompt: `You are an expert in writing concise and descriptive alt text for images.

  Based on the image provided, generate alt text that accurately describes the image for visually impaired users and search engines.

  The alt text should be:
  - Descriptive: Clearly convey the content and purpose of the image.
  - Concise: Keep it short and to the point (ideally under 125 characters).
  - Relevant: Focus on the most important aspects of the image.
  - Accessible: Avoid jargon and use plain language.

  Here is the image:
  {{media url=imageDataUri}}

  {{#if imageDescription}}
  Here is some additional context about the image:
  {{imageDescription}}
  {{/if}}
  `,
});

const generateAltTextFlow = ai.defineFlow(
  {
    name: 'generateAltTextFlow',
    inputSchema: GenerateAltTextInputSchema,
    outputSchema: GenerateAltTextOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
