import { z } from 'zod';

export interface BrunoRunResult {
  success: boolean;
  summary: {
    total: number;
    failed: number;
    passed: number;
  };
  failures: Array<{
    name: string;
    message: string;
  }>;
  timings: {
    started: string;
    completed: string;
    duration: number;
  };
}

// Bruno Runner Types
export const RunCollectionSchema = z.object({
  collection: z.string().describe("Path to the Bruno collection"),
  environment: z.string().optional().describe("Optional path to environment file"),
  variables: z.array(z.string()).optional().describe("Optional environment variables"),
});

export type RunCollectionParams = z.infer<typeof RunCollectionSchema>;