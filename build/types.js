import { z } from 'zod';
// Bruno Runner Types
export const RunCollectionSchema = z.object({
    collection: z.string().describe("Path to the Bruno collection"),
    environment: z.string().optional().describe("Optional path to environment file"),
    variables: z.array(z.string()).optional().describe("Optional environment variables"),
});
