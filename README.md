# random-number-mcp

An MCP server with exactly one job: giving your AI a random number. Because apparently that needed a protocol.

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
