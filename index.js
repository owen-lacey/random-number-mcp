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
      "Returns a random number between min and max (inclusive). Outsource your randomness, like a pro.",
    inputSchema: {
      max: z.number().default(100).describe("Upper bound (inclusive). Defaults to 100."),
      min: z.number().default(0).describe("Lower bound (inclusive). Defaults to 0."),
      integer: z.boolean().default(true).describe("Return a whole number. Defaults to true."),
    },
  },
  async ({ max, min, integer }) => {
    if (min >= max) {
      return {
        isError: true,
        content: [{ type: "text", text: `min (${min}) must be less than max (${max}). Nice try.` }],
      };
    }

    let value;
    if (integer) {
      const lo = Math.ceil(min);
      const hi = Math.floor(max);
      if (lo > hi) {
        return {
          isError: true,
          content: [{ type: "text", text: `There are no integers between ${min} and ${max}.` }],
        };
      }
      value = randomInt(lo, hi + 1);
    } else {
      value = min + Math.random() * (max - min);
    }

    return { content: [{ type: "text", text: `🎲 ${value}` }] };
  }
);

await server.connect(new StdioServerTransport());
