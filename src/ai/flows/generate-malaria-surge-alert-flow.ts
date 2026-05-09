'use server';
/**
 * @fileOverview This file implements a Genkit flow for detecting unusual surges in malaria cases
 * and generating alerts for health authorities.
 *
 * - generateMalariaSurgeAlert - A function that triggers the flow to detect and alert on malaria surges.
 * - GenerateMalariaSurgeAlertInput - The input type for the generateMalariaSurgeAlert function.
 * - GenerateMalariaSurgeAlertOutput - The return type for the generateMalariaSurgeAlert function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateMalariaSurgeAlertInputSchema = z.object({
  regionName: z.string().describe('The name of the region being monitored.'),
  currentCases: z.number().int().positive().describe('The number of malaria cases reported in the current period for the region.'),
  historicalAverageCases: z.number().int().positive().describe('The historical average number of malaria cases for the region over a comparable period.'),
  surgeThresholdPercentage: z.number().min(0).describe('The percentage increase above the historical average that constitutes a surge (e.g., 20 for 20%).'),
});
export type GenerateMalariaSurgeAlertInput = z.infer<typeof GenerateMalariaSurgeAlertInputSchema>;

const GenerateMalariaSurgeAlertOutputSchema = z.object({
  surgeDetected: z.boolean().describe('True if a malaria case surge was detected based on the input data, false otherwise.'),
  alertMessage: z.string().describe('A concise and informative alert message if a surge is detected, otherwise an empty string.'),
});
export type GenerateMalariaSurgeAlertOutput = z.infer<typeof GenerateMalariaSurgeAlertOutputSchema>;

export async function generateMalariaSurgeAlert(input: GenerateMalariaSurgeAlertInput): Promise<GenerateMalariaSurgeAlertOutput> {
  return generateMalariaSurgeAlertFlow(input);
}

const generateMalariaSurgeAlertPrompt = ai.definePrompt({
  name: 'generateMalariaSurgeAlertPrompt',
  input: {schema: GenerateMalariaSurgeAlertInputSchema},
  output: {schema: GenerateMalariaSurgeAlertOutputSchema},
  prompt: `You are an AI assistant for health authorities. Your task is to analyze malaria incident data and determine if there is an unusual surge in cases in a specific region. If a surge is detected, generate a concise, informative alert message. Otherwise, indicate no surge and provide an empty alert message.

A surge is defined as the current number of cases exceeding the historical average by the specified threshold percentage.

Here is the data:
Current Cases in {{regionName}}: {{currentCases}}
Historical Average Cases in {{regionName}}: {{historicalAverageCases}}
Surge Threshold Percentage: {{surgeThresholdPercentage}}%

Based on this information:
1. Calculate if 'currentCases' is greater than 'historicalAverageCases * (1 + surgeThresholdPercentage / 100)'.
2. Set 'surgeDetected' to 'true' if a surge is detected, otherwise 'false'.
3. If 'surgeDetected' is 'true', generate an 'alertMessage' that includes the 'regionName', 'currentCases', and 'historicalAverageCases', clearly stating that a surge has been detected and prompt action is needed. The message should be concise and impactful.
4. If 'surgeDetected' is 'false', set 'alertMessage' to an empty string.`,
});

const generateMalariaSurgeAlertFlow = ai.defineFlow(
  {
    name: 'generateMalariaSurgeAlertFlow',
    inputSchema: GenerateMalariaSurgeAlertInputSchema,
    outputSchema: GenerateMalariaSurgeAlertOutputSchema,
  },
  async (input) => {
    const {output} = await generateMalariaSurgeAlertPrompt(input);
    return output!;
  }
);
