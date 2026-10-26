# random-number-mcp

An MCP server with one job: giving your AI a random number.

## Tool

### `random_number`

| Param     | Type    | Default | Description                     |
| --------- | ------- | ------- | ------------------------------- |
| `max`     | integer | `10`    | Upper bound (inclusive)         |
| `min`     | integer | `0`     | Lower bound (inclusive)         |

Returns something like `🎲 42`.

## Setup

```sh
npm install
```

### Claude Code

```sh
claude mcp add random-number -- node /absolute/path/to/random-number-mcp/index.js
```

### Claude Desktop

Add this to your config file, then restart Claude Desktop:

- macOS: `~/Library/Application Support/Claude/claude_desktop_config.json`
- Windows: `%APPDATA%\Claude\claude_desktop_config.json`

Run it straight from GitHub (no clone needed):

```json
{
  "mcpServers": {
    "random-number": {
      "command": "npx",
      "args": ["-y", "github:owen-lacey/random-number-mcp"]
    }
  }
}
```

Or point it at a local clone (after `npm install`):

```json
{
  "mcpServers": {
    "random-number": {
      "command": "node",
      "args": ["/absolute/path/to/random-number-mcp/index.js"]
    }
  }
}
```

If the file already has an `mcpServers` block, add the `random-number` entry to it rather than replacing it.
