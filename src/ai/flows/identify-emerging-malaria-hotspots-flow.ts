'use server';
/**
 * @fileOverview A Genkit flow for identifying emerging malaria hotspots from reported incidents.
 *
 * - identifyEmergingMalariaHotspots - A function that analyzes malaria incidents and identifies potential hotspots.
 * - IdentifyEmergingMalariaHotspotsInput - The input type for the identifyEmergingMalariaHotspots function.
 * - IdentifyEmergingMalariaHotspotsOutput - The return type for the identifyEmergingMalariaHotspots function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

// Input Schema
const MalariaIncidentSchema = z.object({
  id: z.string().describe('Unique identifier for the incident.'),
  latitude: z.number().describe('Latitude of the incident location.'),
  longitude: z.number().describe('Longitude of the incident location.'),
  date: z.string().datetime().describe('Date and time of the incident in ISO 8601 format.'),
  caseCount: z.number().int().min(1).describe('Number of confirmed malaria cases in this incident report.'),
  area: z.string().optional().describe('Name of the area/region for the incident.'),
});

const IdentifyEmergingMalariaHotspotsInputSchema = z.object({
  malariaIncidents: z.array(MalariaIncidentSchema).describe('A list of recent malaria incidents, including location, date, and case count.'),
  timeframe: z.string().optional().describe('Optional: The timeframe for analysis (e.g., "last week", "last month").'),
});
export type IdentifyEmergingMalariaHotspotsInput = z.infer<typeof IdentifyEmergingMalariaHotspotsInputSchema>;

// Output Schema
const MalariaHotspotSchema = z.object({
  latitude: z.number().describe('Latitude of the identified hotspot.'),
  longitude: z.number().describe('Longitude of the identified hotspot.'),
  area: z.string().optional().describe('Name of the area/region identified as a hotspot.'),
  reason: z.string().describe('Brief explanation why this area is considered an emerging hotspot.'),
  severity: z.enum(['low', 'medium', 'high', 'critical']).describe('Severity level of the hotspot.'),
});

const IdentifyEmergingMalariaHotspotsOutputSchema = z.object({
  hotspots: z.array(MalariaHotspotSchema).describe('A list of identified emerging malaria hotspots.'),
  summary: z.string().describe('A brief textual summary of the detected trends and emerging hotspots.'),
});
export type IdentifyEmergingMalariaHotspotsOutput = z.infer<typeof IdentifyEmergingMalariaHotspotsOutputSchema>;

// Wrapper function
export async function identifyEmergingMalariaHotspots(input: IdentifyEmergingMalariaHotspotsInput): Promise<IdentifyEmergingMalariaHotspotsOutput> {
  return identifyEmergingMalariaHotspotsFlow(input);
}

// Prompt definition
const prompt = ai.definePrompt({
  name: 'identifyEmergingMalariaHotspotsPrompt',
  input: { schema: IdentifyEmergingMalariaHotspotsInputSchema },
  output: { schema: IdentifyEmergingMalariaHotspotsOutputSchema },
  prompt: `You are an expert public health analyst specializing in malaria epidemiology.\nYour task is to analyze a list of recent malaria incident reports to identify potential emerging hotspots and summarize the trends.\n\nConsider the following factors for identifying hotspots:\n- Clusters of incidents in close geographic proximity.\n- A sudden increase in case counts in a specific area compared to previous periods (if historical data or context were provided, otherwise infer from recent patterns).\n- The recency of the incidents.\n\nAnalyze the provided malaria incident data.\nIf a timeframe is provided, focus your analysis within that period.\nFor each identified hotspot, provide its latitude, longitude, area name (if available), a concise reason for its identification, and assign a severity level (low, medium, high, critical).\n\nFinally, provide a brief, professional textual summary of the overall detected trends and the identified emerging hotspots.\n\nMalaria Incidents ({{timeframe}}):\n{{#each malariaIncidents}}\n- ID: {{{this.id}}}, Latitude: {{{this.latitude}}}, Longitude: {{{this.longitude}}}, Date: {{{this.date}}}, Cases: {{{this.caseCount}}}, Area: {{{this.area}}}\n{{/each}}\n`,
});

// Flow definition
const identifyEmergingMalariaHotspotsFlow = ai.defineFlow(
  {
    name: 'identifyEmergingMalariaHotspotsFlow',
    inputSchema: IdentifyEmergingMalariaHotspotsInputSchema,
    outputSchema: IdentifyEmergingMalariaHotspotsOutputSchema,
  },
  async (input) => {
    // Call the prompt with the input.
    // The prompt handles the AI logic for identifying hotspots and generating a summary.
    const { output } = await prompt(input);
    return output!;
  }
);
