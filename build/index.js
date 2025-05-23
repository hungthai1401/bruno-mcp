#!/usr/bin/env node
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { BrunoServer } from './server.js';
async function main() {
    try {
        const brunoServer = new BrunoServer();
        const server = await brunoServer.start();
        const transport = new StdioServerTransport();
        await server.connect(transport);
        console.error("Bruno MCP Server running on stdio");
        // Handle cleanup on exit
        process.on('SIGINT', async () => {
            await server.close();
            process.exit(0);
        });
        process.on('SIGTERM', async () => {
            await server.close();
            process.exit(0);
        });
    }
    catch (error) {
        console.error("Fatal error in main():", error);
        process.exit(1);
    }
}
main().catch(error => {
    console.error('Failed to start server:', error);
    process.exit(1);
});
