import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import ChatWindow from './components/ChatWindow';

export default function App() {
  const [chats, setChats] = useState([
    { id: 1, title: 'New Conversation', messages: [] }
  ]);
  const [currentChatId, setCurrentChatId] = useState(1);
  const [loading, setLoading] = useState(false);

  const currentChat = chats.find(c => c.id === currentChatId) || chats[0];

  const handleNewChat = () => {
    const newChat = { id: Date.now(), title: 'New Conversation', messages: [] };
    setChats([newChat, ...chats]);
    setCurrentChatId(newChat.id);
  };

  const handleSelectChat = (id) => {
    setCurrentChatId(id);
  };

  const handleDeleteChat = (id) => {
    const filtered = chats.filter(c => c.id !== id);
    if (filtered.length === 0) {
      setChats([{ id: Date.now(), title: 'New Conversation', messages: [] }]);
    } else {
      setChats(filtered);
      setCurrentChatId(filtered[0].id);
    }
  };
  const handleSendMessage = async (userMessageText) => {
    const userMessage = { role: 'user', content: userMessageText };
    
    const updatedMessages = [...currentChat.messages, userMessage];
    setChats(chats.map(c => c.id === currentChatId ? { ...c, messages: updatedMessages, title: c.messages.length === 0 ? userMessageText.slice(0, 25) : c.title } : c));
    
    setLoading(true);

    // Simulated mock response since there's no live OpenAI key
    setTimeout(() => {
      const mockReplies = [
        `That's a great question about "${userMessageText}". As your AI assistant built with React and Tailwind, I'm fully functional!`,
        `Here is a sample code snippet for your project:\n\n\`\`\`javascript\nconsole.log("Hello from your AI-Powered Advanced Chatbot!");\n\`\`\``,
        `I have processed your request successfully. Your local development server is running smoothly.`
      ];
      const randomReply = mockReplies[Math.floor(Math.random() * mockReplies.length)];

      setChats(prevChats => prevChats.map(c => {
        if (c.id === currentChatId) {
          return {
            ...c,
            messages: [...c.messages, { role: 'assistant', content: randomReply }]
          };
        }
        return c;
      }));
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-gray-950">
      <Sidebar
        chats={chats}
        currentChatId={currentChatId}
        onSelectChat={handleSelectChat}
        onNewChat={handleNewChat}
        onDeleteChat={handleDeleteChat}
      />
      <ChatWindow
        messages={currentChat.messages}
        onSendMessage={handleSendMessage}
        loading={loading}
      />
    </div>
  );
}