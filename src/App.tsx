import { useState } from 'react';
import { ScrollArea } from './components/ui/scroll-area';
import { ChatMessage } from './components/chat-message';
import { ChatInput } from './components/chat-input';
import { Sidebar } from './components/sidebar';
import { Bot, Globe } from 'lucide-react';

interface Message {
  text: string;
  isBot: boolean;
  sources?: Array<{
    name: string;
    url: string;
  }>;
}

interface Chat {
  id: string;
  title: string;
  preview: string;
}

function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  
  // Mock data for past chats
  const pastChats: Chat[] = [
    {
      id: '1',
      title: 'AI Loss Functions',
      preview: 'Understanding loss functions in machine learning...'
    },
    {
      id: '2',
      title: 'Neural Networks',
      preview: 'Exploring the basics of neural networks...'
    },
    {
      id: '3',
      title: 'Data Preprocessing',
      preview: 'Best practices for data preprocessing...'
    }
  ];

  const handleSendMessage = (message: string) => {
    if (!hasInteracted) {
      setHasInteracted(true);
    }
    
    setMessages((prev) => [
      ...prev,
      { text: message, isBot: false },
      {
        text: "Calculating the loss function of an AI model involves quantifying the difference between the model's predictions and the actual values, known as the ground truth. The choice of loss function depends on the type of machine learning task, such as regression or classification. Here's a general approach to calculating the loss function, focusing on Mean Squared Error (MSE) for regression tasks.",
        isBot: true,
        sources: [
          { name: 'developers.google', url: '#' },
          { name: 'ibm', url: '#' },
          { name: 'datacamp', url: '#' }
        ]
      },
    ]);
  };

  return (
    <div className="flex min-h-screen bg-[#1a1c1e]">
      {/* Sidebar */}
      <Sidebar
        isCollapsed={isSidebarCollapsed}
        onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        chats={pastChats}
        isLoggedIn={false}
      />

      <div className="flex flex-col flex-1 min-h-screen">
        {/* Header */}
        <header className="border-b border-gray-800/50 px-4 md:px-6 py-3 md:py-4 bg-gray-900/30 backdrop-blur-sm sticky top-0 z-10">
          <div className="flex items-center gap-2 max-w-3xl mx-auto">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-2 rounded-lg">
              <Bot className="h-5 w-5 md:h-6 md:w-6 text-white" />
            </div>
            <h1 className="text-lg md:text-xl font-semibold text-white">Perplexity AI</h1>
          </div>
        </header>

        {!hasInteracted ? (
          // Initial hero section
          <div className="flex-1 flex flex-col items-center justify-center hero-gradient px-4 py-8 md:py-12">
            <h1 className="text-3xl md:text-5xl font-bold text-white text-center mb-8 max-w-2xl">
              What do you want to know?
            </h1>
            <div className="w-full max-w-2xl px-4">
              <ChatInput onSend={handleSendMessage} isHero />
            </div>
            <div className="mt-6 md:mt-8 flex items-center gap-2 text-gray-400">
              <Globe className="h-5 w-5" />
              <span className="text-sm md:text-base">Search across the web</span>
            </div>
          </div>
        ) : (
          // Chat interface
          <>
            <main className="flex-1 w-full relative">
              <ScrollArea className="h-[calc(100vh-8rem)] absolute inset-0">
                <div className="flex flex-col max-w-3xl mx-auto">
                  {messages.map((message, index) => (
                    <ChatMessage
                      key={index}
                      message={message.text}
                      isBot={message.isBot}
                      sources={message.sources}
                    />
                  ))}
                </div>
              </ScrollArea>
            </main>

            {/* Input area */}
            <div className="w-full border-t border-gray-800/50 chat-gradient py-4 mobile-chat">
              <ChatInput onSend={handleSendMessage} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;