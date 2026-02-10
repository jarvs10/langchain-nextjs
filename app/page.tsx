"use client";

import { useState } from "react";
import ChatInterface from "./components/ChatInterface";
import { ApiKeyInput } from "./components/ApiKeyInput";
import CustomerTable from "./components/CustomerTable";

export default function Home() {
  const [apiKey, setApiKey] = useState<string>(
    process.env.NEXT_PUBLIC_GEMINI_API_KEY ?? ""
  );
  const [activeTab, setActiveTab] = useState<"chat" | "customers">("chat");

  return (
    <div className="flex flex-col h-screen bg-white dark:bg-black">
      {!apiKey.trim() ? (
        /* API Key Input - Show when no API key is set */
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="w-full max-w-md">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                Welcome to LangChain Agent Demo
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Enter your Gemini API key to get started
              </p>
            </div>
            <ApiKeyInput apiKey={apiKey} onApiKeyChange={setApiKey} />
          </div>
        </div>
      ) : (
        <>
          {/* Header with Tabs */}
          <header className="flex items-center justify-between px-8 py-4 border-b border-gray-100 dark:border-gray-900 bg-white/50 dark:bg-black/50 backdrop-blur-md sticky top-0 z-10">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
                <span className="text-white font-bold tracking-tighter">
                  LG
                </span>
              </div>
              <h1 className="text-lg font-bold text-gray-900 dark:text-white tracking-tight">
                LangChat <span className="text-blue-600">Pro</span>
              </h1>
            </div>

            <nav className="flex p-1 bg-gray-100 dark:bg-gray-900 rounded-lg">
              <button
                onClick={() => setActiveTab("chat")}
                className={`flex items-center gap-2 px-4 py-1.5 text-sm font-medium rounded-md transition-all ${
                  activeTab === "chat"
                    ? "bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 shadow-sm"
                    : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                }`}
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                  />
                </svg>
                AI Chat
              </button>
              <button
                onClick={() => setActiveTab("customers")}
                className={`flex items-center gap-2 px-4 py-1.5 text-sm font-medium rounded-md transition-all ${
                  activeTab === "customers"
                    ? "bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 shadow-sm"
                    : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                }`}
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                Customers
              </button>
            </nav>

            <div className="w-[120px] hidden sm:block" />
          </header>

          <main className="flex-1 overflow-hidden relative">
            <div
              className={`absolute inset-0 transition-all duration-500 ease-in-out ${
                activeTab === "chat"
                  ? "translate-x-0 opacity-100 z-10"
                  : "-translate-x-full opacity-0 pointer-events-none"
              }`}
            >
              <ChatInterface apiKey={apiKey} />
            </div>
            <div
              className={`absolute inset-0 transition-all duration-500 ease-in-out ${
                activeTab === "customers"
                  ? "translate-x-0 opacity-100 z-10"
                  : "translate-x-full opacity-0 pointer-events-none"
              }`}
            >
              <CustomerTable />
            </div>
          </main>
        </>
      )}
    </div>
  );
}
