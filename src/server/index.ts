import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { z } from 'zod'

export function createServer(): McpServer {
  const server = new McpServer({
    name: 'Weather MCP Server',
    version: '0.1.0',
  })

  server.registerTool(
    'get_weather',
    {
      description: 'Get weather info for a given city.',
      inputSchema: {
        city: z.string().describe('city name'),
      },
    },
    async ({ city }) => {
      if (!city) {
        throw new Error('city name is required.')
      }

      const weather = {
        city: city,
        temperature: Math.floor(Math.random() * 30),
        condition: 'Sunny',
      }

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(weather, null, 2),
          },
        ],
      }
    },
  )

  return server
}
