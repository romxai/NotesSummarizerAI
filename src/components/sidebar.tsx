import { ScrollArea } from './ui/scroll-area';
import { 
  MessageSquare, 
  ChevronLeft, 
  ChevronRight,
  LogIn,
  User,
  Plus
} from 'lucide-react';

interface Chat {
  id: string;
  title: string;
  preview: string;
}

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
  chats: Chat[];
  isLoggedIn?: boolean;
  username?: string;
}

export function Sidebar({ 
  isCollapsed, 
  onToggle, 
  chats, 
  isLoggedIn = false,
  username 
}: SidebarProps) {
  return (
    <div 
      className={`
        relative flex flex-col border-r border-gray-800/50 sidebar-gradient
        transition-all duration-300 ease-in-out
        ${isCollapsed ? 'w-[60px]' : 'w-[280px]'}
      `}
    >
      {/* Toggle button */}
      <button
        onClick={onToggle}
        className="absolute -right-3 top-6 bg-gray-800/80 rounded-full p-1 border border-gray-700/50 hover:bg-gray-700/80 transition-colors z-50"
        aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {isCollapsed ? (
          <ChevronRight className="h-4 w-4 text-gray-400" />
        ) : (
          <ChevronLeft className="h-4 w-4 text-gray-400" />
        )}
      </button>

      {/* New Chat Button */}
      <div className="p-3">
        <button className="w-full flex items-center gap-2 p-2 rounded-lg bg-gradient-to-r from-blue-600/10 to-indigo-600/10 hover:from-blue-600/20 hover:to-indigo-600/20 border border-gray-800/50 transition-colors">
          <Plus className="h-5 w-5 text-gray-300" />
          {!isCollapsed && (
            <span className="text-gray-300 text-sm">New Chat</span>
          )}
        </button>
      </div>

      {/* Chat list */}
      <ScrollArea className="flex-1 px-3">
        <div className="space-y-1">
          {chats.map((chat) => (
            <button
              key={chat.id}
              className="w-full text-left p-2 rounded-lg hover:bg-gray-800/50 transition-colors group"
            >
              <div className="flex items-center gap-3">
                <MessageSquare className="h-5 w-5 text-gray-400 flex-shrink-0" />
                {!isCollapsed && (
                  <div className="truncate">
                    <div className="font-medium text-sm text-gray-200 truncate">{chat.title}</div>
                    <div className="text-xs text-gray-400 truncate">{chat.preview}</div>
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>
      </ScrollArea>

      {/* User section */}
      <div className="border-t border-gray-800/50 p-3 mt-auto">
        {isLoggedIn ? (
          <div className="flex items-center gap-3 p-2">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full p-2">
              <User className="h-5 w-5 text-white" />
            </div>
            {!isCollapsed && (
              <span className="text-sm text-gray-200 truncate">{username}</span>
            )}
          </div>
        ) : (
          <button className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-gray-800/50 transition-colors">
            <LogIn className="h-5 w-5 text-gray-400" />
            {!isCollapsed && (
              <span className="text-sm text-gray-200">Login</span>
            )}
          </button>
        )}
      </div>
    </div>
  );
}