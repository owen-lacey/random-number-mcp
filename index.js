#!/usr/bin/env node
import { randomInt } from "node:crypto";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const server = new McpServer({ name: "random-number-mcp", version: "1.0.0" });

server.registerTool(
  "random_number",
  {
    title: "Random Number",
    description:
      "Returns a random whole number between min and max (inclusive). Outsource your randomness, like a pro.",
    inputSchema: {
      max: z.number().int().default(10).describe("Upper bound (inclusive). Defaults to 10."),
      min: z.number().int().default(0).describe("Lower bound (inclusive). Defaults to 0."),
    },
  },
  async ({ max, min }) => {
    if (min >= max) {
      return {
        isError: true,
        content: [{ type: "text", text: `min (${min}) must be less than max (${max}). Nice try.` }],
      };
    }

    const value = randomInt(min, max + 1);

    return { content: [{ type: "text", text: `🎲 ${value}` }] };
  }
);

await server.connect(new StdioServerTransport());
