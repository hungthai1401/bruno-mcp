import { Server } from "@modelcontextprotocol/sdk/server/index.js";
export declare class BrunoServer {
    private server;
    private runner;
    constructor();
    private setupTools;
    start(): Promise<Server>;
}
