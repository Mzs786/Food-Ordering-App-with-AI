import React, { useState, useRef, useEffect, useCallback } from 'react';
import { FiSend } from 'react-icons/fi';
import { ImSpinner8 } from 'react-icons/im';

const MessageBubble = ({ role, text }) => {
  const isUser = role === 'user';
  return (
    <div
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-3`}
      role="region"
      aria-live="polite"
    >
      <div
        className={`max-w-[75%] rounded-lg p-3 text-sm ${
          isUser ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-800'
        }`}
      >
        <p className="break-words whitespace-pre-wrap">{text}</p>
      </div>
    </div>
  );
};

function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:6001';

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  const addMessage = useCallback((role, text) => {
    const newMessage = {
      id: Date.now(),
      role,
      text,
      timestamp: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, newMessage]);
  }, []);

  const sendMessage = useCallback(
    async (e) => {
      e.preventDefault();
      const trimmedInput = input.trim();
      if (!trimmedInput || loading) return;

      try {
        addMessage('user', trimmedInput);
        setInput('');
        setLoading(true);

        const response = await fetch(`${BASE_URL}/chat`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userInput: trimmedInput }),
        });

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const data = await response.json();
        addMessage('bot', data.response || 'No response from server.');
      } catch (error) {
        console.error('Chat error:', error);
        addMessage('bot', 'Sorry, something went wrong. Please try again later.');
      } finally {
        setLoading(false);
        inputRef.current?.focus();
      }
    },
    [input, loading, addMessage, BASE_URL]
  );

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(e);
    }
  };

  return (
    <div className="flex flex-col h-[80vh] max-w-lg mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
      <header className="p-4 bg-gray-50 border-b">
        <h1 className="text-xl font-semibold text-center text-gray-800">
          Foodie AI Assistant
        </h1>
      </header>

      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.map((message) => (
          <MessageBubble key={message.id} role={message.role} text={message.text} />
        ))}
        <div ref={messagesEndRef} />
        {loading && (
          <div className="flex justify-center">
            <ImSpinner8 className="animate-spin text-gray-400 text-xl" />
          </div>
        )}
      </div>

      <form onSubmit={sendMessage} className="p-4 border-t bg-gray-50">
        <div className="flex gap-2">
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Ask me about recipes, ingredients, or meal plans..."
            className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-70"
            disabled={loading}
            aria-label="Type your message"
          />
          <button
            type="submit"
            className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-70"
            disabled={loading || !input.trim()}
            aria-label="Send message"
          >
            <FiSend className="w-5 h-5" />
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-2 text-center">
          Foodie AI can make mistakes. Consider verifying important information.
        </p>
      </form>
    </div>
  );
}

export default Chatbot;
