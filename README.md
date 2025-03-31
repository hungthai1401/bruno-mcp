# Bruno MCP Server

An MCP (Model Context Protocol) server that enables running Bruno collections. This server allows LLMs to execute API tests using Bruno and get detailed results through a standardized interface.

## Features

* Run Bruno collections using the Bruno CLI
* Support for environment files
* Support for environment variables
* Detailed test results including:
  * Overall success/failure status
  * Test summary (total, passed, failed)
  * Detailed failure information
  * Execution timings

## Installation

### Prerequisites

- Node.js >= 16
- npm >= 8
- [Bruno CLI](https://www.usebruno.com/) installed globally

### Steps

```bash
# Clone the repository
git clone https://github.com/yourusername/bruno-mcp.git
cd bruno-mcp

# Install dependencies
npm install

# Build the project
npm run build
```

## Configuration

Add the server to your Claude desktop configuration file at `~/Library/Application Support/Claude/claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "bruno-runner": {
      "command": "node",
      "args": ["/absolute/path/to/bruno-mcp/build/index.js"]
    }
  }
}
```

## Available Tools

### run-collection

Runs a Bruno collection and returns the test results.

**Parameters:**

* `collection` (required): Path to the Bruno collection
* `environment` (optional): Path to environment file
* `variables` (optional): Environment variables as key-value pairs

**Example Response:**

```json
{
  "success": true,
  "summary": {
    "total": 5,
    "failed": 0,
    "passed": 5
  },
  "failures": [],
  "timings": {
    "started": "2024-03-14T10:00:00.000Z",
    "completed": "2024-03-14T10:00:01.000Z",
    "duration": 1000
  }
}
```

### Example Usage in Claude

You can use the server in Claude by asking it to run a Bruno collection:

"Run the Bruno collection at /path/to/collection.bru and tell me if all tests passed"

Claude will:
1. Use the run-collection tool
2. Analyze the test results
3. Provide a human-friendly summary of the execution

## Development

### Project Structure

```
src/
  ├── index.ts           # Entry point
  ├── server.ts          # MCP Server implementation
  ├── runner.ts          # Bruno runner implementation
  └── types.ts           # Type definitions
```

### TODO

- [ ] Implement unit tests
  - Test runner functionality
  - Test server implementation
  - Test CLI integration
  - Add test coverage reporting

### Building

```bash
# Clean build artifacts
npm run clean

# Build the project
npm run build
```

## License

MIT 