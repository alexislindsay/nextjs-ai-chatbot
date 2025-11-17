'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ProductCard, Product } from './product-card';
import { ArrowLeft, Send } from 'lucide-react';

interface Message {
  from: 'bot' | 'user';
  text: string;
  isMarkdown?: boolean;
  isProduct?: boolean;
  product?: Product;
}

interface ConversationStep {
  type: 'bot';
  text: string;
}

interface FunnelConfig {
  steps: ConversationStep[];
  generateResponse: (userAnswers: string[]) => {
    plan?: string;
    reading?: string;
    product: Product;
  };
}

interface MarketingChatbotProps {
  funnelType: string;
  onBack: () => void;
}

const funnelConfigs: Record<string, FunnelConfig> = {
  mediterraneanDiet: {
    steps: [
      {
        type: 'bot',
        text: 'Welcome! To create your personalized meal plan, tell me about your dietary preferences or any restrictions you have.',
      },
      {
        type: 'bot',
        text: 'What is your main health goal? (e.g., more energy, weight management, improved heart health)',
      },
      {
        type: 'bot',
        text: 'Lastly, how much time can you dedicate to cooking each day?',
      },
    ],
    generateResponse: (userAnswers: string[]) => {
      const [preferences, goal, time] = userAnswers;
      const plan = `**Your Personalized Meal Plan**

* **Goal:** ${goal}
* **Preferences:** ${preferences}
* **Cooking Time:** ${time}

Based on your answers, a Mediterranean-style plan focused on fresh vegetables and healthy fats would be perfect. To get a full 7-day plan with recipes and shopping lists, check out our guide!`;

      const product: Product = {
        name: 'The Mediterranean Diet Guide',
        description:
          'A comprehensive guide with meal plans, recipes, and tips to embrace a healthy lifestyle.',
        link: '#',
        imageUrl: 'https://placehold.co/400x200/2980b9/ffffff?text=Meal+Plan',
      };
      return { plan, product };
    },
  },
  manifestationJournal: {
    steps: [
      {
        type: 'bot',
        text: "Hello! Let's create your self-actualization plan. What is the biggest dream or goal you want to manifest?",
      },
      {
        type: 'bot',
        text: 'What is a core value or belief you want to strengthen?',
      },
      {
        type: 'bot',
        text: 'On a scale of 1-10, how ready are you to start taking action towards this goal?',
      },
    ],
    generateResponse: (userAnswers: string[]) => {
      const [goal, value, readiness] = userAnswers;
      const plan = `**Your Self-Actualization Plan**

* **Dream:** ${goal}
* **Core Value:** ${value}
* **Readiness Score:** ${readiness}/10

Your path to self-actualization is clear. To turn these ideas into reality, consistent action is key. Our journal provides the structure you need.`;

      const product: Product = {
        name: 'The Manifestation Journal',
        description:
          'A guided journal with prompts and exercises to help you manifest your dreams and achieve your goals.',
        link: '#',
        imageUrl: 'https://placehold.co/400x200/8e44ad/ffffff?text=Manifest+Journal',
      };
      return { plan, product };
    },
  },
  fidelityGuide: {
    steps: [
      {
        type: 'bot',
        text: 'Welcome. To begin your relationship reading, please tell me the one question you have about your current or future relationship.',
      },
      {
        type: 'bot',
        text: 'Now, describe one challenge or fear you are currently facing in your relationship dynamic.',
      },
      {
        type: 'bot',
        text: 'Finally, describe what a truly liberated relationship looks like to you.',
      },
    ],
    generateResponse: (userAnswers: string[]) => {
      const [question, challenge, vision] = userAnswers;
      const reading = `**Your Relationship Reading**

* **Your Question:** "${question}"
* **Your Challenge:** "${challenge}"
* **Your Vision:** "${vision}"

This reading shows a path towards a deeper and more fulfilling connection. It's time to explore new ways of thinking about your partnership. Our guide can provide a framework for these conversations.`;

      const product: Product = {
        name: 'Guide to an Alternate Fidelity Structure',
        description:
          'A comprehensive guide for exploring and transitioning to new relationship dynamics with communication strategies and real-life examples.',
        link: '#',
        imageUrl: 'https://placehold.co/400x200/e67e22/ffffff?text=Relationship+Guide',
      };
      return { reading, product };
    },
  },
};

