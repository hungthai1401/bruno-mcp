import fs from "fs";
import path from "path";
import { promises as fsPromises } from "fs";

export async function withReportFile<T>(
  prefix: string,
  extension: string,
  callback: (filePath: string) => Promise<T>
): Promise<T> {
  const buildDir = path.join(process.cwd(), 'build', 'reports');
  
  // Create reports directory if it doesn't exist
  if (!fs.existsSync(buildDir)) {
    await fsPromises.mkdir(buildDir, { recursive: true });
  }

  const tempFile = path.join(buildDir, `${prefix}${Date.now()}${extension}`);
  
  try {
    return await callback(tempFile);
  } finally {
    // Clean up temp file
    try {
      await fsPromises.unlink(tempFile);
    } catch (error) {
      // Ignore errors during cleanup
    }
  }
} 