# LangChain Agent Getting Started Guide for Next.js

This is a **getting started guide** for building LangChain agents with Next.js. This project demonstrates how to integrate LangChain's `createAgent` API into a Next.js application with a modern chat interface, streaming support, and tool calling capabilities.

## What This Project Demonstrates

This project serves as a learning resource and starting point for developers who want to:

- **Build LangChain agents** using the `createAgent` API
- **Integrate agents into Next.js** applications with API routes
- **Implement streaming** chat interfaces with React
- **Handle tool calls** and display them in the UI
- **Create a production-ready** chat interface with error handling

## Features

- 🚀 **Next.js 16** with App Router
- 🤖 **LangChain Agent** integration with `createAgent`
- 💬 **Streaming chat interface** using `@langchain/langgraph-sdk/react`
- 🛠️ **Tool calling** with visual tool call bubbles
- 🎨 **Modern UI** with dark mode support
- ⚡ **Real-time updates** with server-sent events

## Project Structure

```
app/
├── api/
│   └── basic/
│       ├── agent.ts      # LangChain agent implementation
│       └── route.ts      # Next.js API route handler
├── components/
│   ├── ChatInterface.tsx # Main chat UI component
│   ├── ChatInput.tsx     # Message input component
│   ├── ToolCall.tsx      # Tool call display component
│   └── ...
└── page.tsx              # Home page with API key input
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm (or npm/yarn)
- Anthropic API key (for Claude models)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd langchain-nextjs
```

2. Install dependencies:
```bash
pnpm install
```

3. (Optional) Set your API key as an environment variable:
```bash
export NEXT_PUBLIC_ANTHROPIC_API_KEY=your_api_key_here
```

4. Run the development server:
```bash
pnpm dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

If you haven't set the `NEXT_PUBLIC_ANTHROPIC_API_KEY` environment variable, you'll be prompted to enter your API key when you first open the application.

## How It Works

### 1. Agent Implementation (`app/api/basic/agent.ts`)

The agent is created using LangChain's `createAgent` function:

```typescript
const agent = createAgent({
  model: new ChatAnthropic({ ... }),
  tools: [getCustomerInformationTool],
  checkpointer: new MemorySaver(),
  systemPrompt: "You are a helpful assistant...",
});
```

### 2. API Route (`app/api/basic/route.ts`)

The Next.js API route handles incoming requests and streams the agent's response:

```typescript
export async function POST(request: NextRequest) {
  const body = await request.json();
  return basicAgent(body);
}
```

### 3. Frontend Integration (`app/components/ChatInterface.tsx`)

The React component uses `useStream` hook from `@langchain/langgraph-sdk/react` to handle streaming:

```typescript
const stream = useStream({
  transport: new FetchStreamTransport({
    apiUrl: "/api/basic",
    // ...
  }),
});
```

## Key Concepts

### Streaming

The agent streams responses using server-sent events (SSE), allowing for real-time updates in the UI as the agent generates responses.

### Tool Calling

The agent can call tools (like `get_customer_information` in the example). Tool calls are displayed in the UI with their inputs and outputs.

### State Management

The agent uses a `MemorySaver` checkpointer to maintain conversation state across multiple turns.

## Customization

### Adding New Tools

Edit `app/api/basic/agent.ts` to add new tools:

```typescript
const myNewTool = tool(
  async (input: { param: string }) => {
    // Your tool logic here
    return result;
  },
  {
    name: "my_tool",
    description: "What your tool does",
    schema: z.object({
      param: z.string(),
    }),
  }
);

const agent = createAgent({
  // ...
  tools: [getCustomerInformationTool, myNewTool],
});
```

### Changing the Model

Modify the model configuration in `app/api/basic/agent.ts`:

```typescript
const model = new ChatAnthropic({
  model: "claude-3-7-sonnet-latest", // Change this
  apiKey: options.apiKey,
});
```

### Customizing the System Prompt

Update the `systemPrompt` in the `createAgent` configuration:

```typescript
const agent = createAgent({
  // ...
  systemPrompt: "Your custom system prompt here",
});
```

## Learn More

- [LangChain Documentation](https://js.langchain.com/)
- [LangGraph Documentation](https://langchain-ai.github.io/langgraph/)
- [Next.js Documentation](https://nextjs.org/docs)
- [LangChain Agent Guide](https://js.langchain.com/docs/modules/agents/)

## Contributing

This is a learning project. Feel free to fork it, experiment, and adapt it to your needs!

## License

MIT
