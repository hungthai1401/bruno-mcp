import { promisify } from 'util';
import { exec } from 'child_process';
import { readFile } from 'fs/promises';
import { withReportFile } from './utils.js';
import { dirname, basename } from 'path';
const execAsync = promisify(exec);
// Regex to parse request summary
const REQUEST_SUMMARY_REGEX = /Requests:\s+(\d+)\s+passed,\s+(\d+)\s+failed,\s+(\d+)\s+total/;
export class BrunoRunner {
    async runCollection(params) {
        const startTime = new Date();
        return withReportFile('bruno-run-', '.json', async (outputFile) => {
            try {
                // Get collection directory and name
                const collectionDir = dirname(params.collection);
                const collectionName = basename(params.collection);
                // Build the command with arguments
                const args = ['cd', collectionDir, '&&', 'bru', 'run', `${collectionName}`];
                // Add environment if specified
                if (params.environment) {
                    args.push('--env', params.environment);
                }
                // Add environment variables if specified
                if (params.variables && params.variables.length > 0) {
                    for (const variable of params.variables) {
                        args.push('--env-var', variable);
                    }
                }
                // Add output file
                args.push('--reporter-json', outputFile);
                // Skip all headers
                args.push('--reporter-skip-all-headers');
                // Execute the command
                const command = args.join(' ');
                console.error('Running command:', command);
                try {
                    await execAsync(command);
                }
                catch (error) {
                    const cliError = error;
                    if (!cliError.stdout.match(REQUEST_SUMMARY_REGEX)) {
                        throw new Error(`CLI stderr: ${cliError.stderr || 'Unknown error'}`);
                    }
                }
                // Read the results from the output file
                const resultJson = await readFile(outputFile, 'utf-8');
                const endTime = new Date();
                const duration = endTime.getTime() - startTime.getTime();
                const jsonResult = JSON.parse(resultJson);
                const { summary, results = [] } = jsonResult[0];
                const isSuccess = summary.failedRequests === 0;
                // Transform CLI results into our standard format
                return {
                    success: isSuccess,
                    summary: {
                        total: summary.totalRequests || 0,
                        failed: summary.failedRequests || 0,
                        passed: summary.passedRequests || 0
                    },
                    failures: isSuccess ? [] : results.filter((result) => result.error).map((failure) => ({
                        name: failure.suitename || 'Unknown Test',
                        message: failure.error || 'Unknown error'
                    })),
                    timings: {
                        started: startTime.toISOString(),
                        completed: endTime.toISOString(),
                        duration
                    }
                };
            }
            catch (error) {
                console.error('Error running collection:', error);
                throw error;
            }
        });
    }
}
