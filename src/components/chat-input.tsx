import { Send, PaperclipIcon } from "lucide-react";
import { useState, useRef } from "react";

interface ChatInputProps {
  onSend: (message: string) => void;
  isHero?: boolean;
}

export function ChatInput({ onSend, isHero = false }: ChatInputProps) {
  const [message, setMessage] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSend(message);
      setMessage("");
    }
  };

  const handleFileClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Handle file upload here
      console.log('File selected:', file);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-3xl mx-auto px-4 md:px-6">
      <div 
        className={`
          flex gap-2 p-3 md:p-4 rounded-xl
          ${isHero ? 'gradient-border' : 'bg-gray-900/50 border border-gray-800/50'}
        `}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          accept=".pdf,.doc,.docx,.txt,image/*"
        />
        <button
          type="button"
          onClick={handleFileClick}
          className="p-2.5 md:p-3 hover:bg-gray-800/50 rounded-lg transition-colors"
          aria-label="Upload file"
        >
          <PaperclipIcon className="h-5 w-5 text-gray-400" />
        </button>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Ask anything..."
          className="flex-1 px-4 py-2.5 md:py-3 bg-gray-800/30 text-white rounded-lg border border-gray-700/50 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 placeholder-gray-400 text-sm md:text-base"
        />
        <button
          type="submit"
          className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-2.5 md:p-3 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!message.trim()}
          aria-label="Send message"
        >
          <Send className="h-5 w-5" />
        </button>
      </div>
    </form>
  );
}