export function MarketingChatbot({ funnelType, onBack }: MarketingChatbotProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const config = funnelConfigs[funnelType];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initialize with first bot message
  useEffect(() => {
    setMessages([{ from: 'bot', text: config.steps[0].text }]);
  }, [funnelType, config.steps]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim() || isLoading) return;

    const newUserMessage: Message = { from: 'user', text: userInput };
    const updatedMessages = [...messages, newUserMessage];
    setMessages(updatedMessages);
    setUserInput('');
    setIsLoading(true);

    setTimeout(() => {
      const nextStep = currentStep + 1;
      const userAnswers = updatedMessages
        .filter((m) => m.from === 'user')
        .map((m) => m.text);

      if (nextStep < config.steps.length) {
        setMessages((prev) => [
          ...prev,
          { from: 'bot', text: config.steps[nextStep].text },
        ]);
        setCurrentStep(nextStep);
      } else {
        // Conversation is complete, generate response and product offer
        const { plan, reading, product } = config.generateResponse(userAnswers);
        const finalMessage = plan || reading || '';

        setMessages((prev) => [
          ...prev,
          { from: 'bot', text: finalMessage, isMarkdown: true },
          { from: 'bot', text: '', isProduct: true, product },
        ]);
      }
      setIsLoading(false);
    }, 1000);
  };

  const getFunnelTitle = () => {
    const titles: Record<string, string> = {
      mediterraneanDiet: 'Meal Plan',
      manifestationJournal: 'Self-Actualization',
      fidelityGuide: 'Relationship Reading',
    };
    return titles[funnelType] || 'Marketing';
  };

  const formatMessage = (text: string) => {
    return text.split('\n').map((line, i) => (
      <React.Fragment key={i}>
        {line}
        {i < text.split('\n').length - 1 && <br />}
      </React.Fragment>
    ));
  };

  return (
    <div className="flex flex-col h-[80vh] max-w-2xl w-full bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-6">
      <header className="flex justify-between items-center pb-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
          {getFunnelTitle()} Chatbot
        </h2>
        <button
          onClick={onBack}
          className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
      </header>

      {/* Chat messages display */}
      <div className="flex-1 overflow-y-auto my-4 space-y-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {msg.isProduct && msg.product ? (
              <ProductCard product={msg.product} />
            ) : (
              <div
                className={`p-3 rounded-xl max-w-xs ${
                  msg.from === 'user'
                    ? 'bg-blue-500 text-white rounded-br-none'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded-bl-none'
                }`}
              >
                {msg.isMarkdown ? (
                  <div className="whitespace-pre-wrap">{formatMessage(msg.text)}</div>
                ) : (
                  msg.text
                )}
              </div>
            )}
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 p-3 rounded-xl rounded-bl-none">
              <div className="animate-pulse flex space-x-1">
                <div className="h-2 w-2 bg-gray-400 rounded-full"></div>
                <div className="h-2 w-2 bg-gray-400 rounded-full"></div>
                <div className="h-2 w-2 bg-gray-400 rounded-full"></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input form */}
      <form onSubmit={handleSendMessage} className="flex gap-2 p-2 border-t border-gray-200 dark:border-gray-700">
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          className="flex-1 p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Type your message..."
          disabled={isLoading || currentStep >= config.steps.length}
        />
        <button
          type="submit"
          className={`px-6 py-3 rounded-lg text-white font-medium transition-colors flex items-center gap-2 ${
            isLoading || currentStep >= config.steps.length
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
          disabled={isLoading || currentStep >= config.steps.length}
        >
          <Send className="h-4 w-4" />
          Send
        </button>
      </form>
    </div>
  );
}
