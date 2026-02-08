"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useState, useRef, useEffect } from "react";
import {
  Button,
  Textarea,
  Card,
  Avatar,
  ScrollShadow,
  Tooltip,
} from "@heroui/react";
import {
  MessageSquare,
  Send,
  Bot,
  User,
  Trash2,
  Sparkles,
  Wand2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  useSparkleConfetti,
  SparkleConfetti,
  MagicLoadingSpinner,
  FloatingSparkles,
} from "@/components/magic-sparkles";

const suggestions = [
  "How am I spending my money?",
  "Where can I save more?",
  "What are my top expenses?",
  "Give me a monthly budget plan",
];

export default function AiChatPage() {
  const { messages, sendMessage, status, setMessages } = useChat({
    transport: new DefaultChatTransport({ api: "/api/ai/chat" }),
  });

  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const isLoading = status === "streaming" || status === "submitted";
  const prevStatusRef = useRef(status);
  const { particles, fire } = useSparkleConfetti();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (messages.length > 0) setShowSuggestions(false);
  }, [messages.length]);

  // Fire sparkle confetti when AI finishes responding
  useEffect(() => {
    const wasLoading =
      prevStatusRef.current === "streaming" ||
      prevStatusRef.current === "submitted";
    const isDone = status === "ready";
    if (wasLoading && isDone && messages.length > 0) {
      fire();
    }
    prevStatusRef.current = status;
  }, [status, messages.length, fire]);

  const handleSend = () => {
    if (!input.trim() || isLoading) return;
    sendMessage({ text: input });
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const getMessageText = (message: (typeof messages)[number]) => {
    const textParts = message.parts.filter((p) => p.type === "text");
    return textParts.map((p) => p.text).join("");
  };

  return (
    <div className="flex flex-col h-[calc(100vh-3.5rem)] md:h-[calc(100vh-3.5rem)] max-w-4xl mx-auto w-full">
      <SparkleConfetti particles={particles} />

      <div className="p-4 md:p-6 pb-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-600 flex items-center justify-center text-white shadow-lg shadow-violet-500/25 animate-magic-pulse">
              <Wand2 className="h-5 w-5" />
            </div>
            <div>
              <h1 className="font-serif text-2xl font-bold tracking-tight">
                Magic Chat
              </h1>
              <p className="text-sm text-default-500">
                Ask the magic oracle about your finances
              </p>
            </div>
          </div>
          {messages.length > 0 && (
            <Tooltip content="Clear chat">
              <Button
                isIconOnly
                variant="bordered"
                className="border-violet-500/30"
                onPress={() => {
                  setMessages([]);
                  setShowSuggestions(true);
                }}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </Tooltip>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-hidden px-4 md:px-6">
        <ScrollShadow className="h-full py-4" ref={scrollRef}>
          {messages.length === 0 && showSuggestions && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center justify-center h-full py-20 relative"
            >
              <FloatingSparkles count={6} />
              <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 flex items-center justify-center mb-4 animate-float relative z-10">
                <Sparkles className="h-8 w-8 text-violet-500 animate-twinkle" />
              </div>
              <h2 className="font-serif text-lg font-bold mb-1 relative z-10">
                What spell shall I cast?
              </h2>
              <p className="text-sm text-default-500 mb-6 relative z-10">
                Ask the magic oracle anything about your finances
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full max-w-lg relative z-10">
                {suggestions.map((s, i) => (
                  <motion.button
                    key={s}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + i * 0.05 }}
                    onClick={() => {
                      setShowSuggestions(false);
                      sendMessage({ text: s });
                    }}
                    className="text-left p-3 rounded-xl border border-violet-500/20 bg-content1 hover:bg-violet-500/5 transition-all duration-200 hover:shadow-sm hover:border-violet-500/40 text-sm group"
                  >
                    <span className="group-hover:magic-gradient-text transition-all">
                      {s}
                    </span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          <AnimatePresence>
            {messages.map((message) => {
              const text = getMessageText(message);
              if (!text) return null;
              return (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={cn(
                    "flex gap-3 mb-4",
                    message.role === "user" ? "justify-end" : "justify-start"
                  )}
                >
                  {message.role === "assistant" && (
                    <Avatar
                      size="sm"
                      classNames={{
                        base: "bg-gradient-to-br from-violet-500 to-fuchsia-600 text-white shrink-0",
                      }}
                      icon={<Wand2 className="h-4 w-4" />}
                    />
                  )}
                  <Card
                    className={cn(
                      "max-w-[80%] px-4 py-3 shadow-sm",
                      message.role === "user"
                        ? "bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white rounded-2xl rounded-br-md"
                        : "bg-content1 rounded-2xl rounded-bl-md border border-violet-500/10"
                    )}
                  >
                    <div
                      className={cn(
                        "text-sm leading-relaxed prose prose-sm max-w-none",
                        message.role === "user"
                          ? "prose-invert"
                          : "dark:prose-invert"
                      )}
                      dangerouslySetInnerHTML={{
                        __html: formatMessage(text),
                      }}
                    />
                  </Card>
                  {message.role === "user" && (
                    <Avatar
                      size="sm"
                      classNames={{
                        base: "bg-gradient-to-br from-amber-400 to-orange-500 text-white shrink-0",
                      }}
                      icon={<User className="h-4 w-4" />}
                    />
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>

          {isLoading &&
            messages.length > 0 &&
            messages[messages.length - 1].role === "user" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex gap-3 mb-4"
              >
                <Avatar
                  size="sm"
                  classNames={{
                    base: "bg-gradient-to-br from-violet-500 to-fuchsia-600 text-white shrink-0",
                  }}
                  icon={<Wand2 className="h-4 w-4" />}
                />
                <Card className="px-4 py-3 bg-content1 rounded-2xl rounded-bl-md border border-violet-500/10">
                  <MagicLoadingSpinner />
                </Card>
              </motion.div>
            )}
        </ScrollShadow>
      </div>

      <div className="p-4 md:p-6 pt-2 border-t border-divider bg-background">
        <div className="flex gap-2 items-end">
          <Textarea
            value={input}
            onValueChange={setInput}
            onKeyDown={handleKeyDown}
            placeholder="Ask the magic oracle..."
            minRows={1}
            maxRows={4}
            className="flex-1"
            classNames={{
              inputWrapper: "rounded-xl border-violet-500/20",
            }}
          />
          <Tooltip content="Cast spell">
            <Button
              isIconOnly
              onPress={handleSend}
              isDisabled={isLoading || !input.trim()}
              className="shrink-0 h-11 w-11 rounded-xl magic-gradient-bg text-white shadow-lg shadow-violet-500/25"
            >
              <Send className="h-4 w-4" />
            </Button>
          </Tooltip>
        </div>
      </div>
    </div>
  );
}

function formatMessage(content: string): string {
  return content
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.*?)\*/g, "<em>$1</em>")
    .replace(
      /`(.*?)`/g,
      '<code class="bg-default-100 px-1 py-0.5 rounded text-xs">$1</code>'
    )
    .replace(/\n/g, "<br />");
}
