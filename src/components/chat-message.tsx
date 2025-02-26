import { Avatar, AvatarFallback } from "./ui/avatar";
import { Bot, User, ExternalLink } from "lucide-react";

interface Source {
  name: string;
  url: string;
}

interface ChatMessageProps {
  message: string;
  isBot?: boolean;
  sources?: Source[];
}

export function ChatMessage({ message, isBot = false, sources }: ChatMessageProps) {
  return (
    <div className={`flex gap-4 p-6 ${isBot ? "message-gradient-bot" : "message-gradient-user"} transition-colors duration-200`}>
      <Avatar className={`${isBot ? "bg-gradient-to-r from-blue-600 to-indigo-600" : "bg-gray-700"} h-8 w-8 md:h-10 md:w-10`}>
        <AvatarFallback>
          {isBot ? (
            <Bot className="h-4 w-4 md:h-5 md:w-5 text-white" />
          ) : (
            <User className="h-4 w-4 md:h-5 md:w-5 text-white" />
          )}
        </AvatarFallback>
      </Avatar>
      <div className="flex-1 space-y-2 min-w-0">
        <div className="font-medium text-sm md:text-base text-gray-200">{isBot ? "Perplexity" : "You"}</div>
        <div className="text-sm md:text-base text-gray-300 leading-relaxed break-words">{message}</div>
        {sources && sources.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {sources.map((source, index) => (
              <a
                key={index}
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-xs md:text-sm text-gray-400 hover:text-blue-400 transition-colors bg-gray-800/50 rounded-full px-3 py-1 hover:bg-gray-800"
              >
                <span>{source.name}</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            ))}
            <span className="text-xs md:text-sm text-gray-500">+4 sources</span>
          </div>
        )}
      </div>
    </div>
  );
}