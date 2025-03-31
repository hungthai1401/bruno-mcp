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
export declare const RunCollectionSchema: z.ZodObject<{
    collection: z.ZodString;
    environment: z.ZodOptional<z.ZodString>;
    variables: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
}, "strip", z.ZodTypeAny, {
    collection: string;
    environment?: string | undefined;
    variables?: string[] | undefined;
}, {
    collection: string;
    environment?: string | undefined;
    variables?: string[] | undefined;
}>;
export type RunCollectionParams = z.infer<typeof RunCollectionSchema>;
