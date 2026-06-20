import { z } from "zod";
import { createAgent, tool, type BaseMessage } from "langchain";
import { MemorySaver } from "@langchain/langgraph";
import type { LangGraphRunnableConfig } from "@langchain/langgraph";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { customers, orders } from "@/data/info";

const checkpointer = new MemorySaver();

/**
 * Basic agent with no tools, no middleware - just uses a model
 */
export async function basicAgent(options: {
  input: Record<string, unknown>;
  apiKey: string;
  config: LangGraphRunnableConfig;
}) {
  // Create the gemini model instance with user-provided API key
  const model = new ChatGoogleGenerativeAI({
    model: "gemini-3-flash-preview",
    apiKey: options.apiKey,
  });

  const getCustomerInformationTool = tool(
    async (input: { customerId: string }) => {
      return customers[input.customerId as keyof typeof customers];
    },
    {
      name: "get_customer_information",
      description: "Get information about a customer",
      schema: z.object({
        customerId: z.string(),
      }),
    }
  );

  const getCustomerAndOrdersTool = tool(
    async (input: { customerId: string }) => {
      const customer = customers[input.customerId as keyof typeof customers];
      const customerOrders = orders.filter((order) => order.customerId === input.customerId);
      return { customer, orders: customerOrders };
    },
    {
      name: "get_customer_and_orders",
      description: "Get information about a customer and their associated orders",
      schema: z.object({
        customerId: z.string(),
      }),
    }
  );

  const agent = createAgent({
    model,
    tools: [getCustomerInformationTool, getCustomerAndOrdersTool],
    checkpointer,
    systemPrompt:
      "You are a helpful assistant that can get information about customers and their orders. Use the get_customer_and_orders tool if you need to get both customer information and their orders in a single call.",
  });

  const stream = await agent.stream(
    options.input as {
      messages: BaseMessage[];
    },
    {
      encoding: "text/event-stream",
      streamMode: ["values", "updates", "messages"],
      configurable: options.config.configurable,
      recursionLimit: 10,
    }
  );

  return new Response(stream, {
    headers: { "Content-Type": "text/event-stream" },
  });
}
