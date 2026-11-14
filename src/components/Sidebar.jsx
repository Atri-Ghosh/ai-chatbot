import React from 'react';
import { Plus, MessageSquare, Settings, Trash2 } from 'lucide-react';

export default function Sidebar({ chats, currentChatId, onSelectChat, onNewChat, onDeleteChat }) {
  return (
    <aside className="w-64 bg-gray-950 border-r border-gray-800 flex flex-col h-full text-gray-300">
      <div className="p-3">
        <button
          onClick={onNewChat}
          className="w-full flex items-center gap-2 border border-gray-700 hover:border-gray-500 rounded-lg px-3 py-2.5 text-sm transition-colors text-white bg-gray-900"
        >
          <Plus size={16} />
          New Chat
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-2 space-y-1">
        <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase">Recent Chats</div>
        {chats?.map((chat) => (
          <div
            key={chat.id}
            onClick={() => onSelectChat(chat.id)}
            className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm cursor-pointer transition-colors group ${
              currentChatId === chat.id ? 'bg-gray-800 text-white' : 'hover:bg-gray-900 text-gray-400 hover:text-gray-200'
            }`}
          >
            <div className="flex items-center gap-2 truncate">
              <MessageSquare size={16} />
              <span className="truncate">{chat.title}</span>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDeleteChat(chat.id);
              }}
              className="opacity-0 group-hover:opacity-100 hover:text-red-400 transition-opacity"
            >
              <Trash2 size={14} />
            </button>
          </div>
        ))}
      </div>

      <div className="p-3 border-t border-gray-800 text-xs text-gray-500 flex items-center gap-2">
        <Settings size={14} />
        <span>AI-Powered Advanced Chatbot</span>
      </div>
    </aside>
  );
}