export declare function withReportFile<T>(prefix: string, extension: string, callback: (filePath: string) => Promise<T>): Promise<T>;
